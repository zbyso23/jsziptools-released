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
const common_1 = require("../common");
const zip_1 = require("../stream/zip");
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
function pack(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let chunks = [];
        yield zip_1.pack(Object.assign({}, params, { shareMemory: false, streamFn: chunk => chunks.push(chunk) }));
        return common_1.concatBytes(chunks);
    });
}
exports.pack = pack;
