import React from 'react';
import Errors from './Errors';
import classNames from 'classnames';

interface ITextInputProps {
    onChange?: () => any;
    possibleErrors?: string[];
    errors?: string[];
    label: string
    placeholder?: string;
}

class TextInput extends React.Component<ITextInputProps, any> { // eslint-disable-line react/prefer-stateless-function

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

        return (
            <div className={classNames('form-group', { 'has-error': hasError })}>
                <label>{label}</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeholder}
                    ref={(f) => { this.field = f; }}
                />
                <Errors errors={localErrors} />
            </div>
        );
    }
}

export default TextInput;
