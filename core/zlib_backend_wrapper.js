"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib = require("zlib-asm");
function setZlibBackend(_zlibBackend) {
    exports.zlibBackend = _zlibBackend;
}
exports.setZlibBackend = setZlibBackend;
setZlibBackend({
    deflate: zlib.deflate,
    inflate: zlib.inflate,
    rawDeflate: zlib.rawDeflate,
    rawInflate: zlib.rawInflate,
    stream: {
        deflate(buffer, streamFn, level, shareMemory, chunkSize) {
            zlib.stream.deflate({
                input: buffer,
                streamFn: streamFn,
                compressionLevel: level,
                shareMemory: shareMemory,
                chunkSize: chunkSize,
            });
        },
        inflate(buffer, streamFn, shareMemory, chunkSize) {
            zlib.stream.rawInflate({
                input: buffer,
                streamFn: streamFn,
                shareMemory: shareMemory,
                chunkSize: chunkSize,
            });
        },
        rawDeflate(buffer, streamFn, level, shareMemory, chunkSize) {
            zlib.stream.rawDeflate({
                input: buffer,
                streamFn: streamFn,
                compressionLevel: level,
                shareMemory: shareMemory,
                chunkSize: chunkSize,
            });
        },
        rawInflate(buffer, streamFn, shareMemory, chunkSize) {
            zlib.stream.rawInflate({
                input: buffer,
                streamFn: streamFn,
                shareMemory: shareMemory,
                chunkSize: chunkSize,
            });
        },
    },
});
