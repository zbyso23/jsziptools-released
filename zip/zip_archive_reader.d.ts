import { BufferLike } from '../common';
export interface ZipLocalFileHeader {
    signature: number;
    needver: number;
    option: number;
    comptype: number;
    filetime: number;
    filedate: number;
    crc32: number;
    compsize: number;
    uncompsize: number;
    fnamelen: number;
    extralen: number;
    headersize: number;
    allsize: number;
    fileNameAsBytes: Uint8Array;
    fileName: string;
}
export interface ZipCentralDirHeader extends ZipLocalFileHeader {
    madever: number;
    commentlen: number;
    disknum: number;
    inattr: number;
    outattr: number;
    headerpos: number;
    allsize: number;
}
export interface ZipEndCentDirHeader {
    signature: number;
    disknum: number;
    startdisknum: number;
    diskdirentry: number;
    direntry: number;
    dirsize: number;
    startpos: number;
    commentlen: number;
}
export interface ZipArchiveReaderProgress {
    progress: number;
    debug?: any;
}
export declare type ZipArchiveReaderProgressCallback = (progress: ZipArchiveReaderProgress) => any;
/**
 * ZipArchiveReader
 *
 * @example
 * jz.zip.unpack(buffer).then(reader => {
 *   const fileNames = reader.getFileNames();
 *   reader.readFileAsText(fileNames[0]).then(text => {
 *     console.log(text);
 *   });
 *   // You can use sync methods in web worker.
 *   console.log(reader.readFileAsTextSync(fileNames[0]));
 * });
 */
export declare abstract class ZipArchiveReader {
    protected buffer: BufferLike;
    protected chunkSize: number;
    protected encoding: string;
    protected progressCallback: (progress: ZipArchiveReaderProgress) => any | null;
    protected files: ZipLocalFileHeader[];
    protected folders: ZipLocalFileHeader[];
    protected localFileHeaders: ZipLocalFileHeader[];
    protected centralDirHeaders: ZipCentralDirHeader[];
    abstract init(): Promise<this>;
    protected abstract _decompressFile(fileName: string): Promise<Uint8Array>;
    protected abstract _decompressFileSync(fileName: string): Uint8Array;
    getFileNames(): string[];
    getFiles(): ZipLocalFileHeader[];
    getFolders(): ZipLocalFileHeader[];
    readFileAsArrayBuffer(fileName: string): Promise<ArrayBuffer>;
    readFileAsBlob(fileName: string, contentType?: string): Promise<Blob>;
    readFileAsText(fileName: string, encoding?: string): Promise<string>;
    readFileAsDataURL(fileName: string): Promise<string>;
    readFileAsArrayBufferSync(fileName: string): ArrayBuffer;
    readFileAsBlobSync(fileName: string, contentType?: string): Blob;
    readFileAsTextSync(fileName: string, encoding?: string): string;
    readFileAsDataURLSync(fileName: string): string;
    protected _completeInit(): Promise<this>;
    protected _getFileIndex(fileName: string): number;
    protected _getFileInfo(fileName: string): {
        offset: number;
        length: number;
        isCompressed: boolean;
    };
    protected _decompress(bytes: Uint8Array, isCompressed: boolean): Uint8Array;
}
export declare function readEndCentDirHeader(buffer: ArrayBuffer, offset: number): {
    signature: number;
    disknum: number;
    startdisknum: number;
    diskdirentry: number;
    direntry: number;
    dirsize: number;
    startpos: number;
    commentlen: number;
};
export declare function readCentralDirHeader(buffer: ArrayBuffer, offset: number): ZipCentralDirHeader;
export declare function readLocalFileHeader(buffer: ArrayBuffer, offset: number): ZipLocalFileHeader;
