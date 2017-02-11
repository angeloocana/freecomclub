"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EntityBase2 = require("../../core/domain/EntityBase");

var _EntityBase3 = _interopRequireDefault(_EntityBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_EntityBase) {
    _inherits(User, _EntityBase);

    function User(user) {
        _classCallCheck(this, User);

        var _this = _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, user));

        _this.userName = user.userName;
        _this.email = user.email;
        _this.emailConfirmed = user.emailConfirmed;
        _this.displayName = user.displayName;
        _this.imgUrl = user.imgUrl;
        _this.password = user.password;
        _this.passwordHash = user.passwordHash;
        return _this;
    }

    _createClass(User, [{
        key: "validateUserName",
        value: function validateUserName() {
            if (!this.userName || this.userName.length < 3) this.addError("ERROR_USER_USER_NAME_REQUIRED");
        }
    }, {
        key: "validateEmail",
        value: function validateEmail() {
            if (!this.email) this.addError("ERROR_USER_EMAIL_REQUIRED");
        }
    }, {
        key: "isValid",
        value: function isValid() {
            this.validateUserName();
            this.validateEmail();
            return _get(User.prototype.__proto__ || Object.getPrototypeOf(User.prototype), "isValid", this).call(this);
        }
    }]);

    return User;
}(_EntityBase3.default);

exports.default = User;