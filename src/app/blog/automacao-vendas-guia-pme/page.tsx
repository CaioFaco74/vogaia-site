import type { Metadata } from "next";
import { BlogPostPage } from "@/components/blog-post-page";
import { getPostBySlug } from "@/lib/blog-data";

const post = getPostBySlug("automacao-vendas-guia-pme")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
};

export default function Page() {
  return <BlogPostPage post={post} />;
}
