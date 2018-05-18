import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const CommitDiff = (props) => (
    <div>
        {
            props.commitDiffs.map((diff, i) =>
                <table key={i}>
                    <thead>
                        <tr>
                            <th>
                                {diff.newPath}
                            </th>
                        </tr>

                    </thead>
                    <tbody >
                        <tr>
                            <td>
                                <SyntaxHighlighter showLineNumbers={false}
                                    language='javascript'
                                    style={docco}>{diff.diff}</SyntaxHighlighter>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    </div>
)

export default CommitDiff;