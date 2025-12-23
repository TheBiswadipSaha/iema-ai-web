import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogsData from "../data/blogs.json";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find blog from both featured and list blogs
  const allBlogs = [
    ...blogsData.featuredBlogs,
    ...Object.values(blogsData.listBlogs).flat()
  ];
  
  const blog = allBlogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Blog not found</p>
          <button 
            onClick={() => navigate('/blog')}
            className="bg-emerald-500 text-black px-6 py-2 rounded-full hover:bg-emerald-400 transition"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  // Get similar blogs (same category or random)
  const similarBlogs = allBlogs
    .filter(b => b.id !== blog.id && b.category === blog.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-4 sm:px-8 lg:px-16 xl:px-24 pt-6 pb-16 mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="mb-6 bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition inline-flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline text-sm">Back to Blogs</span>
        </button>

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8 lg:mb-12">
          Our <span className="text-emerald-400">Blogs</span>
        </h1>

        {/* Main Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Article Column */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden mb-6 lg:mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6">
              {blog.title}
            </h2>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm mb-6 lg:mb-8">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2">
                <Tag size={14} />
                {blog.tag || blog.category || 'Technology'}
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Calendar size={14} />
                {blog.date}
              </span>
            </div>

            {/* Excerpt/Intro */}
            {blog.excerpt && (
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8 lg:mb-10 p-4 sm:p-6 bg-white/5 rounded-xl border-l-4 border-emerald-500">
                {blog.excerpt}
              </p>
            )}

            {/* Content Sections */}
            {blog.content && blog.content.length > 0 && (
              <div className="space-y-6 lg:space-y-8">
                {blog.content.map((section, index) => (
                  <div key={index} className="pb-6 border-b border-white/10 last:border-b-0">
                    <h3 className="text-emerald-400 font-semibold text-base sm:text-lg lg:text-xl mb-3 lg:mb-4">
                      {index + 1}. {section.heading}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Similar News */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6">
                Similar News
              </h3>
              
              {similarBlogs.length > 0 ? (
                <div className="space-y-4">
                  {similarBlogs.map((similarBlog) => (
                    <div
                      key={similarBlog.id}
                      onClick={() => {
                        navigate(`/blog-details/${similarBlog.id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="bg-white/5 hover:bg-white/10 transition rounded-xl overflow-hidden cursor-pointer group"
                    >
                      <img
                        src={similarBlog.image}
                        alt={similarBlog.title}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4 className="text-sm sm:text-base font-medium mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                          {similarBlog.title}
                        </h4>
                        <p className="text-xs text-gray-400 flex items-center gap-2">
                          <Calendar size={12} />
                          {similarBlog.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No similar articles found.</p>
              )}

              {/* Share Section (Optional) */}
              <div className="mt-8 p-4 sm:p-6 bg-white/5 rounded-xl">
                <h4 className="text-lg font-semibold mb-3">Share this article</h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  Found this article interesting? Share it with your network!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Similar News (shown below content on mobile) */}
        <div className="lg:hidden mt-12">
          <h3 className="text-xl font-semibold mb-6">
            Similar News
          </h3>
          {similarBlogs.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {similarBlogs.map((similarBlog) => (
                <div
                  key={similarBlog.id}
                  onClick={() => {
                    navigate(`/blog-details/${similarBlog.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white/5 hover:bg-white/10 transition rounded-xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={similarBlog.image}
                    alt={similarBlog.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-xs font-medium mb-1 line-clamp-2">
                      {similarBlog.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {similarBlog.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;