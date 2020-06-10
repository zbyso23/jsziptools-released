import { BufferLike } from '../common';
import { ZipArchiveReader, ZipArchiveReaderProgressCallback } from './zip_archive_reader';
export interface ZipArchiveReaderConstructorParams {
    buffer: BufferLike;
    encoding?: string;
    chunkSize?: number;
    progressCallback?: ZipArchiveReaderProgressCallback;
}
export declare class ZipBufferArchiveReader extends ZipArchiveReader {
    private bytes;
    constructor(params: ZipArchiveReaderConstructorParams);
    constructor(buffer: BufferLike, encoding?: string, progressCallback?: ZipArchiveReaderProgressCallback | null, chunkSize?: number);
    init(): Promise<this>;
    protected _decompressFile(fileName: string): Promise<Uint8Array>;
    protected _decompressFileSync(fileName: string): Uint8Array;
}
