'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AppDispatcher = require('../AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constants = require('../Constants');

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _links = [];
console.log("LinkStore");

var LinkStore = function (_EventEmitter) {
    _inherits(LinkStore, _EventEmitter);

    function LinkStore() {
        _classCallCheck(this, LinkStore);

        var _this = _possibleConstructorReturn(this, (LinkStore.__proto__ || Object.getPrototypeOf(LinkStore)).call(this));

        console.log("LinkStore register");
        _AppDispatcher2.default.register(function (action) {
            console.log('LinkStore action received');
            switch (action.actionType) {
                case _Constants.ActionTypes.RECEIVE_LINKS:
                    console.log('3. In Links Store');
                    _links = action.links;
                    _this.emit('change');
                    break;
                default:
                    break;
            }
        });
        return _this;
    }

    _createClass(LinkStore, [{
        key: 'getAll',
        value: function getAll() {
            return _links;
        }
    }]);

    return LinkStore;
}(_events.EventEmitter);

exports.default = new LinkStore();