'use strict';

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _ptzAssert = require('ptz-assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('User', function () {
    describe('UserName', function () {
        it('Add error when empty username', function () {
            var user = new _User2.default({ userName: '', email: '', displayName: '' });
            (0, _ptzAssert.contains)(user.errors, 'ERROR_USER_USERNAME_REQUIRED');
        });
        it('Do not add error when valid username', function () {
            var user = new _User2.default({ userName: 'angeloocana', email: '', displayName: '' });
            (0, _ptzAssert.notContains)(user.errors, 'ERROR_USER_USERNAME_REQUIRED');
        });
        it('Should be lowercase', function () {
            var user = new _User2.default({ userName: 'AnGeLoOcAnA', email: '', displayName: '' });
            (0, _ptzAssert.equal)(user.userName, 'angeloocana');
        });
    });
    describe('Email', function () {
        it('Add error when empty email', function () {
            var user = new _User2.default({ userName: '', email: '', displayName: '' });
            (0, _ptzAssert.contains)(user.errors, 'ERROR_USER_EMAIL_REQUIRED');
        });
        it('Add error when invalid email', function () {
            var user = new _User2.default({ userName: '', email: 'angeloocanagmail.com', displayName: '' });
            (0, _ptzAssert.contains)(user.errors, 'ERROR_USER_EMAIL_INVALID');
        });
        it('Do not add error when valid email', function () {
            var user = new _User2.default({ userName: 'angeloocana', email: 'angeloocana@gmail.com', displayName: '' });
            (0, _ptzAssert.notContains)(user.errors, 'ERROR_USER_EMAIL_REQUIRED');
            (0, _ptzAssert.notContains)(user.errors, 'ERROR_USER_EMAIL_INVALID');
        });
        it('Should be lowercase', function () {
            var user = new _User2.default({ userName: 'AnGeLoOcAnA', email: 'AnGeLoOcAnA@gMaIl.CoM', displayName: '' });
            (0, _ptzAssert.equal)(user.email, 'angeloocana@gmail.com');
        });
    });
    describe('Update', function () {
        var dbUser, newUser, updatedUser;
        beforeEach(function () {
            dbUser = new _User2.default({
                id: 'OldId',
                userName: 'OldUserName',
                email: 'alanmarcell@live.com',
                displayName: 'Old Name',
                imgUrl: 'OldImage',
                passwordHash: 'OldHash',
                createdBy: {
                    dtCreated: new Date('1992-06-28'),
                    ip: '192.168.0.1',
                    userName: 'AngeloOcana',
                    name: 'Angelo Ocana',
                    userId: 'Old_Id'
                }
            });
            newUser = new _User2.default({
                id: 'NewId',
                userName: 'NewUserName',
                email: 'angeloocana@gmail.com',
                displayName: 'New Name',
                imgUrl: 'NewImage',
                passwordHash: 'NewHash',
                createdBy: {
                    dtCreated: new Date('1992-01-07'),
                    ip: '192.168.0.1',
                    userName: 'AlanMarcell',
                    name: 'Alan Marcell',
                    userId: 'New_Id'
                }
            });
            updatedUser = dbUser.update(newUser);
        });
        it('Should not update id', function () {
            (0, _ptzAssert.notEqual)(newUser.id, updatedUser.id);
        });
        it('Should not update createdBy', function () {
            (0, _ptzAssert.notEqual)(newUser.createdBy, updatedUser.createdBy);
        });
        it('Should update dtChanged', function () {
            newUser.dtChanged = new Date('1992-01-07');
            (0, _ptzAssert.ok)(updatedUser.dtChanged);
            (0, _ptzAssert.ok)(updatedUser.dtChanged > newUser.dtChanged);
        });
        it('Should add dtChanged', function () {
            newUser.dtChanged = null;
            (0, _ptzAssert.ok)(updatedUser.dtChanged);
        });
        it('Should update userName', function () {
            (0, _ptzAssert.equal)(newUser.userName, updatedUser.userName);
        });
        it('Should update email', function () {
            (0, _ptzAssert.equal)(newUser.email, updatedUser.email);
        });
        it('Should update emailConfirmed', function () {
            (0, _ptzAssert.equal)(newUser.email, updatedUser.email);
        });
        it('Should update displayName', function () {
            (0, _ptzAssert.equal)(newUser.displayName, updatedUser.displayName);
        });
        it('Should update imgUrl', function () {
            (0, _ptzAssert.equal)(newUser.imgUrl, updatedUser.imgUrl);
        });
        it('Should update passwordHash', function () {
            (0, _ptzAssert.equal)(newUser.passwordHash, updatedUser.passwordHash);
        });
    });
});