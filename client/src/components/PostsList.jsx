import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialFormValues = {
     contents: '',
     title: '',
}

const PostsList = () => {
     const [ posts, setPosts ] = useState([])
     const [ formValues, setFormValues ] = useState(initialFormValues)
     
     const fetchPosts = () => {
          axios.get(`http://localhost:8000/api/posts`)
                    .then(response => {
                         console.log(response.data)
                         setPosts(response.data)
                    })
                    .catch(err => {
                         console.log(err)
                    })
     }

     const newPostSubmit = (e) => {
          e.preventDefault()
          console.log(formValues)
          axios.post(`http://localhost:8000/api/posts`, formValues)
               .then(response => {
                    console.log(response.data)
                    setFormValues(initialFormValues)
               })
               .catch(err => {
                    console.log(err)
               })
     }
     

     const handleChange = e => {
          setFormValues({
               ...formValues,
               [e.target.name]: e.target.value
          })
     }

     useEffect(() => {
          fetchPosts()
     }, [])

     return (
          <>
               <form onSubmit={newPostSubmit}>
                    <input
                         type='text'
                         name='contents'
                         onChange={handleChange}
                         placeholder='Contents'
                         onSubmit={newPostSubmit}
                    />
                    <input
                         type='text'
                         name='title'
                         onChange={handleChange}
                         placeholder='Title'
                         onSubmit={newPostSubmit}
                    />
                    <button
                         onClick={newPostSubmit}
                    >
                         Submit
                    </button>
               </form>
               {posts.map(post => {
                    return (
                         <div className='post-container' key={post.id}>
                              <h3>{post.contents}</h3>
                              <h2>"{post.title}"</h2>
                         </div>
                    )
               })}
          </>
     )
}

export default PostsList