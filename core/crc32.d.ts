import { BufferLike } from '../common';
/**
 * Calcurates Crc 32 checksum.
 *
 * @example
 * let checksum;
 * chucks.forEach(c => checksum = jz.common.crc32(c, checksum));
 */
export declare function crc32(buffer: BufferLike | any, crc?: number): number;
