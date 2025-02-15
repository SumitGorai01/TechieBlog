// this is a appwrite auth file which will handle task related to a comment of the article

import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import appwriteService from "./config";
import appwriteAuthService from "./auth";


export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createComment(data){
        try{
            console.log(data);
            
            const comment = await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
                ID.unique(),
                data
            )

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
        }catch(error){
            console.log("Appwrite service : : createPost :: error ", error);
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
                    const user = await appwriteAuthService.getUserById(comment.userId);
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
            console.log("Appwrite service :: getComments :: error ", error);
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
            console.log("Appwrite service :: getComment :: error ", error);
            throw error;
        }
    }
}

const service = new Service()
export default service