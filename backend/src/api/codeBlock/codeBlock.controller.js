import CodeBlock from '../../models/codeBlock.model.js'

//Create
export const createCodeBlock = async (req, res) => {
    const { _id, title, codeTemplate, solution } = req.body
    try {
        // Check required fields
        if (!title || !codeTemplate || !solution) return res.status(400).send('All fields are required') //400 for bad request

        // Check if the blockId exists and validate it
        if (_id) {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return res.status(400).send('Invalid CodeBlock ID'); // Invalid ID
            }
        }

        // Query the database to check if the block exists
        const existingBlock = await CodeBlock.findOne({ title });
        if (existingBlock) {
            return res.status(400).send('title allready excists'); // title exists
        }


        const newCodeBlock = new CodeBlock(req.body)
        const savedCodeBlock = await newCodeBlock.save()
        res.status(201).json(savedCodeBlock); //201 for created
    } catch (error) {
        console.log("Error in codeBlock controller", error)
        res.status(500).send("Internal server error")
    }
}

//Read all
export const getCodeBlocks = async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find()
        res.status(200).json(codeBlocks); //200 for ok
    } catch (error) {
        console.log("Error in codeBlock controller", error)
        res.status(500).send("Internal server error")
    }
}

//Read one by id
export const getCodeBlockById = async (req, res) => {
    const { id } = req.params
    try {
        const codeBlock = await CodeBlock.findById(id)
        if (!codeBlock) return res.status(404).send('codeBlock not found') //404 for not found

        res.json(codeBlock)
    } catch (error) {
        console.log("Error in codeBlock controller", error)
        res.status(500).send("Internal server error")
    }
}

//update one by id
export const updateCodeBlockById = async (req, res) => {
    try {
        const updatedBlock = await CodeBlock.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Validate the data before updating
        })
        if (!updatedBlock) return res.status(404).send('codeBlock not found') //404 for not found

        res.status(200).json(updatedBlock)

    } catch (error) {
        console.log("Error in codeBlock controller", error)
        res.status(500).send("Internal server error")
    }
}

//Delete one by id
export const deleteCodeBlockById = async (req, res) => {
    try {
        const deletedCodeBlock = await CodeBlock.findByIdAndDelete(req.params.id)
        if (!deletedCodeBlock) return res.status(404).send('codeBlock not found') //404 for not found

        res.status(200).json({ message: 'codeBlock deleted successfully' })

    } catch (error) {
        console.log("Error in codeBlock controller", error)
        res.status(500).send("Internal server error")
    }
}


export const compareCode = async (req, res) => { }



