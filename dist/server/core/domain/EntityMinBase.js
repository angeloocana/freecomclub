export default class EntityMinBase {
    constructor(entity) {
        this.id = entity.id || entity._id;
        this.errors = entity.errors;
    }
}
