import React from 'react';


const Description = ({ description }) => {
    return (
        <div className="notification">
            <h4 className="subtitle is-size-6">
                {description}
            </h4>
        </div>
    )
}

export default Description;