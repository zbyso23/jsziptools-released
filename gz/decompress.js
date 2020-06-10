"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const gz_1 = require("../stream/gz");
/**
 * Decompresses RFC 1952 GZIP file format Uint8Array.
 *
 * @example
 * const bytes = jz.gz.decompress({
 *   buffer: buffer,
 *   chunkSize: 0x8000
 * });
 */
function decompress(params) {
    const chunks = [];
    gz_1.decompress(Object.assign({}, params, { buffer: params.buffer, streamFn: chunk => chunks.push(chunk) }));
    return common_1.concatBytes(chunks);
}
exports.decompress = decompress;
