'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n        fragment on Store{\n            id,\n            linkConnection(first: $limit){\n                edges{\n                    node{\n                        id,\n                        ', '                \n                    }\n                }\n            }\n        }\n       '], ['\n        fragment on Store{\n            id,\n            linkConnection(first: $limit){\n                edges{\n                    node{\n                        id,\n                        ', '                \n                    }\n                }\n            }\n        }\n       ']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _CreateLinkMutation = require('../mutations/CreateLinkMutation');

var _CreateLinkMutation2 = _interopRequireDefault(_CreateLinkMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));

        _this.setLimit = function (e) {
            var newLimit = Number(e.target.value);
            _this.props.relay.setVariables({ limit: newLimit });
            console.log('newLimit', newLimit);
            console.log('relay', _this.props.relay);
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _reactRelay2.default.Store.update(new _CreateLinkMutation2.default({
                title: _this.refs.newTitle.value,
                url: _this.refs.newUrl.value,
                store: _this.props.store
            }));
            _this.refs.newTitle.value = "";
            _this.refs.newUrl.value = "";
        };
        return _this;
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {
            var content = this.props.store.linkConnection.edges.map(function (edge) {
                return _react2.default.createElement(_Link2.default, { key: edge.node.id, link: edge.node });
            });
            return _react2.default.createElement("div", null, _react2.default.createElement("h3", null, "Links"), _react2.default.createElement("form", { onSubmit: this.handleSubmit }, _react2.default.createElement("input", { type: "text", placeholder: "Title", ref: "newTitle" }), _react2.default.createElement("input", { type: "text", placeholder: "Url", ref: "newUrl" }), _react2.default.createElement("button", { type: "submit" }, "Add")), _react2.default.createElement("label", { htmlFor: 'pagination-limit' }, "Showing"), _react2.default.createElement("select", { id: 'pagination-limit', onChange: this.setLimit, defaultValue: this.props.relay.variables.limit }, _react2.default.createElement("option", { value: "10" }, "10"), _react2.default.createElement("option", { value: "20" }, "20")), _react2.default.createElement("ul", null, content));
        }
    }]);

    return Main;
}(_react2.default.Component);

Main = _reactRelay2.default.createContainer(Main, {
    initialVariables: {
        limit: 20
    },
    fragments: {
        store: function store() {
            return _reactRelay2.default.QL(_templateObject, _Link2.default.getFragment('link'));
        }
    }
});
exports.default = Main;