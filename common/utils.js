"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("./constants");
/**
 * Converts array-like object to an array.
 *
 * @example
 * jz.common.toArray(document.querySelectorAll("div"));
 */
function toArray(x) {
    return Array.prototype.slice.call(x);
}
exports.toArray = toArray;
/**
 * Converts Array, ArrayBuffer or String to an Uint8Array.
 *
 * @example
 * var bytes = jz.common.toBytes('foo');
 * var bytes = jz.common.toBytes([1, 2, 3]);
 */
function toBytes(buffer) {
    switch (Object.prototype.toString.call(buffer)) {
        case '[object String]':
            return stringToBytes(buffer);
        case '[object Array]':
        case '[object ArrayBuffer]':
            return new Uint8Array(buffer);
        case '[object Uint8Array]':
            return buffer;
        case '[object Int8Array]':
        case '[object Uint8ClampedArray]':
        case '[object CanvasPixelArray]':
            const b = buffer;
            return new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
        default:
            throw new Error('jz.utils.toBytes: not supported type.');
    }
}
exports.toBytes = toBytes;
function readFileAs(type, blob, encoding = 'UTF-8') {
    var executor;
    if (constants.ENV_IS_WORKER) {
        executor = resolve => {
            var fr = new FileReaderSync();
            switch (type) {
                case 'ArrayBuffer':
                    resolve(fr.readAsArrayBuffer(blob));
                    break;
                case 'Text':
                    resolve(fr.readAsText(blob, encoding));
                    break;
                case 'DataURL':
                    resolve(fr.readAsDataURL(blob));
                    break;
            }
        };
    }
    else {
        executor = (resolve, reject) => {
            var fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = err => reject(err);
            switch (type) {
                case 'ArrayBuffer':
                    fr.readAsArrayBuffer(blob);
                    break;
                case 'Text':
                    fr.readAsText(blob, encoding);
                    break;
                case 'DataURL':
                    fr.readAsDataURL(blob);
                    break;
            }
        };
    }
    return new Promise(executor);
}
exports.readFileAs = readFileAs;
/**
 * Read a file as a string.
 */
exports.readFileAsText = (blob, encoding) => readFileAs('Text', blob, encoding);
/**
 * Read a file as an ArrayBuffer object.
 */
exports.readFileAsArrayBuffer = (blob) => readFileAs('ArrayBuffer', blob);
/**
 * Read a file as a data url string.
 */
exports.readFileAsDataURL = (blob) => readFileAs('DataURL', blob);
/**
 * Converts string to an Uint8Array. its encoding is utf8.
 */
function stringToBytes(str) {
    let n = str.length;
    let idx = -1;
    let byteLength = 32;
    let bytes = new Uint8Array(byteLength);
    let _bytes;
    for (let i = 0; i < n; ++i) {
        let c = str.charCodeAt(i);
        if (c <= 0x7f) {
            bytes[++idx] = c;
        }
        else if (c <= 0x7ff) {
            bytes[++idx] = 0xc0 | (c >>> 6);
            bytes[++idx] = 0x80 | (c & 0x3f);
        }
        else if (c <= 0xffff) {
            bytes[++idx] = 0xe0 | (c >>> 12);
            bytes[++idx] = 0x80 | ((c >>> 6) & 0x3f);
            bytes[++idx] = 0x80 | (c & 0x3f);
        }
        else {
            bytes[++idx] = 0xf0 | (c >>> 18);
            bytes[++idx] = 0x80 | ((c >>> 12) & 0x3f);
            bytes[++idx] = 0x80 | ((c >>> 6) & 0x3f);
            bytes[++idx] = 0x80 | (c & 0x3f);
        }
        if (byteLength - idx <= 4) {
            _bytes = bytes;
            byteLength *= 2;
            bytes = new Uint8Array(byteLength);
            bytes.set(_bytes);
        }
    }
    return bytes.subarray(0, ++idx);
}
exports.stringToBytes = stringToBytes;
/**
 * Converts Uint8Array to a string.
 *
 * @example
 * jz.common.bytesToString(bytes).then(str => {
 *     console.log(str);
 * });
 *
 * jz.common.bytesToString(bytes, 'UTF-8').then(str => {
 *     console.log(str);
 * });
 */
function bytesToString(bytes, encoding = 'UTF-8') {
    return exports.readFileAsText(new Blob([bytes]), encoding);
}
exports.bytesToString = bytesToString;
/**
 * Converts Uint8Array to a string. You can use it only a worker process.
 *
 * @example
 * var str = jz.common.bytesToStringSync(bytes);
 * var str = jz.common.bytesToStringSync(bytes, 'UTF-8');
 */
function bytesToStringSync(bytes, encoding = 'UTF-8') {
    if (!constants.ENV_IS_WORKER)
        throw new Error('bytesToStringSync is available in worker.');
    return new FileReaderSync().readAsText(new Blob([toBytes(bytes)]), encoding);
}
exports.bytesToStringSync = bytesToStringSync;
/**
 * Detects encoding of the buffer like object.
 *
 * @example
 * const encoding = jz.common.detectEncoding(bytes);
 * jz.common.detectEncoding(bytes).then(type => {
 *     console.log(type);
 * });
 */
function detectEncoding(bytes) {
    let b = toBytes(bytes);
    for (let i = 0, n = b.length; i < n; ++i) {
        if (b[i] < 0x80) {
            continue;
        }
        else if ((b[i] & 0xe0) === 0xc0) {
            if ((b[++i] & 0xc0) === 0x80)
                continue;
        }
        else if ((b[i] & 0xf0) === 0xe0) {
            if ((b[++i] & 0xc0) === 0x80 && (b[++i] & 0xc0) === 0x80)
                continue;
        }
        else if ((b[i] & 0xf8) === 0xf0) {
            if ((b[++i] & 0xc0) === 0x80 && (b[++i] & 0xc0) === 0x80 && (b[++i] & 0xc0) === 0x80)
                continue;
        }
        else {
            return 'Shift_JIS';
        }
    }
    return 'UTF-8';
}
exports.detectEncoding = detectEncoding;
function load(args) {
    return __awaiter(this, arguments, void 0, function* () {
        const urls = (Array.isArray(args) ? args : toArray(arguments));
        return yield Promise.all(urls.map((url) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(url);
            return new Uint8Array(yield res.arrayBuffer());
        })));
    });
}
exports.load = load;
function concatBytes(_buffers) {
    let size = 0;
    let offset = 0;
    let ret;
    let i;
    let n;
    let buffers = (Array.isArray(_buffers) ? _buffers : toArray(arguments)).map(toBytes);
    for (i = 0, n = buffers.length; i < n; ++i)
        size += buffers[i].length;
    ret = new Uint8Array(size);
    for (i = 0; i < n; ++i) {
        ret.set(buffers[i], offset);
        offset += buffers[i].length;
    }
    return ret;
}
exports.concatBytes = concatBytes;
