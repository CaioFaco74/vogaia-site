import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog-data";
import { formatDate } from "@/lib/blog-data";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  function flushTable() {
    if (tableRows.length < 2) return;
    const headers = tableRows[0];
    const rows = tableRows.slice(2); // skip separator row
    elements.push(
      <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle">
              {headers.map((h, i) => (
                <th key={i} className="text-left py-2 px-3 font-medium text-text-secondary">
                  {h.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-border-subtle/50">
                {row.map((cell, ci) => (
                  <td key={ci} className="py-2 px-3 text-text-muted">
                    {cell.trim().startsWith("**") && cell.trim().endsWith("**")
                      ? <strong className="text-text-primary">{cell.trim().slice(2, -2)}</strong>
                      : cell.trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.trim().startsWith("|")) {
      inTable = true;
      const cells = line.split("|").filter((c) => c.trim() !== "");
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
      inTable = false;
    }

    // Headers
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    }
    // List items
    else if (line.startsWith("- ")) {
      const text = line.slice(2);
      elements.push(
        <li key={i} className="text-text-muted leading-relaxed ml-6 list-disc">
          <span dangerouslySetInnerHTML={{ __html: inlineBold(text) }} />
        </li>
      );
    }
    // Horizontal rule
    else if (line.trim() === "---") {
      elements.push(
        <hr key={i} className="border-border-subtle my-8" />
      );
    }
    // Italic/CTA lines
    else if (line.startsWith("*") && line.endsWith("*")) {
      const text = line.slice(1, -1);
      elements.push(
        <p key={i} className="text-text-muted italic mt-6">
          <span dangerouslySetInnerHTML={{ __html: inlineLinks(text) }} />
        </p>
      );
    }
    // Regular paragraph
    else if (line.trim() !== "") {
      elements.push(
        <p key={i} className="text-text-muted leading-relaxed mb-4">
          <span dangerouslySetInnerHTML={{ __html: inlineBold(inlineLinks(line)) }} />
        </p>
      );
    }
  }

  if (inTable) flushTable();

  return elements;
}

function inlineBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>');
}

function inlineLinks(text: string): string {
  return text.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" class="text-orange-primary hover:text-orange-hover underline">$1</a>'
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-8 bg-bg-primary">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-orange-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Voltar ao blog
          </Link>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.author.name}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime} de leitura
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <article className="mt-8">{renderMarkdown(post.content)}</article>
        </div>
      </section>

      {/* CTA */}
      <Section className="bg-bg-secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Quer implementar o que leu?
          </h2>
          <p className="text-text-muted mb-8">
            Fale com nosso time e descubra como aplicar IA no seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contato/" size="lg">
              Falar com especialista <ArrowRight size={18} />
            </Button>
            <Button href="/blog/" variant="secondary" size="lg">
              Ver mais artigos
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
