"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const zlib_backend_wrapper_1 = require("../../core/zlib_backend_wrapper");
/**
 * Decompresses RFC 1950 ZLIB Compressed data format Uint8Array.
 *
 * @example
 * jz.stream.core.inflate({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * });
 */
function inflate(params) {
    zlib_backend_wrapper_1.zlibBackend.stream.rawInflate(common_1.toBytes(params.buffer), params.streamFn, params.shareMemory, params.chunkSize);
}
exports.inflate = inflate;
