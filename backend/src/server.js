//setup
import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import logger from './middleware/logger.js';
import { connectDatabase } from './lib/db.js';

//routes
import codeBlockRoutes from './api/codeBlock/codeBlock.route.js'
import socketHandler from './lib/socket.js';

dotenv.config()

// Resolve __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url) //Converts the import.meta.url of the current module to a file system path.
const __dirname = dirname(__filename); //Determines the directory name of the current module’s file.

const app = express();

const server = createServer(app);

const corsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://localhost:5173'
  ],
  credentials: true
}

app.use(cookieParser())
app.use(express.json())

// Set up CORS for Express
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../public')))
} else {
  app.use(cors(corsOptions))
}

const io = new Server(server, { cors: corsOptions })
socketHandler(io)

app.use(logger)

app.use("/api/codeblocks", codeBlockRoutes)

//unhandled routes
app.get('/**', (req, res) => {
  res.sendFile(join(__dirname, '../../frontend/index.html'))
})



const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase()
});
