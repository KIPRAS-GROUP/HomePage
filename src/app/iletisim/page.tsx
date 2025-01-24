import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import ContactFormStyleTwo from "@/components/ContactUs/ContactFormStyleTwo";
import GoogleMap from "@/components/ContactUs/GoogleMap";
import Footer from "@/components/Layout/Footer";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageTitle title="İletişim kurun" homeText="Anasayfa" homeUrl="/" />

      <div className="ptb-100">
        <ContactFormStyleTwo />
      </div>

      <div className="pb-100">
        <GoogleMap />
      </div>

      <Footer />
    </>
  );
}
