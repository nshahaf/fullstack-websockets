import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { blockService } from "../services/blockService.js";

import CodeEditor from "../components/CodeEditor";
import CodeOutput from "../components/CodeOutput.jsx";

export default function CodeBlockPage() {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState(null)
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        blockService.getCodeBlock(id)
            .then(res => {
                setCodeBlock(res)
                setCode(res.codeTemplate)
            })
    }, [id]);


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


    return (
        <div className="page code-block-page">
            <h1 className="title">{codeBlock ? codeBlock.title : 'Loading...'}</h1>
            <p className="description">
                {codeBlock?.description}
            </p>
            <div className="excerise-container">
                <CodeEditor code={code} setCode={setCode} />
                <CodeOutput output={output} />
            </div>
            <button type="submit" onClick={handleSubmit} className="submit-btn">Run Code</button>
        </div>
    )
}

