import type { Metadata } from "next";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { getReport } from "@/features/report/api/get-report";
import { EmptyReport } from "@/features/report/components/empty-report";
import { ReportSections } from "@/features/report/components/report-sections";
import { SiteFooter } from "@/shared/ui/site-footer";
import { SiteHeader } from "@/shared/ui/site-header";

export const metadata: Metadata = { title: "Your report" };

export default async function ReportPage() {
  const report = await getReport();

  return (
    <div className="flex flex-1 flex-col bg-white">
      <SiteHeader actions={<SignOutButton />} />
      <main className="flex-1">
        {report ? <ReportSections sections={report.sections} /> : <EmptyReport />}
      </main>
      <SiteFooter />
    </div>
  );
}
