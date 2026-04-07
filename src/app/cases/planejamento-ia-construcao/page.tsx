import type { Metadata } from "next";
import { CasePage } from "@/components/case-page";
import { getCaseBySlug } from "@/lib/cases-data";

const caseData = getCaseBySlug("planejamento-ia-construcao")!;

export const metadata: Metadata = {
  title: `Case: ${caseData.empresa}`,
  description: caseData.resumo,
};

export default function Page() {
  return <CasePage caseData={caseData} />;
}
