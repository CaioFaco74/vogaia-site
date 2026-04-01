import type { Metadata } from "next";
import { BlogPostPage } from "@/components/blog-post-page";
import { getPostBySlug } from "@/lib/blog-data";

const post = getPostBySlug("o-que-sao-agentes-ia")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
};

export default function Page() {
  return <BlogPostPage post={post} />;
}
