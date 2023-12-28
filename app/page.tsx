import Content from "@/components/content";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";

const Page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full px-4">
        <Hero />
        <Content />
      </div>
    </div>
  );
};

export default Page;
