import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { ColoredText } from "../ColoredText";
import { type BlogPost } from "../../data/blogPosts";

interface BlogModalProps {
  post: BlogPost;
  onClose: () => void;
}

export function BlogModal({ post, onClose }: BlogModalProps) {
  const labelColor = post.labelColor.replace('bg-', 'text-');
  const borderColor = post.labelColor === 'bg-brand-green' ? '#58cc02' : post.labelColor === 'bg-brand-yellow' ? '#ffc800' : post.labelColor === 'bg-brand-pink' ? '#ff4b4b' : post.labelColor === 'bg-brand-blue' ? '#1cb0f6' : '#ce82ff';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0" style={{ backgroundColor: 'var(--bg-color)', opacity: 0.95 }} />
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-[var(--card-bg)] w-full max-w-4xl rounded-3xl border-4 shadow-[0_12px_0_0_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]" style={{ borderColor }} onClick={(e) => e.stopPropagation()}>
        <div className={`h-4 ${post.labelColor} w-full`} />
        <div className="p-6 md:p-10 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl md:text-5xl font-black"><ColoredText colorClass={labelColor}>{post.title}</ColoredText></h2>
            <button onClick={onClose} className="p-2 bg-[var(--input-bg)] rounded-xl hover:bg-brand-pink hover:text-white transition-colors border-2 border-[var(--border-color)]"><X className="w-6 h-6" /></button>
          </div>
          {post.videoUrl && (
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden mb-8 border-4 border-brand-dark">
              <iframe width="100%" height="100%" src={post.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          )}
          <div className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{post.content}</div>
        </div>
      </motion.div>
    </div>
  );
}
