import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function SearchedBlogs() {
    const {slug} = useParams()
    const [posts, setPosts] = useState([])

    const getSearchedBlogs = async() => {
        try {           
            appwriteService.getSearchedPosts(slug).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getSearchedBlogs()
    }, [slug])

    return (
        <div className='w-full py-8'>
        <Container>
            {posts ? (
                <div className='flex flex-wrap'> 
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'> 
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            ) : (
                <p>No blogs found</p>
            )}
        </Container>
        </div>
    )
}

export default SearchedBlogs
