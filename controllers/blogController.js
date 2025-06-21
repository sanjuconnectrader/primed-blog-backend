import db from '../models/index.js';
import fs from 'fs';

const Blog = db.Blog;

// Create a new blog post
export const createBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const { title, contents, date, readTime, category } = req.body;
    const image = fs.readFileSync(req.file.path);

    const blog = await Blog.create({
      title,
      contents,
      date,
      readTime,
      category,
      img: image,
      imgName: req.file.originalname,
      imgType: req.file.mimetype,
    });

    // Remove the file from uploads folder after saving to database
    fs.unlinkSync(req.file.path);

    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all blog posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [['date', 'DESC']],
    });

    // Convert blob images to base64 for client
    const blogsWithImages = blogs.map((blog) => {
      const blogData = blog.get({ plain: true });
      if (blogData.img) {
        blogData.img = `data:${blog.imgType};base64,${blogData.img.toString('base64')}`;
      }
      return blogData;
    });

    res.status(200).json(blogsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const blogData = blog.get({ plain: true });
    if (blogData.img) {
      blogData.img = `data:${blog.imgType};base64,${blogData.img.toString('base64')}`;
    }

    res.status(200).json(blogData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    let updateData = {
      title: req.body.title,
      contents: req.body.contents,
      date: req.body.date,
      readTime: req.body.readTime,
      category: req.body.category,
    };

    if (req.file) {
      const image = fs.readFileSync(req.file.path);
      updateData.img = image;
      updateData.imgName = req.file.originalname;
      updateData.imgType = req.file.mimetype;
      fs.unlinkSync(req.file.path);
    }

    await blog.update(updateData);

    const updatedBlog = await Blog.findByPk(req.params.id);
    const blogData = updatedBlog.get({ plain: true });
    if (blogData.img) {
      blogData.img = `data:${updatedBlog.imgType};base64,${blogData.img.toString('base64')}`;
    }

    res.status(200).json(blogData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a blog post
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await blog.destroy();

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};