import React from 'react';

const Errors = ({ errors }) => {
    const errorsList = errors 
        ? errors.map(error => <li>{error}</li>)
        : [];

    return (
        <ul>
            {errorsList}
        </ul>
    );
};

Errors.propTypes = {
    errors: React.PropTypes.array
};

export default Errors;

