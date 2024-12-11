import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { blockService } from "../services/blockService.js";

import CodeEditor from "../components/CodeEditor";
import CodeOutput from "../components/CodeOutput.jsx";
import { socket } from "../sockets/client.js";

export default function CodeBlockPage() {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState(null)
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [solution, setSolution] = useState('')
    const [isSolved, setIsSolved] = useState(false)

    useEffect(() => {
        blockService.getCodeBlock(id)
            .then(res => {
                setCodeBlock(res)
                setCode(res.codeTemplate)
                setSolution(res.solution)
            })
    }, [id]);

    useEffect(() => {
        socket.on('codeUpdate', (updatedCode) => {
            setCode(updatedCode)
        })
        return () => {
            socket.off('codeUpdate')
        }
    }, [])

    useEffect(() => {
        if (code && solution) {
            setIsSolved(() => blockService.validateNormalizedCode(code, solution))
        }
    }, [code, solution])



    const handleSubmit = async () => {
        const response = await fetch(blockService.executeRequest(code));
        const data = await response.json();
        if (data.run.code === 0) {
            setOutput(data.run.output)
        }
        if (data.run.code === 1) {
            console.log('Error:' + data.run.output);
            setOutput('//Error executing code');
        }
    }

    const handleCodeChange = (newCode, roomId) => {
        socket.emit('codeUpdate', newCode, roomId)
        setCode(newCode)
    }

    return (
        <div className="page code-block-page">
            <h1 className="title">{codeBlock ? codeBlock.title : 'Loading...'}</h1>
            <p className="description">
                {codeBlock?.description}
            </p>
            <CodeEditor code={code} setCode={setCode} handleCodeChange={handleCodeChange} />
            <button type="submit" onClick={handleSubmit} className="submit-btn">Run Code</button>
            <h2 className="console">Output</h2>
            <CodeOutput output={output} />
            <div className="excerise-container">
            </div>
            {isSolved && <img src="/smiley.png" className='big-smily-face' alt="smiley face"></img>}
        </div>
    )
}

