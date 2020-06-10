"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const core_1 = require("../../core");
const core_2 = require("../core");
/**
 * Decompresses RFC 1952 GZIP Compressed data format Uint8Array.
 *
 * @example
 * jz.stream.gz.decompress({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * });
 */
function decompress({ buffer, streamFn, shareMemory, chunkSize }) {
    const bytes = common_1.toBytes(buffer);
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let flg;
    let ret;
    let crc;
    let offset = 10;
    if (view.getUint16(0) !== 0x1f8b)
        throw new Error('jz.gz.decompress: invalid gzip file.');
    if (bytes[2] !== 0x8)
        throw new Error('jz.gz.decompress: not deflate.');
    flg = bytes[3];
    // fextra
    if (flg & 0x4)
        offset += view.getUint16(offset, true) + 2;
    // fname
    if (flg & 0x8)
        while (bytes[offset++])
            ;
    // fcomment
    if (flg & 0x10)
        while (bytes[offset++])
            ;
    // fhcrc
    if (flg & 0x2)
        offset += 2;
    core_2.inflate({
        buffer: bytes.subarray(offset, bytes.length - 8),
        streamFn(chunk) {
            crc = core_1.crc32(chunk, crc);
            streamFn(chunk);
        },
        shareMemory,
        chunkSize,
    });
    if (crc !== view.getUint32(bytes.length - 8, true)) {
        throw new Error('js.stream.gz.decompress: file is broken.');
    }
}
exports.decompress = decompress;
