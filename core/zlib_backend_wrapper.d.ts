export interface ZlibBackend {
    deflate(buffer: Uint8Array, compressionLevel?: number, chunkSize?: number): Uint8Array;
    rawDeflate(buffer: Uint8Array, compressionLevel?: number, chunkSize?: number): Uint8Array;
    inflate(buffer: Uint8Array, chunkSize?: number): Uint8Array;
    rawInflate(buffer: Uint8Array, chunkSize?: number): Uint8Array;
    stream: {
        deflate(buffer: Uint8Array, streamFn: (chunk: Uint8Array) => void, compressionLevel?: number, shareMemory?: boolean, chunkSize?: number): void;
        rawDeflate(buffer: Uint8Array, streamFn: (chunk: Uint8Array) => void, compressionLevel?: number, shareMemory?: boolean, chunkSize?: number): void;
        inflate(buffer: Uint8Array, streamFn?: (chunk: Uint8Array) => any, shareMemory?: boolean, chunkSize?: number): void;
        rawInflate(buffer: Uint8Array, streamFn?: (chunk: Uint8Array) => any, shareMemory?: boolean, chunkSize?: number): void;
    };
}
export declare let zlibBackend: ZlibBackend;
export declare function setZlibBackend(_zlibBackend: ZlibBackend): void;
