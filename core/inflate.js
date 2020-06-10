"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const zlib_backend_wrapper_1 = require("./zlib_backend_wrapper");
/**
 * Decompresses RFC 1950 ZLIB Compressed data format Uint8Array.
 *
 * @example
 * const bytes = jz.core.inflate({
 *   buffer: buffer,
 *   chunkSize: 0x8000
 * });
 */
function inflate(params) {
    return zlib_backend_wrapper_1.zlibBackend.rawInflate(common_1.toBytes(params.buffer), params.chunkSize);
}
exports.inflate = inflate;
