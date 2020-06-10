"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const gz_1 = require("../stream/gz");
/**
 * Compresses Uint8Array to a RFC 1952 GZIP file format Uint8Array.
 *
 * @example
 * const bytes = jz.gz.compress({
 *   buffer: buffer,
 *   level: 6,
 *   chunkSize: 0x8000,
 *   fname: "foo",
 *   fcomment: "bar"
 * });
 */
function compress(params) {
    const chunks = [];
    gz_1.compress(Object.assign({}, params, { buffer: params.buffer, streamFn: chunk => chunks.push(chunk) }));
    return common_1.concatBytes(chunks);
}
exports.compress = compress;
