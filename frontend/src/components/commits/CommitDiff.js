import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const CommitDiff = (props) => (
    <div>
        {
            props.commitDiffs.map((diff, i) =>
                <table className="table is-fullwidth is-bordered" key={i}>
                    <thead>
                        <tr>
                            <th>
                                {diff.newPath}
                            </th>
                        </tr>

                    </thead>
                    <tbody >
                        <tr>
                            <td className="code-td">
                                <div className="content">
                                    <SyntaxHighlighter showLineNumbers={false}
                                        language='javascript'
                                        style={docco}>{diff.diff}</SyntaxHighlighter>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    </div>
)

export default CommitDiff;