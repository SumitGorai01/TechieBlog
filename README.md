# 1. TechieBlog

TechieBlog is a blogging platform that allows users to create, read, update, and delete blog posts. It provides a clean and user-friendly interface with essential features for content management. This project uses **Appwrite** as the backend, allowing for easy authentication, database management, and file storage.

Link :- https://techie-blogs.vercel.app/

## 1.1. Features

- User authentication (Login/Sign-up) via Appwrite
- Create, edit, and delete blog posts
- Categorize posts with tags and categories
- File upload support for images and media
- Responsive design for both desktop and mobile views

## 1.2. Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Tailwind css , React
- **Backend**: Appwrite for user authentication, database, and file storage
- **Database**: Appwrite Database
- **Authentication**: Appwrite Authentication
- **Link**: [Click Here](https://techie-blogs.vercel.app/)

## 1.3. Installation

### 1.3.1. Prerequisites

- Node.js and npm (or yarn) installed on your machine.
- Appwrite instance running locally or on a cloud server.

### 1.3.2. Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/SumitGorai01/TechieBlog.git

2. Navigate into the project directory:

    ```bash
    cd TechieBlog

3. Install the dependencies:

    ```bash
    npm install

4. Set up Appwrite:
    
    1. Install Appwrite if you haven’t already
    2. Create an Appwrite project.
    3. Set up your database and collections for blog posts, users, and comments.
    4. Generate an API key and configure Appwrite SDK in your project.

5. Configure environment variables for Appwrite:

    Create a .env file in the root directory and replace the following with .env.sample 

    ```bash
    VITE_APPWRITE_URL = ""
    VITE_APPWRITE_PROJECT_ID = ""
    VITE_APPWRITE_DATABASE_ID = ""
    VITE_APPWRITE_COLLECTION_ID = ""
    VITE_APPWRITE_BUCKET_ID = ""
    
6. Start the application:
    
    ```bash
    npm start

 7. The app should now be running at http://localhost:3000 (or another specified port).

## Usage
Once the app is running, you can:

1. Register an account and log in using Appwrite authentication
2. Start creating and managing blog posts
3. Add tags, categories, and images to posts
Comment on other users' posts

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. Before contributing, ensure that the tests pass and the code adheres to the project's coding standards.

## Steps to contribute:
1. Fork the repository
2. Create a new branch (git checkout -b feature/your-feature)
3. Make your changes and commit them
4. Push to the branch (git push origin feature/your-feature)
5. Create a pull request to the main repository
