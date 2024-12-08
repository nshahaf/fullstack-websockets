//setup
import express from 'express';
import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import logger from './middleware/logger.js';
import { connectDatabase } from './lib/db.js';

//routes
import authRoutes from './api/auth/auth.route.js'

dotenv.config()

const app = express();
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://localhost:5173'
    ],
    credentials: true
  }
  app.use(cors(corsOptions))
}

app.use(logger)

app.use("/api/auth", authRoutes)

//unhandled routes
app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase()
});
