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

    async createPost({ title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            return false;
        }
    }

    async updatePost(id, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            return false;
        }
    }

    async deletePost(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
        } catch (error) {
            console.log("Appwrite service :: getAllPost :: error", error);
            return false;
        }
    }

    async getSearchedPosts(key) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.search("title", key),
                    Query.equal("status", "active")
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: getSearchedPosts :: error", error);
            return;
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
            );
        } catch (error) {
            console.log("Appwrite service :: getPostsByUser :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
    getFileView(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
    }

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
            console.log("Appwrite service :: addLikes :: error", error);
            return false;
        }
    }

    async saveForLater(userId, postId) {
        try {
            let userSavedData;

            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritesaveForLaterCollectionId,
                [Query.equal("userId", userId)]
            );

            userSavedData = response.documents[0] || null;

            if (!userSavedData) {
                userSavedData = await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwritesaveForLaterCollectionId,
                    ID.unique(),
                    { userId, savedPosts: [] }
                );
            }

            const savedPosts = userSavedData.savedPosts || [];
            const updatedSavedPosts = savedPosts.includes(postId)
                ? savedPosts.filter(id => id !== postId)
                : [...savedPosts, postId];

            const updatedDoc = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritesaveForLaterCollectionId,
                userSavedData.$id,
                { savedPosts: updatedSavedPosts }
            );

            return updatedDoc;
        } catch (error) {
            console.error("Appwrite service :: saveForLater :: error", error);
            return false;
        }
    }

    async getsaveForLater(userId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritesaveForLaterCollectionId,
                [Query.equal("userId", userId)]
            );

            return response.documents[0]?.savedPosts || [];
        } catch (error) {
            console.error("Appwrite service :: getsaveForLater :: error", error);
            return [];
        }
    }
}

const service = new Service();
export default service;