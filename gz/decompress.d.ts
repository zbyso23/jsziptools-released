import { InflateParams } from '../core';
export interface GzipDecompressParams extends InflateParams {
}
/**
 * Decompresses RFC 1952 GZIP file format Uint8Array.
 *
 * @example
 * const bytes = jz.gz.decompress({
 *   buffer: buffer,
 *   chunkSize: 0x8000
 * });
 */
export declare function decompress(params: GzipDecompressParams): Uint8Array;
