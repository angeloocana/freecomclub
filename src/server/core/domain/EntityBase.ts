import EntityMinBase from './EntityMinBase';

export default class EntityBase extends EntityMinBase implements IEntityBase{

    createdBy:ICreatedBy;
    dtChanged:Date;

    constructor(entity:IEntityBase){
        super(entity);

        this.createdBy = entity.createdBy;
        this.dtChanged = entity.dtChanged;

    }
}

