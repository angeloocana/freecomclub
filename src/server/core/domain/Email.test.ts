import { validateEmail } from './Email';
import { ok, notOk } from 'ptz-assert';

describe('Email', function () {
    it('Valid Email', function () {
        ok(validateEmail('alanmarcell@live.com'));
    });
    it('Invalid Email', function(){
        notOk(validateEmail('alanmarcelllive.com'));
    });
})
