"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const core_1 = require("../../core");
/**
 * Decompresses RFC 1951 ZLIB file format Uint8Array.
 *
 * @example
 * jz.stream.zlib.decompress({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * });
 */
function decompress(params) {
    core_1.zlibBackend.stream.inflate(common_1.toBytes(params.buffer), params.streamFn, params.shareMemory, params.chunkSize);
}
exports.decompress = decompress;
