const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteCommentCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
    appwritesaveForLaterCollectionId: String(import.meta.env.VITE_APPWRITE_SAVEFORLATER_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
     appwriteEventCollectionId: String(import.meta.env.VITE_APPWRITE_EVENT_ID),
    apikey: String(import.meta.env.VITE_API_KEY),
    appwriteUserCollectionId: String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
    appwriteEventRegistrationCollectionId: String(import.meta.env.VITE_APPWRITE_REGISTRATION_COLLECTION_ID)
}

export default conf;