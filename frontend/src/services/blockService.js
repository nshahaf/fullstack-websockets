import { axiosInstance as axios } from "./axios";

export const blockService = {
  getCodeBlocks,
  getCodeBlock,
  deleteCodeBlock,
  createCodeBlock,
  updateCodeBlock,
  normalizeCode,
  validateNormalizedCode,
  executeRequest,
}


//TODO refactor to try-catch block to handle errors

//Create
async function createCodeBlock(codeBlock) {
  const response = await axios.post(`/codeblocks/`, codeBlock);
  const savedCodeBlock = response.data
  return savedCodeBlock
}

//Read
async function getCodeBlocks() {
  const response = await axios.get('/codeblocks/')
  const codeBlocks = response.data
  return codeBlocks;
}

async function getCodeBlock(id) {
  const response = await axios.get(`/codeblocks/${id}`);
  const codeBlock = response.data
  return codeBlock
}

//Update
async function updateCodeBlock(codeBlock) {
  const { _id } = codeBlock
  const response = await axios.post(`/codeblocks/${_id}`, codeBlock);
  const updatedCodeBlock = response.data
  return updatedCodeBlock
}

//Delete
async function deleteCodeBlock(id) {
  const response = await axios.delete(`/codeblocks/${id}`);
  const deletedCodeBlock = response.data
  return deletedCodeBlock

}

function normalizeCode(code) {
  // Remove single-line comments
  let withoutSingleLine = code.replace(/\/\/.*$/gm, '');

  // Remove multi-line comments
  let withoutMultiLine = withoutSingleLine.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove semicolons at the end of lines
  let withoutSemicolons = withoutMultiLine.replace(/;\s*/g, '');

  // Remove all newlines and extra spaces
  let normalizedCode = withoutSemicolons
    .replace(/\s+/g, ' ') // Replace multiple spaces, tabs, or newlines with a single space
    .trim(); // Trim leading and trailing spaces
  return normalizedCode;
}

function validateNormalizedCode(studentCode, solutionCode) {
  // Normalize both codes
  const normalizedStudentCode = normalizeCode(studentCode);
  const normalizedSolutionCode = normalizeCode(solutionCode);

  // Compare normalized versions
  return normalizedStudentCode === normalizedSolutionCode;
}


function executeRequest(code) {
  const request = new Request('https://emkc.org/api/v2/piston/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      language: "javascript",
      version: "1.32.3",
      files: [
        {
          content: code
        }
      ]
    })
  });
  return request
}

