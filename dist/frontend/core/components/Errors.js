import React from 'react';
const Errors = ({ errors }) => {
    const errorsList = errors
        ? errors.map(error => React.createElement("li", null, error))
        : [];
    return (React.createElement("ul", null, errorsList));
};
Errors.propTypes = {
    errors: React.PropTypes.array
};
export default Errors;
