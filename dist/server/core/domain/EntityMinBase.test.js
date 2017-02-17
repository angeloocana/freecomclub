'use strict';

var _EntityMinBase = require('./EntityMinBase');

var _EntityMinBase2 = _interopRequireDefault(_EntityMinBase);

var _ptzAssert = require('ptz-assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('EntityMinBase', function () {
    describe('Id', function () {
        it('Generate Id', function () {
            var entity = new _EntityMinBase2.default({});
            (0, _ptzAssert.notEmptyString)(entity.id);
        });
        it('Set _id to id', function () {
            var id = "sdfds-sdfd-gfdg-33";
            var entity = new _EntityMinBase2.default({ _id: id });
            (0, _ptzAssert.equal)(entity.id, id);
        });
        it('Set id', function () {
            var id = "sdfds-sdfd-gfdg-33";
            var entity = new _EntityMinBase2.default({ id: id });
            (0, _ptzAssert.equal)(entity.id, id);
        });
    });
});