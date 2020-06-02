const express = require('express')

const Posts = require('../data/db')

const router = express.Router()


//GETs
router.get('/', (req, res) => {
     Posts.find(req.query)
          .then(posts => {
               res.status(200).json(posts)
          })
          .catch(error => {
               console.log(error)
               res.status(500).json({
                    error: "The posts information could not be retrieved."
               })
          })
})

router.get('/:id', (req, res) => {
     Posts.findById(req.params.id)
          .then(post => {
               if(post) {
                    res.status(200).json(post)
               } else if (!post.id) {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
               }
          })
          .catch(error => {
               console.log(error)
               res.status(500).json({ error: "The post information could not be retrieved." })
          })
})

router.get('/:id/comments', (req, res) => {
     const postId = req.params.id
     Posts.findPostComments(postId)
          .then(comments => {
               if(comments){
                    res.status(200).json(comments)
               } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
               }
          })
          .catch(error => {
               res.status(500).json({ error: "The comments information could not be retrieved." })
          })
})

//POSTs
router.post('/', (req, res) => {
     const newPost = req.body
     if(newPost.title && newPost.contents){
          res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
     } else {
          Posts.insert(newPost)
               .then(post => {
                         res.status(201).json(post)
                    }
               )
               .catch(error => {
                    res.status(500).json({ error: "There was an error while saving the post to the database" })
               })
     }
})

router.post('/:id/comments', (req, res) => {
     const postId = req.params.id
     const newComment = {
          ...req.body, 
          post_id: postId
     }
     if(!postId){
          res.status(400).json({ errorMessage: "Please provide text for the comment." })
     } else {
          Posts.insertComment(newComment)
               .then(comment => {
                    res.status(201).json(comment)
               })
               .catch(error => {
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
               })
     }
})















module.exports = router