"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const core_1 = require("../../core");
const core_2 = require("../core");
/**
 * Compresses Uint8Array to a RFC 1952 GZIP file format Uint8Array.
 *
 * @example
 * jz.stream.gz.compress({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   level: 6,
 *   shareMemory: false,
 *   chunkSize: 0x8000,
 *   fname: "foo",
 *   fcomment: "bar"
 * });
 */
function compress({ buffer, streamFn, chunkSize, level, shareMemory, fname, fcomment, }) {
    const bytes = common_1.toBytes(buffer);
    let flg = 0;
    let headerLength = 10;
    let offset = 0;
    let now = Date.now();
    let header;
    let footer;
    let headerView;
    let _fname = fname && common_1.toBytes(fname);
    let _fcomment = fcomment && common_1.toBytes(fcomment);
    // add length of metadatas
    if (_fname) {
        headerLength += _fname.length + 1;
        flg |= 0x8;
    }
    if (_fcomment) {
        headerLength += _fcomment.length + 1;
        flg |= 0x10;
    }
    // write header
    header = new Uint8Array(headerLength);
    headerView = new DataView(header.buffer);
    headerView.setUint32(offset, 0x1f8b0800 | flg); // gzip header and flags
    offset += 4;
    headerView.setUint32(offset, now, true); // modificated
    offset += 4;
    headerView.setUint16(offset, 0x04ff);
    offset += 2;
    // add metadatas to header
    if (_fname) {
        header.set(_fname, offset);
        offset += _fname.length;
        header[offset++] = 0;
    }
    if (_fcomment) {
        header.set(_fcomment, offset);
        offset += _fcomment.length;
        header[offset++] = 0;
    }
    streamFn(header);
    // write body
    core_2.deflate({
        buffer: bytes,
        streamFn: streamFn,
        shareMemory: shareMemory,
        chunkSize: chunkSize,
    });
    // write footer
    footer = new Uint8Array(8);
    headerView = new DataView(footer.buffer);
    headerView.setUint32(0, core_1.crc32(bytes), true); // crc checksum
    headerView.setUint32(4, bytes.length, true); // isize
    streamFn(footer);
}
exports.compress = compress;
