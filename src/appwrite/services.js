import { Client, Databases, ID, Query } from 'appwrite';
import conf from '../conf'; // your env variables

const client = new Client();

client
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId);

const databases = new Databases(client);

// Save post for later
export const savePost = async (userId, postId) => {
  try {
    const res = await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteSavedCollectionId,
      ID.unique(),
      {
        userId,
        postId
      }
    );
    return res;
  } catch (error) {
    console.error("Error saving post:", error);
    throw error;
  }
};

// Get all saved posts by user
export const getSavedPosts = async (userId) => {
  try {
    const res = await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteSavedCollectionId,
      [Query.equal('userId', userId)]
    );
    return res.documents;
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    throw error;
  }
};
