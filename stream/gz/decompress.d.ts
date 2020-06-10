import { StreamInflateParams } from '../core';
export interface StreamGzipDecompressParams extends StreamInflateParams {
}
/**
 * Decompresses RFC 1952 GZIP Compressed data format Uint8Array.
 *
 * @example
 * jz.stream.gz.decompress({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * });
 */
export declare function decompress({buffer, streamFn, shareMemory, chunkSize}: StreamGzipDecompressParams): void;
