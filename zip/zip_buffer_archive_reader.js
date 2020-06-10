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
const common_1 = require("../common");
const zip_archive_reader_1 = require("./zip_archive_reader");
class ZipBufferArchiveReader extends zip_archive_reader_1.ZipArchiveReader {
    constructor(buffer, encoding, progressCallback, chunkSize) {
        super();
        this.buffer = buffer;
        this.encoding = encoding;
        this.progressCallback = progressCallback;
        this.chunkSize = chunkSize;
        this.bytes = common_1.toBytes(this.buffer);
        this.init = this.init.bind(this);
    }
    init() {
        let signature;
        let localFileHeader;
        let centralDirHeader;
        let endCentDirHeader;
        let i;
        let n;
        let bytes = this.bytes;
        let localFileHeaders = [];
        let centralDirHeaders = [];
        let files = [];
        let folders = [];
        let offset = bytes.byteLength - 4;
        let view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const minTime = new common_1.MinTime(20);
        this.files = files;
        this.folders = folders;
        this.localFileHeaders = localFileHeaders;
        this.centralDirHeaders = centralDirHeaders;
        // check the first local file signature
        if (view.getUint32(0, true) !== common_1.LOCAL_FILE_SIGNATURE) {
            throw new Error('zip.unpack: invalid zip file');
        }
        // read the end central dir header.
        while (true) {
            if (view.getUint32(offset, true) === common_1.END_SIGNATURE) {
                endCentDirHeader = zip_archive_reader_1.readEndCentDirHeader(this.bytes.buffer, offset);
                break;
            }
            offset--;
            if (offset === 0)
                throw new Error('zip.unpack: invalid zip file');
        }
        // read central dir headers.
        offset = endCentDirHeader.startpos;
        for (i = 0, n = endCentDirHeader.direntry; i < n; ++i) {
            centralDirHeader = zip_archive_reader_1.readCentralDirHeader(this.bytes.buffer, this.bytes.byteOffset + offset);
            centralDirHeaders.push(centralDirHeader);
            offset += centralDirHeader.allsize;
        }
        // read local file headers.
        const offsetTotal = bytes.byteLength;
        let lastProgress = 0;
        const progressCallback = this.progressCallback;
        for (i = 0; i < n; ++i) {
            offset = centralDirHeaders[i].headerpos;
            localFileHeader = zip_archive_reader_1.readLocalFileHeader(this.bytes.buffer, this.bytes.byteOffset + offset);
            localFileHeader.crc32 = centralDirHeaders[i].crc32;
            localFileHeader.compsize = centralDirHeaders[i].compsize;
            localFileHeader.uncompsize = centralDirHeaders[i].uncompsize;
            localFileHeaders.push(localFileHeader);
            if (!progressCallback || !minTime.is())
                continue;
            let progress = Math.floor((offset / offsetTotal) * 100);
            if (lastProgress === progress)
                continue;
            progressCallback({ progress, debug: `Array` });
            lastProgress = progress;
        }
        if (progressCallback)
            progressCallback({ progress: Math.floor((offset / offsetTotal) * 100) });
        return this._completeInit();
    }
    _decompressFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = this._getFileInfo(fileName);
            return this._decompress(this.bytes.subarray(info.offset, info.offset + info.length), info.isCompressed);
        });
    }
    _decompressFileSync(fileName) {
        let info = this._getFileInfo(fileName);
        return this._decompress(this.bytes.subarray(info.offset, info.offset + info.length), info.isCompressed);
    }
}
exports.ZipBufferArchiveReader = ZipBufferArchiveReader;
