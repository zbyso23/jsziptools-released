"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const zlib_backend_wrapper_1 = require("./zlib_backend_wrapper");
/**
 * Compresses Uint8Array to a RFC 1950 ZLIB Compressed data format Uint8Array.
 *
 * @example
 * const bytes = jz.core.deflate({
 *   buffer: buffer,
 *   level: 6,
 *   chunkSize: 0x8000
 * });
 */
function deflate(params) {
    return zlib_backend_wrapper_1.zlibBackend.rawDeflate(common_1.toBytes(params.buffer), params.level, params.chunkSize);
}
exports.deflate = deflate;
