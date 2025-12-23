import React, { useState } from "react";
import blogsData from "../data/blogs.json";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["Breaking News", "Political", "Entertainment", "Law"];
const tabs = ["Recent", "Popular", "Trending", "Market Reports"];

const Blogs = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Breaking News");
  const [activeTab, setActiveTab] = useState("Popular");
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredBlogs = blogsData.featuredBlogs.filter(
    (blog) => blog.category === activeCategory
  );

  const listBlogs = blogsData.listBlogs[activeTab] || [];

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === featuredBlogs.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? featuredBlogs.length - 1 : prev - 1
    );

  const handleReadMore = (blogId) => {
    navigate(`/blog-details/${blogId}`);
  };

  const handleBlogCardClick = (blogId) => {
    navigate(`/blog-details/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ================= HEADER ================= */}
      <div className="text-center px-4 sm:px-8 pt-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Our <span className="text-emerald-400">Blogs</span>
        </h1>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Explore insights, ideas, and innovations at the heart of AI.
        </p>

        {/* Categories */}
        <div className="flex justify-center gap-3 flex-wrap mt-6 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentSlide(0);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer
                ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-black "
                    : "bg-white text-black"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= FULL WIDTH FEATURED SLIDER ================= */}
      <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[560px] overflow-hidden overflow-x-hidden">
        {featuredBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out
              ${
                index === currentSlide
                  ? "translate-x-0"
                  : index > currentSlide
                  ? "translate-x-full"
                  : "-translate-x-full"
              }`}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center px-6 pb-10">
              <div className="text-center max-w-4xl">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
                  {blog.title}
                </h2>
                <button
                  onClick={() => handleReadMore(blog.id)}
                  className="bg-emerald-500 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-emerald-400 transition cursor-pointer"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        {featuredBlogs.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black p-3 rounded-full z-10 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black p-3 rounded-full z-10 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {featuredBlogs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full
                ${
                  currentSlide === idx
                    ? "bg-emerald-400"
                    : "bg-gray-500"
                }`}
            />
          ))}
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="px-4 sm:px-8 lg:px-14 py-10">
        {/* Tabs */}
        <div className="flex gap-6 text-sm mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 whitespace-nowrap cursor-pointer
                ${
                  activeTab === tab
                    ? "text-emerald-500 border-b-2 border-emerald-400"
                    : "text-gray-400"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listBlogs.slice(0, 5).map((blog) => (
            <div
              key={blog.id}
              onClick={() => handleBlogCardClick(blog.id)}
              className="bg-white/5 hover:bg-white/10 transition rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-400">{blog.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;