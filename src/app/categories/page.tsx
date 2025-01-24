import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import CategoriesContent from "@/components/Categories/CategoriesContent";
import Footer from "@/components/Layout/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageTitle 
        title="Categories"
        homeText="Home"
        homeUrl="/"
      />

      <CategoriesContent />
      
      <Footer />
    </>
  )
}
