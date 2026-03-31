import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { getServiceBySlug } from "@/lib/services-data";

const service = getServiceBySlug("agentes-ia")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
};

export default function AgentesIAPage() {
  return <ServicePage service={service} />;
}
