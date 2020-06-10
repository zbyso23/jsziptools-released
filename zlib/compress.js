"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const core_1 = require("../core");
/**
 * Compresses Uint8Array to a RFC 1951 ZLIB file format Uint8Array.
 *
 * @example
 * const bytes = jz.zlib.compress({
 *   buffer: buffer,
 *   level: 6,
 *   chunkSize: 0x8000
 * });
 */
function compress(params) {
    return core_1.zlibBackend.deflate(common_1.toBytes(params.buffer), params.level, params.chunkSize);
}
exports.compress = compress;
