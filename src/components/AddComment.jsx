import React from "react";
import appwriteService from "../appwrite/comment"

export default function AddComment () {

    const submitComment = async () => {
        const data = {
            commentBy : '679fa880000084781482', 
            commentBody : "This is a comment Body 2 ",
            article : "last",
            commentedOn: new Date().toISOString()
        }
        console.log(data);
        try{
            const response = await appwriteService.createComment(data)
            console.log(response);
        }catch(err){
            console.log(response);
        }
    }

    return(
        <button onClick={submitComment}>Comment</button>
    )
}