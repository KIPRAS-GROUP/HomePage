import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import BlogGridPost from "@/components/Blog/BlogGridPost";
import Footer from "@/components/Layout/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageTitle 
        title="Blog"
        homeText="Home"
        homeUrl="/"
      />

      <BlogGridPost />
 
      <Footer />
    </>
  )
}
