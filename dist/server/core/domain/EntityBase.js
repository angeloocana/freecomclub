import EntityMinBase from './EntityMinBase';
export default class EntityBase extends EntityMinBase {
    constructor(entity) {
        super(entity);
        this.createdBy = entity.createdBy;
        this.dtChanged = entity.dtChanged;
    }
}
