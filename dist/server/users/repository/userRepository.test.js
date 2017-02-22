'use strict';

describe('UserRepository', function () {
    describe('save', function () {
        it('insert');
        it('update');
    });
    describe('find', function () {
        it('limit by 3');
        it('limit by 5');
    });
    describe('getOtherUsersWithSameUserNameOrEmail', function () {
        it('find by email');
        it('find by userName');
        it('not found');
    });
    describe('getByUserNameOrEmail', function () {
        it('find by email');
        it('find by userName');
        it('not found');
    });
});