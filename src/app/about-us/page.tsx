import NavbarStyleTwo from "@/components/Layout/NavbarStyleTwo";
import PageTitle from "@/components/Common/PageTitle";
import AboutUsContent from "@/components/AboutUs/AboutUsContent";
import QuoteText from "@/components/AboutUs/QuoteText";
import TextSlide from "@/components/Common/TextSlide";
import TeamMemberStyle2 from "@/components/Common/TeamMemberStyle2";
import Partner from "@/components/Common/Partner";
import ContactFormStyleTwo from "@/components/ContactUs/ContactFormStyleTwo";
import Footer from "@/components/Layout/Footer";

export default function Page() {
  return (
    <>
      <NavbarStyleTwo />

      <PageTitle 
        title="Hakkımızda"
        homeText="Home"
        homeUrl="/"
      />

      <AboutUsContent />

      <QuoteText />

      <TextSlide />

      <TeamMemberStyle2 />

      <div className="pt-100">
        <Partner />
      </div>

      <div className="pb-100">
        <ContactFormStyleTwo />
      </div>
      
      <Footer />
    </>
  )
}
