import React from 'react';
import ReactMarkdown from 'react-markdown';

const ReadmeTable = ({ readme }) => (
    <table className="table is-fullwidth is-bordered">
        <thead>
            <tr>
                <th><i class="fa fa-book"></i> README.md</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div className="content readme-contents">
                        <ReactMarkdown source={readme} />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
)

export default ReadmeTable;