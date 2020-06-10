"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const core_1 = require("../../core");
/**
 * Compresses Uint8Array to a RFC 1951 ZLIB file format Uint8Array.
 *
 * @example
 * jz.stream.zlib.compress({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   level: 6,
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * });
 */
function compress(params) {
    core_1.zlibBackend.stream.deflate(common_1.toBytes(params.buffer), params.streamFn, params.level, params.shareMemory, params.chunkSize);
}
exports.compress = compress;
