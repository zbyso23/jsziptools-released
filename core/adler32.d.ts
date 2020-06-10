import { BufferLike } from '../common';
/**
 * Calculates Adler 32 checksum.
 *
 * @example
 * const checksum = jz.core.adler32(buffer);
 */
export declare function adler32(bytes: BufferLike): number;
