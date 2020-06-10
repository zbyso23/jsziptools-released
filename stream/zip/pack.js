"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const zip_1 = require("../../zip");
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
function pack({ files, streamFn, level, shareMemory, chunkSize }) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        const writer = new zip_1.ZipArchiveWriter({ shareMemory, chunkSize });
        level = typeof level === 'number' ? level : 6;
        writer.on('data', streamFn);
        function packItem(level, path, item) {
            const dir = item.children || item.dir || item.folder;
            let buffer;
            level = typeof item.level === 'number' ? item.level : level;
            // init buffer and file path.
            if (dir) {
                path += item.name + (/.+\/$/.test(item.name) ? '' : '/');
                writer.writeDir(path);
                dir.forEach(item => packItem(level, path, item));
            }
            else {
                if (item.buffer != null)
                    buffer = item.buffer;
                if (buffer != null) {
                    path += item.name;
                }
                else {
                    throw new Error('jz.zip.pack: This type is not supported.');
                }
                writer.writeFile(path, common_1.toBytes(buffer), level);
            }
        }
        // load files with ajax(async).
        function loadFile(item) {
            const dir = item.children || item.dir || item.folder;
            if (dir) {
                dir.forEach(loadFile);
            }
            else if (!item.buffer && item.url) {
                promises.push(common_1.load(item.url).then((bytess) => (item.buffer = bytess[0])));
            }
        }
        files.forEach(loadFile);
        yield Promise.all(promises);
        files.forEach(item => packItem(level, '', item));
        writer.writeEnd();
    });
}
exports.pack = pack;
