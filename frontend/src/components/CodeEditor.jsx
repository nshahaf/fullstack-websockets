import Editor from '@monaco-editor/react';
import { useSocket } from '../hooks/useSocket';

export default function CodeEditor({ code, handleCodeChange }) {
    const { role, roomId } = useSocket()

    const onChange = (newCode) => {
        // console.log(newCode)
        handleCodeChange(newCode, roomId)
    }

    const isReadOnly = role === 'Mentor';
    return (
        <div className="code-editor">
            <Editor
                defaultLanguage="javascript"
                theme="vs-dark"
                width="100%"
                height="100%"
                value={code}
                onChange={(val) => onChange(val)}
                options={{
                    wordWrap: true,
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

