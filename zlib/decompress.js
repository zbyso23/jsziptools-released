"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const core_1 = require("../core");
/**
 * Decompresses RFC 1951 ZLIB file format Uint8Array.
 *
 * @example
 * const bytes = jz.zlib.decompress({
 *   buffer: buffer,
 *   chunkSize: 0x8000
 * });
 */
function decompress(params) {
    return core_1.zlibBackend.inflate(common_1.toBytes(params.buffer), params.chunkSize);
}
exports.decompress = decompress;
