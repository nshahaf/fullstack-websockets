import { Editor } from "@monaco-editor/react";

export default function CodeOutput({ output }) {

    return (
        <div className="code-output">
            <Editor
                defaultLanguage="javascript"
                theme="vs-dark"
                width="100%"
                height="100%"
                initialValue="//Run code to see the result"
                value={output}
                options={{
                    minimap: {
                        enabled: false
                    },
                    scrollBeyondLastLine: false,
                    readOnly: true,
                }}
            />
        </div>
    )
}
