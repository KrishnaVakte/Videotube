# Videotube 🎥

A YouTube-like video-sharing platform built on the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with Cloudinary integration for media uploads. Videotube features core functionalities like video upload, comment, like, subscribe, channel tweets, and admin control for seamless user experience.

## 🚀 Demo

🔗 [Project Demo Link](https://videoutube.vercel.app/)  

Check out the live demo of Videotube in action!

## 📂 Project Features

- **User Authentication**: Secure login and signup with otp authentication.
- **Video Upload & Edit**: Upload and edit videos, powered by **Cloudinary**.
- **Like, Comment, Subscribe**: Engage with video content via likes, comments, and subscriptions.
- **Channel Tweets**: Unique feature allowing channel owners to tweet updates directly to their subscribers.
- **Admin Dashboard**: Admin users can manage videos, comments, and more.
  
## 💻 Tech Stack

- **Frontend**: React.js, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Cloud Storage**: Cloudinary (for media storage)
  
## 📁 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/KrishnaVakte/videotube.git
   cd videotube
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` directory and add the following:

   ```env
   PORT = 8000 
   CORS_ORIGIN= 

   MAIL_HOST = 
   MAIL_USER = 
   MAIL_PASS = 

   DB_NAME= videotube
   MONGODB_URI=

   ACCESS_TOKEN_SECRET=
   ACCESS_TOKEN_EXPIRY=
   REFRESH_TOKEN_SECRET=
   REFRESH_TOKEN_EXPIRY =

   CLOUDINARY_CLOUD_NAME = 
   CLOUDINARY_API_KEY = 
   CLOUDINARY_SECRET_KEY = 
   ```

4. **Run the application**

   In the project root directory:

   ```bash
   # Run backend
   cd server
   npm start

   # Run frontend
   cd client
   npm run dev
   ```

5. **Access the application**

   The application should be running on [http://localhost:5173](http://localhost:5173).

## 🛠️ Features Breakdown

### User Dashboard
- Sign up/login for new users.
- Upload and manage videos.
- Edit and delete video content.

### Video Engagement
- Like and comment on videos.
- Subscribe to channels.
- View channel tweets for updates.

### Admin Dashboard
- Manage uploaded videos.
- View user activities and comments.
- Edit or delete inappropriate content.


## 🚀 Future Enhancements

- Implement video streaming optimizations.
- Add user playlists.
- Enhance search and filtering options.
- Allow multiple admins for a channel.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and open pull requests. Contributions are welcome!

---

### 👨‍💻 Author

- **Name**: Krishna Vakte
- **LinkedIn**: [Krishna Vakte](https://www.linkedin.com/in/krishnavakte)
- **GitHub**: [KrishnaVakte](https://github.com/KrishnaVakte)

