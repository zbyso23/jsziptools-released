import { BufferLike } from '../../common';
export interface StreamDeflateParams {
    buffer: BufferLike;
    streamFn(chunk: Uint8Array): any;
    level?: number;
    shareMemory?: boolean;
    chunkSize?: number;
}
/**
 * Compresses Uint8Array to a RFC 1950 ZLIB Compressed data format Uint8Array.
 *
 * @example
 * jz.stream.core.deflate({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   level: 6,
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * });
 */
export declare function deflate(params: StreamDeflateParams): void;
