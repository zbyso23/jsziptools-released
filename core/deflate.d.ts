import { BufferLike } from '../common';
export interface DeflateParams {
    buffer: BufferLike;
    level?: number;
    chunkSize?: number;
}
/**
 * Compresses Uint8Array to a RFC 1950 ZLIB Compressed data format Uint8Array.
 *
 * @example
 * const bytes = jz.core.deflate({
 *   buffer: buffer,
 *   level: 6,
 *   chunkSize: 0x8000
 * });
 */
export declare function deflate(params: DeflateParams): Uint8Array;
