import EntityMinBase from './EntityMinBase';
import {notEmptyString, equal} from 'ptz-assert';

describe('EntityMinBase', ()=>{

    describe('Id', ()=>{
        it('Generate Id',()=>{
            var entity = new EntityMinBase({}); 
            notEmptyString(entity.id);
        });

        it('Set _id to id',()=>{
            var id = "sdfds-sdfd-gfdg-33";
            var entity = new EntityMinBase({_id: id}); 
            equal(entity.id, id);
        });

        it('Set id',()=>{
            var id = "sdfds-sdfd-gfdg-33";
            var entity = new EntityMinBase({id: id}); 
            equal(entity.id, id);
        });
    });
});
