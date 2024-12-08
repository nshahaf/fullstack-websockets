//TODO: contain title: CodeBlock name
//TODO: a text editor with JS syntax highlight
//TODO: the text editor should contain the codeblock initial template
//TODO: contain a role indicator (student / mentor)
//TODO: should be read-only for mentor and editable for students
//TODO: If the mentor leaves the code-block page, students should be redirected to the lobby page, and any written code should be deleted.
//TODO: At any given time, each user can see how many students are in the room
//TODO: once the student changes the code to be equal to the solution, show a big smiley face on the screen :)

import { useParams } from "react-router-dom"

//* code editors lib options: React-Codemirror2, React-ace, React-monaco-editor (try this one first)


export default function CodeBlockPage() {
    const { codeBlock } = useParams();
    return (
        <div className="page code-block-page">
            <h1 className="title">{codeBlock}</h1>
            <h2 className="description"> description</h2>
            <h2 className="description"> code editor</h2>

        </div>
    )
}
