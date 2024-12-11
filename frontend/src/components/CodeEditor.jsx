import Editor from '@monaco-editor/react';
import { useSocket } from '../hooks/useSocket';

export default function CodeEditor({ code, setCode }) {
    const { role } = useSocket()

    const isReadOnly = role === 'Mentor';
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
                    readOnly: isReadOnly,
                }}
            />
        </div>
    )
}

