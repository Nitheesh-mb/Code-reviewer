🚀 Code Reviewer (AI-Powered)

An intelligent AI-based Code Review Web Application that analyzes user-submitted code and provides automated suggestions, improvements, and best practices using AI.

📌 Overview

The Code Reviewer helps developers improve code quality by:

Detecting errors
Suggesting best practices
Providing AI-generated feedback

This project simulates a real-world automated code review system used in modern development workflows.

🛠️ Tech Stack
🔹 Frontend
React.js
HTML, CSS, JavaScript
🔹 Backend
Node.js
Express.js
🔹 Database
MongoDB (Mongoose)
🔹 Authentication
JWT (JSON Web Tokens)
🔹 AI Integration
Gemini API
⚙️ Features
✅ AI-powered code analysis
✅ User authentication (Login/Register)
✅ Secure API with JWT
✅ Review history storage
✅ Real-time feedback on code
✅ Clean and modular backend structure
🧩 Project Structure
Code-reviewer/
│
├── BackEnd/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── FrontEnd/
│   └── React App
│
└── README.md
🔄 How It Works
User logs in / registers
User submits code
Backend sends code to AI API
AI analyzes code and returns suggestions
Response is stored in database
Results are displayed to user
💡 Example
Input:
var a = 10
console.log(a)
Output:
Use let or const instead of var
Add semicolon
Follow best practices
🚀 Installation & Setup
🔹 Clone the repository
git clone https://github.com/Nitheesh-mb/Code-reviewer.git
cd Code-reviewer
🔹 Backend Setup
cd BackEnd
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_api_key

Run backend:

npm start
🔹 Frontend Setup
cd FrontEnd
npm install
npm start
🔐 Environment Variables

Make sure to configure:

MONGO_URI → MongoDB connection
JWT_SECRET → Authentication secret
GEMINI_API_KEY → AI integration
⚠️ Known Issues
Requires internet for AI API
AI responses may not always be perfect
API usage cost depends on usage
🔮 Future Enhancements
🔹 GitHub Pull Request integration
🔹 Multi-language code support
🔹 Code quality scoring system
🔹 Team collaboration features
🔹 Live code editor
👨‍💻 Author

Nitheesh M B

GitHub: https://github.com/Nitheesh-mb
⭐ Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

📄 License

This project is licensed under the MIT License.

❤️ Acknowledgment
Gemini API for AI-powered responses
Open-source community
🌟 Support

If you like this project, don’t forget to ⭐ the repo!
