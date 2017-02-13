'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityMinBase = function () {
    function EntityMinBase(entity) {
        _classCallCheck(this, EntityMinBase);

        this.id = entity.id || entity._id;
        this.errors = entity.errors;
    }

    _createClass(EntityMinBase, [{
        key: 'addError',
        value: function addError(error) {
            if (!this.errors) this.errors = [];
            this.errors.push(error);
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return !this.errors || this.errors.length == 0;
        }
    }, {
        key: 'throwErrorIfIsInvalid',
        value: function throwErrorIfIsInvalid() {
            if (this.errors && this.errors.length > 0) throw 'ERROR_INVALID_ENTITY';
        }
    }]);

    return EntityMinBase;
}();

exports.default = EntityMinBase;