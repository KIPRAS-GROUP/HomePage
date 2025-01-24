import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle"; 
import GalleryImage from "@/components/Gallery/GalleryImage";
import Footer from "@/components/Layout/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageTitle 
        title="Gallery"
        homeText="Home"
        homeUrl="/"
      />
 
      <GalleryImage />
 
      <Footer />
    </>
  )
}
