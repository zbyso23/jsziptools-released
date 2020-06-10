import { BufferLike } from '../common';
export interface ZipArchiveWriterConstructorParams {
    shareMemory?: boolean;
    chunkSize?: number;
}
/**
 * ZipArchiveWriter
 *
 * @example
 * const writer = new ZipArchiveWriter();
 * writer.on("data", chunk => console.log(chunk));
 * writer.on("end", () => console.log(chunk));
 * writer.writeFile("foo.mp3", mp3Buffer);
 * writer.writeFile("bar.txt", "hello world!");
 * wirter.writeEnd();
 */
export declare class ZipArchiveWriter {
    private dirs;
    private centralDirHeaders;
    private offset;
    private date;
    private listeners;
    readonly shareMemory: boolean;
    readonly chunkSize: number;
    constructor(params?: ZipArchiveWriterConstructorParams);
    write(path: string, buffer: BufferLike, level?: number): void;
    writeDir(path: string): this;
    writeFile(path: string, buffer: BufferLike, level?: number): this;
    writeEnd(): void;
    on(name: 'data', callback: (bytes: Uint8Array) => any): this;
    on(name: 'end', callback: () => any): this;
    on(name: string, callback: Function): this;
    private trigger(name, data);
}
