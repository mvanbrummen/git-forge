import React from 'react';

const RepositoryTags = ({ tags }) => (
    <div className="tags">
        {
            tags.map((tag, i) =>
                <span key={i} className="tag">
                    {tag}
                </span>
            )
        }
    </div>
)

export default RepositoryTags;