import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Clock, Calendar, Share2, Tag, 
  CheckCircle2, BookOpen, ChevronRight, User, Sparkles,
  Linkedin, Twitter, MessageSquare
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export function BlogPostView() {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => {
    return BLOG_POSTS.find(p => p.slug === slug);
  }, [slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Simple Markdown Parser for clean rendered output
  const renderMarkdownContent = (rawContent: string) => {
    const lines = rawContent.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Code fence start/end
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
          codeBlockContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <div key={`code-${index}`} className="my-6 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 shadow-xl">
              {codeLanguage && (
                <div className="bg-gray-800/80 px-4 py-2 text-[11px] font-mono text-gray-400 border-b border-gray-700/50 flex justify-between items-center">
                  <span>{codeLanguage.toUpperCase()}</span>
                  <span className="text-[10px] text-gray-500">Source Code</span>
                </div>
              )}
              <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono text-gray-200 overflow-x-auto leading-relaxed">
                <code>{codeBlockContent.join('\n')}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Headings
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-10 mb-4 tracking-tight">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl sm:text-2xl font-bold text-gray-800 mt-6 mb-3 tracking-tight">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        // Blockquote
        elements.push(
          <blockquote key={index} className="my-6 pl-5 border-l-4 border-primary bg-primary/5 py-3 pr-4 rounded-r-xl italic text-gray-700 text-sm sm:text-base leading-relaxed">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        // Bullet
        const text = line.substring(2);
        elements.push(
          <li key={index} className="flex items-start gap-2.5 text-gray-700 text-sm sm:text-base mb-2 leading-relaxed ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            <span>{formatInlineMarkdown(text)}</span>
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        // Numbered list
        const text = line.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={index} className="flex items-start gap-2.5 text-gray-700 text-sm sm:text-base mb-2 leading-relaxed ml-2">
            <span className="font-bold text-primary text-xs mt-0.5 shrink-0">•</span>
            <span>{formatInlineMarkdown(text)}</span>
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={index} className="my-8 border-gray-200" />);
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={index} className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5 font-normal">
            {formatInlineMarkdown(line)}
          </p>
        );
      }
    });

    return elements;
  };

  // Helper to format bold `**text**` and code `` `inline code` ``
  const formatInlineMarkdown = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="px-1.5 py-0.5 bg-gray-100 text-primary font-mono text-xs rounded border border-gray-200">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>
        </div>

        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider border border-primary/20">
              {post.category}
            </span>
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {post.readTime}
            </span>
            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {post.publishedDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal mb-8">
            {post.summary}
          </p>

          {/* Author Bar */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div>
                <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
                <p className="text-xs text-gray-500">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Hero Cover Banner */}
        <div className={`w-full h-48 sm:h-64 rounded-3xl bg-gradient-to-r ${post.coverGradient} mb-12 p-8 flex flex-col justify-end text-white shadow-xl relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-white/80 uppercase tracking-widest block mb-1">ASAY InfoTech Architecture Series</span>
              <p className="text-lg sm:text-xl font-bold">{post.category} Comprehensive Guide</p>
            </div>
            <Sparkles className="w-8 h-8 text-white/70" />
          </div>
        </div>

        {/* Main Article Content */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-200/80 shadow-sm leading-relaxed">
          {renderMarkdownContent(post.content)}

          {/* Tags Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Topic Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-xl border border-gray-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Author Bio Box */}
        <div className="mt-10 p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-primary/10 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-base font-bold text-gray-900">{post.author.name}</h4>
              <span className="text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">Verified Author</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-3">{post.author.role} at ASAY InfoTech</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Passionate about building production-grade autonomous systems, distributed cloud backends, and enterprise web solutions that scale reliably to millions of users.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Recommended Articles
              </h3>
              <Link to="/blog" className="text-xs font-bold text-primary hover:underline">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(rel => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group hover:-translate-y-0.5"
                >
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-2">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>{rel.readTime}</span>
                    <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-secondary text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Ready to accelerate your next tech project?</h3>
            <p className="text-gray-300 text-xs sm:text-sm">Get a high-performance solution built by ASAY InfoTech experts.</p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold shadow-lg hover:bg-accent transition-all shrink-0"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
export default BlogPostView;
