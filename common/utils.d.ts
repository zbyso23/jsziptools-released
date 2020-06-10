import { BufferLike } from './buffer_like';
/**
 * Converts array-like object to an array.
 *
 * @example
 * jz.common.toArray(document.querySelectorAll("div"));
 */
export declare function toArray<T>(x: any): T[];
/**
 * Converts Array, ArrayBuffer or String to an Uint8Array.
 *
 * @example
 * var bytes = jz.common.toBytes('foo');
 * var bytes = jz.common.toBytes([1, 2, 3]);
 */
export declare function toBytes(buffer: BufferLike): Uint8Array;
/**
 * Read a file as selected type. This is a FileReader wrapper.
 */
export declare function readFileAs(type: 'ArrayBuffer', blob: Blob): Promise<ArrayBuffer>;
export declare function readFileAs(type: 'Text', blob: Blob, encoding?: string): Promise<string>;
export declare function readFileAs(type: 'DataURL', blob: Blob): Promise<string>;
/**
 * Read a file as a string.
 */
export declare const readFileAsText: (blob: Blob, encoding?: string) => Promise<string>;
/**
 * Read a file as an ArrayBuffer object.
 */
export declare const readFileAsArrayBuffer: (blob: Blob) => Promise<ArrayBuffer>;
/**
 * Read a file as a data url string.
 */
export declare const readFileAsDataURL: (blob: Blob) => Promise<string>;
/**
 * Converts string to an Uint8Array. its encoding is utf8.
 */
export declare function stringToBytes(str: string): Uint8Array;
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
export declare function bytesToString(bytes: Uint8Array, encoding?: string): Promise<string>;
/**
 * Converts Uint8Array to a string. You can use it only a worker process.
 *
 * @example
 * var str = jz.common.bytesToStringSync(bytes);
 * var str = jz.common.bytesToStringSync(bytes, 'UTF-8');
 */
export declare function bytesToStringSync(bytes: BufferLike, encoding?: string): string;
/**
 * Detects encoding of the buffer like object.
 *
 * @example
 * const encoding = jz.common.detectEncoding(bytes);
 * jz.common.detectEncoding(bytes).then(type => {
 *     console.log(type);
 * });
 */
export declare function detectEncoding(bytes: BufferLike): "UTF-8" | "Shift_JIS";
/**
 * Loads buffers with Ajax(async).
 *
 * @example
 * jz.common.load(['a.zip', 'b.zip'])
 * .then(([a, b]) => {
 *   // arguments are Uint8Array
 * });
 * // or
 * jz.common.load('a.zip', 'b.zip')
 */
export declare function load(urls: string[]): Promise<Uint8Array[]>;
export declare function load(...urls: string[]): Promise<Uint8Array[]>;
/**
 * Concats bytes.
 *
 * @example
 * let bytes = jz.common.concatBytes(bytes1, bytes2, bytes3);
 * let bytes = jz.common.concatBytes([bytes1, bytes2, bytes3]);
 */
export declare function concatBytes(buffers: (Uint8Array | ArrayBuffer)[]): Uint8Array;
export declare function concatBytes(...buffers: (Uint8Array | ArrayBuffer)[]): Uint8Array;
