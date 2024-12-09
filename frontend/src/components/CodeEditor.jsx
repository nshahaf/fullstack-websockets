import Editor from '@monaco-editor/react';

export default function CodeEditor({ code, setCode }) {


    return (
        <div className="code-editor">
            <Editor
                defaultLanguage="javascript"
                theme="vs-dark"
                width="100%"
                height="100%"
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
        </div>
    )
}

