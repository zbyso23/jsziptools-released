"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
/**
 * Calculates Adler 32 checksum.
 *
 * @example
 * const checksum = jz.core.adler32(buffer);
 */
function adler32(bytes) {
    let _bytes = common_1.toBytes(bytes);
    let a = 1;
    let b = 0;
    let i = 0;
    let MOD_ADLER = 65521;
    let len = _bytes.length;
    let tlen;
    while (len > 0) {
        tlen = len > 5550 ? 5550 : len;
        len -= tlen;
        do {
            a += _bytes[i++];
            b += a;
        } while (--tlen);
        a %= MOD_ADLER;
        b %= MOD_ADLER;
    }
    return ((b << 16) | a) >>> 0;
}
exports.adler32 = adler32;
