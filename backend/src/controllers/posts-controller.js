import Post from '../models/post.js';
import HttpError from '../models/http-error.js';
import { validationResult } from 'express-validator';

// Create a new post
const createPost = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log(errors.array());
    //   return next(
    //     new HttpError('Invalid inputs passed, please check your data.', 422)
    //   );
    // }
    
    const { title, content, image } = req.body;
    const author = req.user; // Assuming 'name' is the property for author in req.user
  
    const newPost = new Post({
      author,
      title,
      content,
      image,
    });
  
    try {
      await newPost.save();
    } catch (err) {
        console.log(err);
      const error = new HttpError(
        'Creating post failed, please try again later.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({ post: newPost.toObject({ getters: true }) });
  };
  

// Get a post by ID
const getPost = async (req, res, next) => {
  try {
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      throw new HttpError('Post does not exist', 404);
    }
    res.json({ post: existingPost.toObject({ getters: true }) });
  } catch (error) {
    return handleError(error, next, 'Error while fetching post');
  }
};

// Get all posts
const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    const count = await Post.countDocuments();

    return res.status(200).json({
      posts: posts.map((post) => post.toObject({ getters: true })),
      totalPages: Math.ceil(count / limit),
      currentPage: page * 1,
    });
  } catch (error) {
    return handleError(error, next, 'Error while fetching posts');
  }
};

// Update a post
const updatePost = async (req, res, next) => {
  try {
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      throw new HttpError('Post does not exist', 404);
    }

    const { author, title, content, image } = req.body;

    if (author) {
      existingPost.author = author;
    }
    if (title) {
      existingPost.title = title;
    }
    if (content) {
      existingPost.content = content;
    }
    if (image) {
      existingPost.image = image;
    }

    const updatedPost = await existingPost.save();
    res.json({ post: updatedPost.toObject({ getters: true }) });
  } catch (error) {
    return handleError(error, next, 'Error while updating post');
  }
};

// Delete a post
const deletePost = async (req, res, next) => {
  try {
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      throw new HttpError('Post does not exist', 404);
    }

    await Post.findByIdAndDelete(existingPost.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    return handleError(error, next, 'Error while deleting post');
  }
};

const handleError = (error, next, message) => {
  if (error instanceof HttpError) {
    return next(error);
  }
  console.log(error);
  return next(new HttpError(message, 500));
};

export { createPost, getPost, getPosts, updatePost, deletePost };