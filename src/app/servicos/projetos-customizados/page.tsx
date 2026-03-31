import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { getServiceBySlug } from "@/lib/services-data";

const service = getServiceBySlug("projetos-customizados")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
};

export default function ProjetosCustomizadosPage() {
  return <ServicePage service={service} />;
}
