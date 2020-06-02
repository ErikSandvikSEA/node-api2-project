const express = require('express')

const postsRouter = require('./posts/posts-router')

const server = express()

//middleware
server.use(express.json())

//endpoints
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
     res.send(`
          <h2>Lambda POSTS API</h>
          <p>Welcome to the Lambda POSTS API</p>
     `)
})


server.listen(8000, () => {
     console.log('\n*** Server Running on http://localhost:8000 ***\n')
})