export default class EntityMinBase implements IEntityMinBase{

    id:string;
    errors:string[];

    constructor(entity:IEntityMinBase){
        this.id = entity.id || entity._id;
        this.errors = entity.errors;
    }

    addError(error:string){
        if(!this.errors)
            this.errors = [];

        this.errors.push(error);
    }

    isValid(){
        return !this.errors || this.errors.length == 0;
    }

    throwErrorIfIsInvalid(){
        if(this.errors && this.errors.length > 0)
            throw 'ERROR_INVALID_ENTITY';
    }
}
