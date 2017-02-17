interface IEntityMinBase {
    id?:string;
    _id?:string;
    errors?:string[];
    isValid():boolean;
    throwErrorIfIsInvalid():void;
}

interface IEntityMinBaseArgs {
    id?:string;
    _id?:string;
    errors?:string[];
}
