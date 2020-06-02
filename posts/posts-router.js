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















module.exports = router