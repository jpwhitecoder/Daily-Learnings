import React from 'react'
import axios from "axios"
import { useState , useEffect } from 'react'

const Feed = () => {
    const [posts, setPosts] = useState([
        // {
        //     _id:"24234234344234234gfdge24423423423",
        //     image: "https://ik.imagekit.io/hdfrog/image_xhzDlMj58.jpg?updatedAt=1785953713895",
        //     caption:" This is the test caption "
        // }
    ]);

    useEffect(() => {
        axios.get("http://localhost:3000/posts").
        then((res)=> {
            // console.log(res.data)
            setPosts(res.data.posts)
        })
    },[])

  return (

    <section className='feed-section'>
        {posts.length > 0 ? (
            posts.map((post)=>(
                <div key={post._id} className="post-card">
                    <img src={post.image} alt={post.caption}/>
                    <p>{post.caption}</p>
                </div>
            ))
        ):(
            <h1>
                No posts available
            </h1>
        )

        }
    </section>
  )
}

export default Feed