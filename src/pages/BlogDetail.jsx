import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogsData from "../data/blogs.json";
import { ArrowLeft } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogsData.featuredBlogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Blog not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-6 pb-16 max-w-md mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-white/10 p-2 rounded-full"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Header */}
      <h1 className="text-xl font-semibold text-center mb-4">
        Our <span className="text-emerald-400">Blogs</span>
      </h1>

      {/* Image */}
      <div className="rounded-2xl overflow-hidden mb-5">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-2">
        {blog.title}
      </h2>

      {/* Meta */}
      <div className="flex gap-3 text-xs text-gray-400 mb-4">
        <span className="bg-white/10 px-2 py-1 rounded">
          {blog.tag}
        </span>
        <span>{blog.date}</span>
      </div>

      {/* Intro */}
      <p className="text-sm text-gray-300 mb-6">
        {blog.excerpt}
      </p>

      {/* Content */}
      <div className="space-y-5">
        {blog.content.map((section, index) => (
          <div key={index}>
            <h3 className="text-emerald-400 font-medium text-sm mb-1">
              {index + 1}. {section.heading}
            </h3>
            <p className="text-sm text-gray-300">
              {section.text}
            </p>
          </div>
        ))}
      </div>

      {/* Similar News */}
      <h3 className="mt-10 text-lg font-semibold">
        Similar News
      </h3>
    </div>
  );
};

export default BlogDetail;
