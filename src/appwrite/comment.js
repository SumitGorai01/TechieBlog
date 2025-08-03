// this is a appwrite auth file which will handle task related to a comment of the article

import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import appwriteService from "./config";
import appwriteAuthService from "./auth";
import { Permission, Role } from "appwrite";

export class Service {
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createComment(data) {
    try {
        console.log("data",data);

        const permissions = [
            Permission.read(Role.user(data.commentBy)),    // commenter can read
            Permission.update(Role.user(data.commentBy)),  // commenter can edit
            Permission.delete(Role.user(data.commentBy)),  // commenter can delete
            Permission.read(Role.any()),                   // anyone can read
        ];

        const comment = await this.database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCommentCollectionId,
            ID.unique(),
            data,
            permissions 
        );

        const post = await appwriteService.getPost(data.article);
        let comments = post.comments || [];
        let updatedComments = [...comments, comment.$id];

        const updatedPost = await this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            data.article,
            { comments: updatedComments }
        );

        console.log(updatedPost);
        return comment;
    } catch (error) {
        console.log("Appwrite service :: createComment :: error", error);
        throw error;
    }
}


    async getComments(articleId, { limit = 10, offset = 0 } = {}) {
        try {
            if (!articleId) {
                throw new Error("Article ID is required");
            }

            const comments = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                [
                    Query.equal('article', [articleId]),
                    Query.orderDesc('$createdAt'),
                    Query.limit(limit),
                    Query.offset(offset)
                ]
            );

            const commentsWithUsers = await Promise.all(
                comments.documents.map(async (comment) => {
                    const user = await appwriteAuthService.getUserById(comment.commentBy);
                    return {
                        ...comment,
                        user: {
                            name: user.name,
                            profilePicture: user.profilePicture,
                        }
                    };
                })
            );

            return {
                comments: commentsWithUsers,
                total: comments.total
            };
        } catch (error) {
            console.log("Appwrite service :: getComments :: error", error);
            throw error;
        }
    }

    async getComment(commentId) {
        try {
            const comment = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                commentId
            );

            const user = await appwriteAuthService.getUserById(comment.userId);
            return {
                ...comment,
                user: {
                    name: user.name,
                    profilePicture: user.profilePicture,
                }
            };
        } catch (error) {
            console.log("Appwrite service :: getComment :: error", error);
            throw error;
        }
    }

    async updateComment(commentId, updatedData) {
        try {
            const updatedComment = await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                commentId,
                updatedData
            );
            return updatedComment;
        } catch (error) {
            console.log("Appwrite service :: updateComment :: error", error);
            throw error;
        }
    }

    async deleteComment(commentId, articleId) {
        try {
            // Delete the comment
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                commentId
            );

            // Remove the comment ID from the related article's comment list
            const post = await appwriteService.getPost(articleId);
            const updatedComments = (post.comments || []).filter(id => id !== commentId);

            await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                articleId,
                { comments: updatedComments }
            );

            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteComment :: error", error);
            throw error;
        }
    }
}


const service = new Service()
export default service