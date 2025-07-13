const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  appwriteCommentCollectionId: import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID,
  appwritesaveForlaterCollectionId: import.meta.env.VITE_APPWRITE_SAVED_COLLECTION_ID,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  appwriteApiKey: import.meta.env.VITE_API_KEY,
};

export default conf;
