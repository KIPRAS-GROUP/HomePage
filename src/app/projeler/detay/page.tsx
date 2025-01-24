import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import PortfolioDetailsContent from "@/components/PortfolioDetails/PortfolioDetailsContent";
import ContactForm from "@/components/ContactUs/ContactFormStyleTwo";
import Footer from "@/components/Layout/Footer";
import ProjectGallery from "@/components/PortfolioDetails/ProjectGallery";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageTitle 
        title="Portfolio Details"
        homeText="Home"
        homeUrl="/"
      />

      <PortfolioDetailsContent />

      <ProjectGallery />
    
      <div className="ptb-100">
        <ContactForm />
      </div>
  
      <Footer />
    </>
  )
}
