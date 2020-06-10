import { StreamDeflateParams } from '../core';
export interface StreamGzipCompressParams extends StreamDeflateParams {
    fname?: string;
    fcomment?: string;
}
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
export declare function compress({buffer, streamFn, chunkSize, level, shareMemory, fname, fcomment}: StreamGzipCompressParams): void;
