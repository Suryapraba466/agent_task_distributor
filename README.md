**MERN Stack Developer Machine Test**

**Overview**

This project implements a basic application using the MERN stack with features for user login, agent management, and CSV upload for task distribution.

**Features**
1. Admin User Login
Admin can log in using email and password.
JWT authentication is used for secure login.

2. Agent Creation & Management
Admin can add and manage agents (name, email, mobile number, password).

3. Upload CSV and Distribute Lists
Admin can upload a CSV file containing tasks.
Tasks are distributed equally among agents.
Tasks are saved to MongoDB and displayed on the frontend.

**Technologies Used**

Backend: Node.js, Express.js, MongoDB, JWT Authentication
Frontend: React.js
Libraries: Axios, Lucide Icons, CSV Parser
Authentication: JSON Web Tokens (JWT)

**Setup and Execution Instructions**

Prerequisites
Node.js (v14 or higher)
MongoDB (locally or using a cloud database like MongoDB Atlas)
npm or yarn (Node package manager)

**Backend Setup**
1. Clone the Repository
git clone https://github.com/Suryapraba466/agent_task_distributor.git
cd agent_task_distributor/mern-backend

2. Install Dependencies
Install all the backend dependencies using npm or yarn.
npm install

Or, if you're using yarn:
yarn install

3. Setup Environment Variables
Create a .env file in the mern-backend folder and add the following variables:
MONGO_URI=mongodb+srv://suryapraba466:rwSTOJHB9FNjIliU@agentcluster.g9ulw.mongodb.net/TaskDistributor?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=9c524137ab46cba00e256939b8e431faa7a49d09f8b3629dc2569f2e93a5090ce7aa26bc328ebafee8b713bea10bf3d63c02385b4ac69cecf591a7b4ab9cf417

npm start

The backend server will be running at http://localhost:3000.

**Frontend Setup**
1. Navigate to Frontend Directory
cd ../mern-frontend

2. Install Dependencies
Install all the frontend dependencies using npm or yarn.
npm install

Or, if you're using yarn:
yarn install

3. Start the Frontend Development Server
Run the following command to start the frontend server:
npm start

The frontend will be running at http://localhost:3001.

**Contributing**
Fork the repository.
Clone your fork.
Create a new branch (git checkout -b feature-name).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to your fork (git push origin feature-name).
Open a pull request.
