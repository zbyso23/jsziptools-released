"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./core/adler32"));
__export(require("./core/crc32"));
__export(require("./core/deflate"));
__export(require("./core/inflate"));
__export(require("./core/zlib_backend_wrapper"));
