import React from 'react';
const Errors = ({ errors }) => {
    const errorsList = errors
        ? errors.map(error => React.createElement("li", { key: error }, error))
        : [];
    return (React.createElement("ul", { className: "errors" }, errorsList));
};
Errors.propTypes = {
    errors: React.PropTypes.array
};
export default Errors;
