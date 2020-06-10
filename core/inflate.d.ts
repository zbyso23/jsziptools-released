import { BufferLike } from '../common';
export interface InflateParams {
    buffer: BufferLike;
    chunkSize?: number;
}
/**
 * Decompresses RFC 1950 ZLIB Compressed data format Uint8Array.
 *
 * @example
 * const bytes = jz.core.inflate({
 *   buffer: buffer,
 *   chunkSize: 0x8000
 * });
 */
export declare function inflate(params: InflateParams): Uint8Array;
