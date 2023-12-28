import Content from "@/components/content";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import { fetchBlogs } from "@/lib/actions/fetchBlogs";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page ? +searchParams.page : 1;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full px-4">
        <Hero />
        <Content page={page} />
      </div>
    </div>
  );
}

export default Page;
