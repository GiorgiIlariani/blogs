import Header from "@/components/shared/Header";

export default function BlogDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#F3F2FA] min-h-screen">
      <Header />
      {children}
    </main>
  );
}
