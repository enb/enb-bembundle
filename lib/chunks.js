/**
 * chunks
 * ======
 *
 * Базовая технология для chunks-технологий.
 * Помогает реализовывать технологии для bembundle-сборок.
 */

var vow = require('vow');
var vowFs = require('enb/lib/fs/async-fs');
var crypto = require('crypto');

module.exports = require('enb/lib/build-flow').create()
    .name('chunks')
    .useFileList('chunk')
    .target('target', 'chunks.js')
    .builder(function (chunkFiles) {
        return vow.when(this.getChunks(chunkFiles)).then(function (items) {
            return 'module.exports = ' + JSON.stringify(items) + ';';
        });
    })
    .methods({
        getChunks: function (sourceFiles) {
            var _this = this;
            return vow.all(sourceFiles.map(function (sourceFile) {
                return vowFs.read(sourceFile.fullname, 'utf8').then(function (data) {
                    return _this.processChunk(sourceFile.fullname, data);
                });
            }));
        },
        processChunk: function (filename, data) {
            return vow.when(this.processChunkData(filename, data)).then(function (data) {
                var hash = crypto.createHash('sha1');
                hash.update(data);
                return {
                    fullname: filename,
                    data: data,
                    hash: hash.digest('base64')
                };
            });
        },
        processChunkData: function (filename, data) {
            return data;
        }
    })
    .createTech();
