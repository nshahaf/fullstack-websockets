import mongoose from "mongoose"

const codeBlockSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        codeTemplate: { type: String, required: true },
        solution: { type: String, required: true },
    },
    { timestamps: true }
)


const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema)
export default CodeBlock