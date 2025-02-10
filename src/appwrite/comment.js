// this is a appwrite auth file which will handle task related to a comment of the article

import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import appwriteService from "./config";


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
}


const service = new Service()
export default service