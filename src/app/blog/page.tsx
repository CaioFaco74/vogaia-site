import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts, formatDate } from "@/lib/blog-data";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos, tutoriais e tendências sobre inteligência artificial aplicada a negócios. Conteúdo prático para decisores.",
};

export default function BlogPage() {
  const [destaque, ...demais] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-6">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Insights sobre{" "}
              <span className="bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent">
                IA para negócios
              </span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed">
              Artigos práticos sobre inteligência artificial, automação e
              tendências para quem toma decisões.
            </p>
          </div>
        </div>
      </section>

      {/* Post destaque */}
      <Section>
        <Link href={`/blog/${destaque.slug}/`} className="group block">
          <div className="bg-bg-card border border-border-subtle rounded-xl p-8 md:p-12 hover:border-orange-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary">
                {destaque.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Calendar size={12} />
                {formatDate(destaque.date)}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={12} />
                {destaque.readTime}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-orange-primary transition-colors">
              {destaque.title}
            </h2>
            <p className="text-text-muted leading-relaxed mb-6 max-w-3xl">
              {destaque.description}
            </p>
            <span className="inline-flex items-center gap-1 text-sm text-orange-primary font-medium group-hover:gap-2 transition-all">
              Ler artigo <ArrowRight size={14} />
            </span>
          </div>
        </Link>
      </Section>

      {/* Grid de posts */}
      {demais.length > 0 && (
        <Section className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demais.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group"
              >
                <Card className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-bg-secondary text-text-muted">
                      {post.category}
                    </span>
                    <span className="text-xs text-text-disabled">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-orange-primary transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-disabled">
                      {formatDate(post.date)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-orange-primary font-medium group-hover:gap-2 transition-all">
                      Ler <ArrowRight size={14} />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Newsletter CTA */}
      <Section className="bg-bg-secondary">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Receba insights de IA no seu email
          </h2>
          <p className="text-text-muted mb-8">
            Conteúdo prático sobre IA para negócios, sem spam. Máximo 2
            emails por mês.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com.br"
              className="flex-1 bg-bg-primary border border-border-subtle rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-orange-primary transition-colors"
            />
            <Button type="button" size="md">
              Inscrever
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
}
