import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#FFA020] to-[#FF5510] bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Página não encontrada
        </h1>
        <p className="text-text-muted mb-8">
          A página que você procura não existe ou foi movida. Confira os links
          abaixo para encontrar o que precisa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" size="lg">
            Voltar para o início <ArrowRight size={18} />
          </Button>
          <Button href="/contato/" variant="secondary" size="lg">
            Falar conosco
          </Button>
        </div>
      </div>
    </section>
  );
}
