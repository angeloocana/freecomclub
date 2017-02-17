import EntityMinBase from './EntityMinBase';

export default class EntityBase extends EntityMinBase implements IEntityBase{

    createdBy:ICreatedBy;
    dtChanged:Date;

    constructor(entity:IEntityBase){        
        if(!entity)
            entity = {};

        super(entity);

        this.createdBy = entity.createdBy;
        this.dtChanged = entity.dtChanged;

    }
}

