"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const zip_archive_reader_1 = require("./zip_archive_reader");
const common_1 = require("../common");
/**
 * ZipBlobArchiveReader
 */
class ZipBlobArchiveReader extends zip_archive_reader_1.ZipArchiveReader {
    constructor(blob, encoding, progressCallback, chunkSize) {
        super();
        this.blob = blob;
        this.encoding = encoding;
        this.progressCallback = progressCallback;
        this.chunkSize = chunkSize;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let blob = this.blob;
            let endCentDirHeader;
            let centralDirHeaders = [];
            let localFileHeaders = [];
            let files = [];
            let folders = [];
            let offset;
            let readChunk = (start, end) => common_1.readFileAsArrayBuffer(blob.slice(start, end));
            this.files = files;
            this.folders = folders;
            this.localFileHeaders = localFileHeaders;
            this.centralDirHeaders = centralDirHeaders;
            // validate first local file signature
            {
                const chunk = yield readChunk(0, 4);
                if (new DataView(chunk).getUint32(0, true) === common_1.LOCAL_FILE_SIGNATURE) {
                    offset = Math.max(0, blob.size - 0x8000);
                }
                else {
                    throw new Error('zip.unpack: invalid zip file.');
                }
            }
            // validate end signature
            OUTER: do {
                const chunk = yield readChunk(offset, Math.min(blob.size, offset + 0x8000));
                const view = new DataView(chunk);
                for (let i = chunk.byteLength - 4; i--;) {
                    if (view.getUint32(i, true) === common_1.END_SIGNATURE) {
                        offset += i;
                        break OUTER;
                    }
                }
                offset = Math.max(offset - 0x8000 + 3, 0);
            } while (offset);
            if (!offset)
                throw new Error('zip.unpack: invalid zip file.');
            // read end central dir header
            endCentDirHeader = zip_archive_reader_1.readEndCentDirHeader(yield readChunk(offset, blob.size), 0);
            // read central dir headers
            yield readChunk(endCentDirHeader.startpos, offset).then(buffer => {
                let offset = 0;
                let header;
                for (let i = 0; i < endCentDirHeader.direntry; ++i) {
                    header = zip_archive_reader_1.readCentralDirHeader(buffer, offset);
                    centralDirHeaders.push(header);
                    offset += header.allsize;
                }
            });
            // read local file headers
            const centralDirHeadersLength = centralDirHeaders.length;
            const offsetTotal = this.blob.size;
            let lastProgress = 0;
            const progressCallback = this.progressCallback;
            for (let i = 0; i < centralDirHeadersLength; ++i) {
                const offset = centralDirHeaders[i].headerpos;
                const view = new DataView(yield readChunk(offset + 26, offset + 30));
                const fnamelen = view.getUint16(0, true);
                const extralen = view.getUint16(2, true);
                const header = zip_archive_reader_1.readLocalFileHeader(yield readChunk(offset, offset + 30 + fnamelen + extralen), 0);
                header.crc32 = centralDirHeaders[i].crc32;
                header.compsize = centralDirHeaders[i].compsize;
                header.uncompsize = centralDirHeaders[i].uncompsize;
                localFileHeaders.push(header);
                if (!progressCallback)
                    continue;
                let progress = Math.floor((offset / offsetTotal) * 100);
                if (lastProgress === progress)
                    continue;
                progressCallback({ progress });
                lastProgress = progress;
            }
            return this._completeInit();
        });
    }
    _decompressFile(fileName) {
        let info = this._getFileInfo(fileName);
        let blob = this.blob.slice(info.offset, info.offset + info.length);
        return common_1.readFileAsArrayBuffer(blob).then(ab => this._decompress(new Uint8Array(ab), info.isCompressed));
    }
    _decompressFileSync(fileName) {
        let info = this._getFileInfo(fileName);
        let blob = this.blob.slice(info.offset, info.offset + info.length);
        let bytes = new Uint8Array(new FileReaderSync().readAsArrayBuffer(blob));
        return this._decompress(bytes, info.isCompressed);
    }
}
exports.ZipBlobArchiveReader = ZipBlobArchiveReader;
