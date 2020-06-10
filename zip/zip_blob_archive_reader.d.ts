import { ZipArchiveReader, ZipArchiveReaderProgress, ZipArchiveReaderProgressCallback } from './zip_archive_reader';
export interface ZipBlobArchiveReaderConstructorParams {
    blob: Blob;
    encoding?: string;
    chunkSize?: number;
    progressCallback?: (progress: ZipArchiveReaderProgress) => any;
}
/**
 * ZipBlobArchiveReader
 */
export declare class ZipBlobArchiveReader extends ZipArchiveReader {
    private blob;
    constructor(params: ZipBlobArchiveReaderConstructorParams);
    constructor(blob: Blob, encoding?: string, progressCallback?: ZipArchiveReaderProgressCallback | null, chunkSize?: number);
    init(): Promise<this>;
    protected _decompressFile(fileName: string): Promise<Uint8Array>;
    protected _decompressFileSync(fileName: string): Uint8Array;
}
