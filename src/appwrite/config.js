import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service : : createPost :: error ", error);

        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service : : updatePost :: error ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service : : deletePost :: error ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service : : getPost :: error ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service : : getAllPost :: error ", error);
            return false;
        }
    }

    async getSearchedPosts(key) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.search("title", [key]),
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log("Appwrite service : : getSearchedPosts :: error ", error);
            return
        }
    }

    async getPostsByUser(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId", userId),
                    Query.orderDesc("$createdAt")
                ]
            )
        } catch (error) {
            console.log("Appwrite service : : getPostsByUser :: error ", error);
            return false;
        }
    }

    //file upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(error);
            console.log("Appwrite service : : uploadFile :: error ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service : : createPost :: error ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    //addlikes
    async addLikes(id, userId) {
        try {
            const post = await this.getPost(id);
            const likedBy = post.likedBy || [];
            const updatedLikedBy = likedBy.includes(userId)
                ? likedBy.filter(id => id !== userId)
                : [...likedBy, userId];

            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                { likedBy: updatedLikedBy }
            );
        } catch (error) {
            console.log("Appwrite service : : addLikes :: error ", error);
            return false;
        }
    }

    async saveForLater(userId, postId) {
        try {
            console.log(`Fetching savedForLater document for userId: ${userId}`);
    
            let userSavedData;
    
            try {
                // Fetch the user's savedForLater document
                const response = await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwritesaveForlaterCollectionId,
                    [Query.equal("userId", userId)]
                );
    
                if (response.documents.length === 0) {
                    console.warn(`No savedForLater document found for userId: ${userId}`);
                    userSavedData = null;
                } else {
                    userSavedData = response.documents[0]; // Assuming one document per user
                    console.log("Existing document found:", userSavedData);
                }
            } catch (error) {
                console.error(`Error fetching document for userId: ${userId}`, error);
                throw error; // Propagate error up for debugging
            }
    
            // If no document exists, create one
            if (!userSavedData) {
                try {
                    console.log(`Creating new savedForLater document for userId: ${userId}`);
    
                    userSavedData = await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwritesaveForlaterCollectionId,
                        ID.unique(), // Generate a unique ID instead of using userId
                        { userId, savedPosts: [] }
                    );
    
                    console.log("New document created successfully:", userSavedData);
                } catch (error) {
                    console.error(`Error creating document for userId: ${userId}`, error);
                    throw error; // Stop execution if document creation fails
                }
            }
    
            // Ensure savedPosts exists
            const savedPosts = userSavedData.savedPosts || [];
    
            // Toggle save state (add/remove postId)
            const updatedSavedPosts = savedPosts.includes(postId)
                ? savedPosts.filter(id => id !== postId)
                : [...savedPosts, postId];
    
            console.log(`Updating saved posts for userId: ${userId}, new list:`, updatedSavedPosts);
    
            // Update the document
            try {
                const updatedDoc = await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwritesaveForlaterCollectionId,
                    userSavedData.$id, // Use the correct document ID
                    { savedPosts: updatedSavedPosts }
                );
    
                console.log(`Document updated successfully for userId: ${userId}`, updatedDoc);
                return updatedDoc;
            } catch (error) {
                console.error(`Error updating document for userId: ${userId}`, error);
                throw error;
            }
        } catch (error) {
            console.error("Appwrite service :: saveForLater :: error", error);
            return false;
        }
    }

    async getsaveForLater(userId) {
        try {
            console.log(`Fetching savedForLater posts for userId: ${userId}`);
    
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritesaveForlaterCollectionId,
                [Query.equal("userId", userId)]
            );
    
            if (response.documents.length === 0) {
                console.warn(`No saved posts found for userId: ${userId}`);
                return [];
            }
    
            console.log("Saved posts retrieved successfully:", response.documents[0]);
            return response.documents[0].savedPosts;
    
        } catch (error) {
            console.error(`Error fetching saved posts for userId: ${userId}`, error);
            return [];
        }
    }
    
}

const service = new Service()
export default service