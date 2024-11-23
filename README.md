# ConvoApp - DOCX to PDF Converter

ConvoApp is a full-stack web application that allows users to upload DOCX files and convert them into PDF format. The backend is built using **Node.js** and **Express.js**, while the frontend is built using **React.js** and **Vite**.

---

## Features

- **Upload DOCX Files**: Users can upload `.docx` files for conversion.
- **Convert to PDF**: The app processes DOCX files and converts them into PDF using Puppeteer.
- **Download PDF**: Users can download the generated PDF file.
- **Full-Stack Application**: Includes both backend and frontend in a single repo.
- **Dockerized Application**: The application is containerized using Docker for easy setup and deployment.

---

## Tech Stack

- **Backend**: 
  - **Node.js**
  - **Express.js**
  - **Multer** (for handling file uploads)
  - **Mammoth** (for converting DOCX to HTML)
  - **Puppeteer** (for generating PDF from HTML)
  - **CORS** (for enabling cross-origin requests)

- **Frontend**:
  - **React.js**: A JavaScript library for building user interfaces.
  - **Vite**: A fast development environment for React.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **Axios**: For making HTTP requests to the backend API.

---

## Installation and Usage

### Prerequisites

1. **Node.js** (v14 or higher recommended)
2. **Docker** installed (if you want to run it in a container)

---

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/convoapp.git
   
   ```
2. Install the necessary dependencies:
   ```bash
   cd convoapp/backend
   npm install
   ```

 3. Create the necessary directories for file uploads and generated PDFs:

   ```bash
   mkdir -p uploads files
   ```
 4. Start the backend server:
   ```bash
   npm start
   ```
The backend will be running on http://localhost:3000.

### Front End Setup
  1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
  2. install the necessary dependencies:
   ```bash
   npm install
   ```
  3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be running on http://localhost:5173.
   
### Docker Setup
If you want to run the entire application (backend and frontend) in Docker, follow these steps.

# Build and Run Backend in Docker
1. Navigate to the backend directory:
   ```bash
    cd backend
   ```
2.Build the Docker image:
```bash
docker build -t convoapp-backend .
```
3. Run the backend container:
```bash
docker run -p 3000:3000 -v $(pwd)/uploads:/usr/src/app/uploads -v $(pwd)/files:/usr/src/app/files convoapp-backend
```
# Build and Run Frontend in Docker
1. Navigate to the Frontend directory:
   ```bash
    cd ../frontend
   ```
2.Build the Docker image:
```bash
ddocker build -t convoapp-frontend .
```
3. Run the frontend container:
```bash
docker run -p 5173:5173 convoapp-frontend
```
## Directory Structure
ConvoApp/
├── backend/
│   ├── index.js            # Main server file for handling requests
│   ├── uploads/            # Directory for uploaded DOCX files
│   ├── files/              # Directory for generated PDF files
│   ├── Dockerfile          # Docker configuration to containerize the app
│   ├── package.json        # Dependencies and scripts for Node.js
│   └── README.md           # Documentation for the backend
├── frontend/
│   ├── src/                # Source code for React frontend
│   ├── public/             # Public files for the frontend
│   ├── Dockerfile          # Docker configuration for the frontend
│   ├── package.json        # Dependencies and scripts for frontend (React)
│   └── README.md           # Documentation for the frontend




This `README.md` contains all the necessary commands for setting up both **frontend** and **backend** as well as Docker instructions, troubleshooting tips, and more. Just copy and paste it into your `README.md` file and you are ready to upload it to GitHub.




