import uuid from 'uuid/v4';

export default class EntityMinBase implements IEntityMinBase{

    id:string;
    errors:string[];

    constructor(entity?:IEntityMinBaseArgs){
        if(!entity)
            entity = {};

        this.setId(entity);
        this.errors = entity.errors;
    }

    addError(error:string){
        if(!this.errors)
            this.errors = [];

        this.errors.push(error);
    }

    private setId(entity){
        this.id = entity.id || entity._id;
        
        if(!this.id)
            this.id = uuid();
    }

    isValid():boolean{
        return !this.errors || this.errors.length == 0;
    }

    throwErrorIfIsInvalid(){
        if(this.errors && this.errors.length > 0)
            throw 'ERROR_INVALID_ENTITY';
    }
}
