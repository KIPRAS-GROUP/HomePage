import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import RequestAQuoteForm from "@/components/RequestAQuote/RequestAQuoteForm";
import Footer from "@/components/Layout/Footer";

// PageTitle bileşenine CTA butonu eklenmiştir.
export default function Page() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <PageTitle
        title="Kariyerinizi bizimle yapın"
        homeText="Anasayfa"
        homeUrl="/"
      />

      {/* Teklif Formu */}
      <RequestAQuoteForm />
      <Footer />
    </>
  );
}
