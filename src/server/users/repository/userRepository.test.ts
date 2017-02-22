import UserRepository from './userRepository';

describe('UserRepository', ()=>{
    describe('save', ()=>{
        it('insert');
        it('update');
    });

    describe('find', ()=>{
        it('limit by 3');
        it('limit by 5');
    });

    describe('getOtherUsersWithSameUserNameOrEmail', ()=>{
        it('find by email');
        it('find by userName');
        it('not found');
    });
    
    describe('getByUserNameOrEmail', ()=>{
        it('find by email');
        it('find by userName');
        it('not found');
    });
});
