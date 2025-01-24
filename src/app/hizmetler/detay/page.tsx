import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import ContactForm from "@/components/ContactUs/ContactFormStyleTwo";
import ServiceDetailsContent from "@/components/ServiceDetails/ServiceDetailsContent";
import Footer from "@/components/Layout/Footer";
import Process from "@/components/ServiceDetails/Process";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageTitle 
        title="Service Details"
        homeText="Home"
        homeUrl="/"
      />

      <ServiceDetailsContent />

      <Process />
   
      <div className="ptb-100">
        <ContactForm />
      </div>
      
      <Footer />
    </>
  )
}
