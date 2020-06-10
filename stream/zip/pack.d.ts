import { ZipItem } from '../../zip';
export interface StreamZipPackParams {
    files: ZipItem[];
    streamFn?(chunk: Uint8Array): any;
    level?: number;
    shareMemory?: boolean;
    chunkSize?: number;
}
/**
 * Creates zip archive.
 *
 * @example
 * jz.stream.zip.pack({
 *   files: [
 *     {name: "foo.mp3", buffer: mp3Buffer}
 *   ],
 *   streamFn: chunk => console.log(chunk.length),
 *   level: 6,
 *   shareMemory: false,
 *   chunkSize: 0x8000
 * })
 */
export declare function pack({files, streamFn, level, shareMemory, chunkSize}: StreamZipPackParams): Promise<void>;
