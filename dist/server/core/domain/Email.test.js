'use strict';

var _Email = require('./Email');

var _ptzAssert = require('ptz-assert');

describe('Email', function () {
    it('Valid Email', function () {
        (0, _ptzAssert.ok)((0, _Email.validateEmail)('alanmarcell@live.com'));
    });
    it('Invalid Email', function () {
        (0, _ptzAssert.notOk)((0, _Email.validateEmail)('alanmarcelllive.com'));
    });
});