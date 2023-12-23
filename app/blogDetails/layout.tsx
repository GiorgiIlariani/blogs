import BlogDetailsLoading from "@/components/loadings/blogDetailsLoading";
import Header from "@/components/shared/Header";
import { Suspense } from "react";

export default function BlogDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#F3F2FA] min-h-screen">
      <Header />
      <Suspense fallback={<BlogDetailsLoading />}>{children}</Suspense>
    </main>
  );
}
