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
- ![techie-blog](https://github.com/user-attachments/assets/d010c27b-1b1e-4eea-999c-f9d0c9433f86)


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
If you don’t have an Appwrite account, follow these steps:
    1. Register for an account on the [Appwrite website]().
    2. Verify your email address.
    3. Log in to your Appwrite account.
    4. Create a new project in Appwrite to organize your resources.
    5. Set up a new database in the project to store data.
    6. Create a new collection within the database to organize data documents.
    7. Add necessary permissions and document security settings for the created collection.
    8. Set up storage and create a bucket in Appwrite to store files.
    9. Add necessary permissions and document security settings for the storage bucket.
    10. Generate an API key and configure Appwrite SDK in your project.

5. Set up TinyMCE:
    1. Simply create an account on [TinyMCE website](https://www.tiny.cloud/).
    2. Get your API key.

6. Configure environment variables for:

    Create a .env file in the root directory and replace the following with .env.sample 

    ```bash
    VITE_APPWRITE_URL = ""
    VITE_APPWRITE_PROJECT_ID = ""
    VITE_APPWRITE_DATABASE_ID = ""
    VITE_APPWRITE_COLLECTION_ID = ""
    VITE_APPWRITE_BUCKET_ID = ""
    VITE_API_KEY = ""
7. Start the application:
    
    ```bash
    npm run dev
    ```
8. The app should now be running at http://localhost:5173 (or another specified port).

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
