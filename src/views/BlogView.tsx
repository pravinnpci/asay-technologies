import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Search, ArrowRight, Clock, Calendar, 
  Tag, Sparkles, User, Filter, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';

export function BlogView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_POSTS.map(post => post.category)));
    return ['All', ...cats];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesQuery = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4 tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Insights & Industry Tech
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6"
          >
            ASAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-secondary">Tech Insights</span> & Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed font-normal"
          >
            Explore in-depth technical guides, enterprise AI research, cloud architecture strategies, and cutting-edge software engineering best practices.
          </motion.p>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-16"
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-200/80 bg-gradient-to-br from-white via-white to-gray-50 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-500 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-primary text-white uppercase tracking-wider">
                      Featured Guide
                    </span>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {featuredPost.readTime}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {featuredPost.publishedDate}
                    </span>
                  </div>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 group-hover:text-primary transition-colors tracking-tight mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {featuredPost.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{featuredPost.author.name}</p>
                        <p className="text-xs text-gray-500">{featuredPost.author.role}</p>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-primary/30 hover:bg-accent transition-all group/btn"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className={`w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr ${featuredPost.coverGradient} p-8 flex flex-col justify-between text-white shadow-lg overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500`}>
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold uppercase tracking-wider">
                        {featuredPost.category}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-2">
                      <div className="flex gap-2 flex-wrap">
                        {featuredPost.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[11px] font-medium bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-white/80 font-medium">Enterprise AI & Automation Series</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">No matching articles found</h3>
            <p className="text-gray-500 text-sm mb-4">Try searching for a different keyword or select another category.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-accent transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Visual Header */}
                <div className={`h-48 bg-gradient-to-br ${post.coverGradient} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-[11px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-medium bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] bg-black/30 backdrop-blur-md px-2 py-0.5 rounded text-white/90">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{post.publishedDate}</span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight mb-2.5 line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-primary/20"
                      />
                      <span className="text-xs font-semibold text-gray-700">{post.author.name}</span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline"
                    >
                      Read
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter & Contact Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-secondary text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Need custom enterprise architecture or AI integration?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Our engineering team builds scalable custom AI agents, robust microservices, and modern web platforms tailored to your business goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-accent transition-all"
              >
                Schedule Architecture Consultation
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-all border border-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogView;
