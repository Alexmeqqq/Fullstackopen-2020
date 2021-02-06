const blogRouter = require('express').Router()
const Blog = require('../models/index')
  
blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})

blogRouter.get('/:id',(req,res,next)=> {
    Blog.findById(req.params.id)
        .then(note => {
            if(note){
                return res.json(note)
            }else{
                return res.status(404).end()
            }
        })
        .catch(err => next(err))
})
  
blogRouter.post('/', (request, response,next) => {
    const {title,author,url,likes} = request.body
    if(!title || !author || !url || !likes){
      return response.status(400).json({
        error:"missing paramaters, double check all params"
      })
    }
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(err => next(err))
})    
blogRouter.delete('/:id',async (req,res,next) => {
  try{
    const person = await Blog.findById(req.params.id)
    if(!person){
      return res.status(404).json({
        error:'person does not exist!!'
      })
    }
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).json({ success: true })
  }catch(err){
    next(err)
  }
})
module.exports = blogRouter