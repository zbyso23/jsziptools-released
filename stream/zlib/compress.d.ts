import { StreamDeflateParams } from '../../stream/core';
export interface StreamZlibCompressParams extends StreamDeflateParams {
}
/**
 * Compresses Uint8Array to a RFC 1951 ZLIB file format Uint8Array.
 *
 * @example
 * jz.stream.zlib.compress({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   level: 6,
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * });
 */
export declare function compress(params: StreamZlibCompressParams): void;
