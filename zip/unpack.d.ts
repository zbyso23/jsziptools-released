import { BufferLike } from '../common';
import { ZipArchiveReader, ZipArchiveReaderProgressCallback } from './zip_archive_reader';
export interface ZipUnpackParams {
    buffer: BufferLike | Blob;
    encoding?: string;
    progressCallback?: ZipArchiveReaderProgressCallback;
    chunkSize?: number;
}
/**
 * Creates zip archive reader.
 *
 * @example
 * const reader = await jz.zip.unpack(buffer)
 * console.log(reader.getFileNames());
 */
export declare function unpack({buffer, encoding, progressCallback, chunkSize}: ZipUnpackParams): Promise<ZipArchiveReader>;
