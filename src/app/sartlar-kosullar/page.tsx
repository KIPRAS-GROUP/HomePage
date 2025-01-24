import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import TermsConditionsContent from "@/components/TermsConditions/TermsConditionsContent";
import Footer from "@/components/Layout/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageTitle 
        title="Terms & Conditions"
        homeText="Home"
        homeUrl="/"
      />

      <TermsConditionsContent />
 
      <Footer />
    </>
  )
}
