import Blog from "../module/Blog.js";

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishDate: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (!blogData.slug) {
      blogData.slug = generateSlug(blogData.title);
    }
    
    // Check if slug exists
    const existing = await Blog.findOne({ slug: blogData.slug });
    if (existing) {
      blogData.slug = `${blogData.slug}-${Date.now()}`;
    }

    const newBlog = new Blog(blogData);
    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogData = { ...req.body };
    if (blogData.title && !blogData.slug) {
      blogData.slug = generateSlug(blogData.title);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
