import React from "react";
import { BookOpen } from "lucide-react";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { useBlog } from "../hooks/useBlog";
import { BlogSearch } from "../components/Blog/BlogSearch";
import { BlogCard } from "../components/Blog/BlogCard";
import { BlogModal } from "../components/Blog/BlogModal";

export function BlogPage() {
  const { selectedPost, setSelectedPost, searchQuery, setSearchQuery, selectedTags, selectedIndex, setSelectedIndex, showDetails, togglePostDetails, getFunnyText, allTags, toggleTag, clearTags, filteredPosts, setCursorColor, t } = useBlog();

  return (
    <div className="min-h-screen py-32 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <SectionLabel text={t("UNIT 4: THE LOGS")} colorClass="bg-brand-orange" hoverGif="https://i.gifer.com/Pak.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-orange">{t("Language Logs").split(' ')[0]}</ColoredText> <ColoredText colorClass="text-brand-green">{t("Language Logs").split(' ').slice(1).join(' ')}</ColoredText>
          </h2>
          <p className="text-secondary max-w-xl mx-auto mb-10">
            <ColoredText colorClass="text-brand-purple">{t("Getting Started Material").split(' ')[0]}</ColoredText> {t("Getting Started Material").split(' ').slice(1).join(' ')}
          </p>
          <BlogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedTags={selectedTags} allTags={allTags} toggleTag={toggleTag} clearTags={clearTags} totalResults={filteredPosts.length} t={t} />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} isSelected={selectedIndex === i} isDetailsOpen={!!showDetails[post.id]} onSelect={setSelectedPost} onToggleDetails={togglePostDetails} onMouseEnter={(idx, color) => { setCursorColor(color); setSelectedIndex(idx); }} onMouseLeave={() => { setCursorColor("#1cb0f6"); setSelectedIndex(-1); }} searchQuery={searchQuery} selectedTags={selectedTags} getFunnyText={getFunnyText} t={t} />
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-tertiary mx-auto mb-4" />
            <p className="text-xl text-secondary mb-4">No posts found for "{searchQuery}"</p>
            <button onClick={() => setSearchQuery("")} className="text-brand-blue hover:underline">Clear search</button>
          </div>
        )}
      </div>
      {selectedPost && <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
}
