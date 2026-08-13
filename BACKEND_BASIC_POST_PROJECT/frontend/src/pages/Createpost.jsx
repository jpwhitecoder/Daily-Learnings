import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Createpost = () => {
    const naviagate  = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)
        console.log(e.target)
        
        axios.post("http://localhost:3000/create-post",formData).
        then((res)=> {
            naviagate("/feed")
        }).catch((err) => {
            console.log(err)
            alert("Error creating post")
        })
        
    }
  return (
    <section className="create-post-section">
        <h1>create post</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" id="" accept='image/*'/>
            <input type="text" name="caption" id="" placeholder="Enter caption" required/>
            <button type="submit" >Submit</button>
        </form>

    </section>
  )
}

export default Createpost