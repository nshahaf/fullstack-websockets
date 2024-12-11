# Moveo home assignment
 
## Objective
**The goal is to create a collaborative online coding platform with real-time features, including:**

- A lobby page where users choose a code block.
- Code block pages where mentors (Tom) and students can interact with code.
- Real-time updates using sockets.
- Syntax highlighting and solution validation.
- Managing and displaying user roles (mentor | student).

## General guidelines:
 - Code blocks should be stored in a database of your choice (Relational or Not-Relational)
 - The initial state of the database should contain at least four code blocks which can be created manually.
- Add clear comments to the code where needed.
The task requires the development of a client, server, and database.
- The client side must be implemented using React, while the server side can be built with any framework or language of your choice.

## Required Features
### 1. Lobby Page:

- Title: "Choose code block". [x]
- List of at least 4 code blocks stored in a database. [x]
- Clicking on an item redirects to the corresponding code block page. [x]

### 2. Code Block Page:
- Title [x], text editor [x], and role indicator. [x]
- Role Logic:
    - The first user on a code block page becomes the mentor. [x]
    - Subsequent users are students. [x]
- Mentor:
    - Read-only view of the code block. [x]
- Students:
    - Editable code block with syntax highlighting. [x]
    - Updates are displayed in real-time via sockets. [x]
- Solution Check:
    - Compare the student’s code to a predefined solution. [x]
    - Display a big smiley face upon match. [x]

### 3. Real-time Features:
- Updates through a socket-based system (e.g., Socket.IO). [x]
- Show the count of students in the room. [x]

## Implementation Plan
### Backend
- **Framework:** Node.js with Express 
- **Real-time Communication:** Socket.IO for WebSocket implementation.
- **Database:** MongoDB with mongoose library for integration and access

#### EndPoints
- **GET /codeblocks**: Retrieve all code blocks for the lobby page.
- **GET /codeblocks/:id**: Retrieve details of a specific code block (id, title, initial template, solution).
#### Socket Events:
- **Join/Leave Room:** Track users entering/leaving a code block page.
- **Real-time Code Updates:** Emit changes to other connected clients.
- **Mentor Disconnect:** Notify students and redirect back to the lobby. (unsave code changes)

### Frontend
- **Framework:** Vite + React with css / sass (scss) for styling
- **Pages:**
    - Lobby Page: 
        - Fetch code blocks from the backend. [x]
        - Display a clickable list of code blocks. [x]
        - Redirect to /codeblock/:id when a block is selected. [x]
    - Code Block Page:
        - Text editor with syntax highlighting (use libraries like Monaco Editor or CodeMirror). [x]
        - Role-based view: [x]
            - Mentor: Read-only mode.
            - Student: Editable mode.
        - Real-time code updates using Socket.IO. [x]
        - Display the number of connected students. [x]
- **frontend tech:** React, scss, react-router-dom, React-context, custom hooks , webSockets, restAPI ,react-hot-toast, axios

### Deployment
- **Frontend:** Github pages + Render
- **Backend:** Github pages + Render
- **Database:** MongoDB 

## Submission instructions: 
- Deploy the project and supply the url for the app.
- You can use any service you would like for hosting your deployment (There are many free services for that purpose - railway.app, Netlify, Vercel etc. )

- Upload your code to GitHub and attach a link to your GitHub repository.