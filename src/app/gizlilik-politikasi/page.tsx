import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import PrivacyPolicyContent from "@/components/PrivacyPolicy/PrivacyPolicyContent";
import Footer from "@/components/Layout/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageTitle title="Gizlilik Politikamız" homeText="Anasayfa" homeUrl="/" />

      <PrivacyPolicyContent />

      <Footer />
    </>
  );
}
