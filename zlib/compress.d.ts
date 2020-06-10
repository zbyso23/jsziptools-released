import { DeflateParams } from '../core';
export interface ZlibCompressParams extends DeflateParams {
}
/**
 * Compresses Uint8Array to a RFC 1951 ZLIB file format Uint8Array.
 *
 * @example
 * const bytes = jz.zlib.compress({
 *   buffer: buffer,
 *   level: 6,
 *   chunkSize: 0x8000
 * });
 */
export declare function compress(params: ZlibCompressParams): Uint8Array;
