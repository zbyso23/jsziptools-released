import { BufferLike } from '../../common';
export interface StreamInflateParams {
    buffer: BufferLike;
    streamFn(chunk: Uint8Array): any;
    shareMemory?: boolean;
    chunkSize?: number;
}
/**
 * Decompresses RFC 1950 ZLIB Compressed data format Uint8Array.
 *
 * @example
 * jz.stream.core.inflate({
 *   buffer: buffur,
 *   streamFn: chunk => {
 *     console.log(chunk.length);
 *   },
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * });
 */
export declare function inflate(params: StreamInflateParams): void;
