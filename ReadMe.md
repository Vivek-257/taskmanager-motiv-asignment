this task-manager projects is createad in MERN stack.
for backend I have used Nodejs and express with mongodb.....i have also created a 
beautiful frontend for good user experience

the steps to run this project 
1. clone this reposiroty by using the repo link https://github.com/Vivek-257/taskmanager-motiv-asignment.git
2. after cloning you will get the Task-manager assignemnt directory.
3. first change directory using cd command - cd backend ....now do npm install to install all dependencies
4. please make a .env file in root of backend and paste these credentials
5.< MONGO_URI=mongodb+srv://vivek:vivek257@test-pro-db.vxpn5ig.mongodb.net/task-manager-asignment?retryWrites=true&w=majority&appName=test-pro-db
JWT_SECRET=12345>
6. run the backend using npm run start
7. open another instance of terminal in vscode
8. do the same in frontend by going in cd frontend/client   do npm install and run the frontend using npm run dev

front end will run and you will get in the home page....


this is a loom demo of my app

https://www.loom.com/share/800c007e8e054488b4faa36ff9ea7ba9


Task Manager App - Documentation
Overview
The Task Manager App is a MERN stack project designed for task management with user authentication, role-based access, and analytics. Users can create, update, delete, and track tasks, while admins have additional privileges to manage all tasks.

Tech Stack
Frontend:
React (SPA architecture)
React Router (Navigation)
Axios (API requests)
Tailwind CSS (Styling)
Backend:
Node.js & Express.js (REST API)
MongoDB (Database)
Mongoose (ODM)
JWT Authentication (Secure user login)
bcrypt.js (Password hashing)
Other Technologies:
Redis (Session management)
Docker (For deployment)
Project Structure
Features & API Endpoints
1️⃣ Authentication
Route	Method	Description
/api/auth/register	POST	Register a new user
/api/auth/login	POST	Authenticate user & return JWT
/api/auth/logout	POST	Destroy session
2️⃣ Tasks Management
Route	Method	Description
/api/tasks	GET	Fetch all tasks (Admin)
/api/tasks/user	GET	Fetch tasks assigned to logged-in user
/api/tasks	POST	Create a new task
/api/tasks/:id	PUT	Update task details (Admin)
/api/tasks/:id	DELETE	Delete a task


3️⃣ Role-Based Access Control
Users: Can manage their assigned tasks.
Admins: Can create, edit, delete, and assign tasks to users.

this is the overview of this application
time taken to build-10 hours

Future Improvements
✅ Implement Drag & Drop for task status
✅ Add real-time updates with WebSockets
✅ Integrate Graph-based Analytics
