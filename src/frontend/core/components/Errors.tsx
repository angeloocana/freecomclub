import React from 'react';

const Errors = ({ errors }) => {
    const errorsList = errors 
        ? errors.map(error => <li key={error}>{error}</li>)
        : [];

    return (
        <ul className="errors">
            {errorsList}
        </ul>
    );
};

Errors.propTypes = {
    errors: React.PropTypes.array
};

export default Errors;

