import { articlePosts } from "./blog/articles";
import { mediaPosts } from "./blog/media";
import { BlogPost } from "./blog/types";

export type { BlogPost };

export const blogPosts: BlogPost[] = [
  ...articlePosts,
  ...mediaPosts,
];
