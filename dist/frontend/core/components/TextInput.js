import React from 'react';
import Errors from './Errors';
import classNames from 'classnames';
class TextInput extends React.Component {
    value() {
        return this.field.value;
    }
    render() {
        var { possibleErrors, errors, label, placeholder } = this.props;
        const localErrors = errors && errors.length > 0 && possibleErrors && possibleErrors.length > 0
            ? errors.filter(error => possibleErrors.indexOf(error) >= 0)
            : [];
        const hasError = localErrors.length > 0;
        placeholder = placeholder ? placeholder : label;
        return (React.createElement("div", { className: classNames('form-group', { 'has-error': hasError }) },
            React.createElement("label", null, label),
            React.createElement("input", { type: "text", className: "form-control", placeholder: placeholder, ref: (f) => { this.field = f; } }),
            React.createElement(Errors, { errors: localErrors })));
    }
}
export default TextInput;
