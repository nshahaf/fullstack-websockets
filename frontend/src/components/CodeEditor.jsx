import { useEffect, useState } from "react";
import Editor from '@monaco-editor/react';


export default function CodeEditor({ initialValue = "'Write your code here'", submit }) {
    const [code, setCode] = useState('');

    useEffect(() => {
        setCode(initialValue);

    }, [initialValue]);

    const handleSubmit = () => {
        submit(code);
    }

    return (
        <div className="code-editor">
            <Editor
                defaultLanguage="javascript"
                theme="vs-dark"
                width="100vw"
                height="600px"
                defaultValue="'Write your code here'"
                value={code}
                onChange={(code) => setCode(code)}

                options={{
                    minimap: {
                        enabled: false
                    },
                    scrollBeyondLastLine: false,
                    readOnly: false,
                }}
            />
            <button type="submit" onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
    )
}

