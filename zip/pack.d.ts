import { ZipItem } from './zip_item';
export interface ZipPackParams {
    files: ZipItem[];
    level?: number;
    chunkSize?: number;
}
/**
 * Creates zip archive.
 *
 * @example
 * jz.zip.pack([
 *   {name: "hello.txt", buffer: "hello world"},
 *   {name: "foo.mp3", buffer: mp3buff},
 *   {name: "bar", dir: [{name: "foo.txt", buffer: "foo"}]}
 * ]).then(result => console.log(result.length));
 */
export declare function pack(params: ZipPackParams): Promise<Uint8Array>;
