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
const zip_buffer_archive_reader_1 = require("./zip_buffer_archive_reader");
const zip_blob_archive_reader_1 = require("./zip_blob_archive_reader");
/**
 * Creates zip archive reader.
 *
 * @example
 * const reader = await jz.zip.unpack(buffer)
 * console.log(reader.getFileNames());
 */
function unpack({ buffer, encoding, progressCallback, chunkSize }) {
    return __awaiter(this, void 0, void 0, function* () {
        let reader;
        if (buffer instanceof Blob) {
            reader = new zip_blob_archive_reader_1.ZipBlobArchiveReader(buffer, encoding, progressCallback, chunkSize);
        }
        else {
            reader = new zip_buffer_archive_reader_1.ZipBufferArchiveReader(buffer, encoding, progressCallback, chunkSize);
        }
        return yield reader.init();
    });
}
exports.unpack = unpack;
