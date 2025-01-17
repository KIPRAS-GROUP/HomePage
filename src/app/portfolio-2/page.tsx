import Head from "next/head";
import Navbar from "@/components/Layout/Navbar";
import PageTitle from "@/components/Common/PageTitle";
import ProjectCardStyle2 from "@/components/Portfolio/ProjectCardStyle2";
import ContactForm from "@/components/ContactUs/ContactForm";
import Footer from "@/components/Layout/Footer";

const projects = [
  {
    id: 1,
    title: "Medesham Yeşil Yaşam Evi",
    description: "Sıfır karbon emisyonlu, sürdürülebilir bir yaşam alanı; doğal aydınlatma ve yenilenebilir enerji sistemleriyle tasarlanmıştır.",
    imageUrl: "/images/medesham-house.jpg",
    link: "/projects/medesham-eco-house",
  },
  {
    id: 2,
    title: "Sydenham Yansıma Villası",
    description: "Modern ve minimalist yapının çevreyle uyumunu ifade eden sürdürülebilir bir villa.",
    imageUrl: "/images/sydenham-house.jpg",
    link: "/projects/sydenham-mirror-house",
  },
  {
    id: 3,
    title: "Covent Garden Cam Teras",
    description: "Tarihi Covent Garden Market Binası'nın doğu cephesine entegre edilmiş, modern bir cam yapı.",
    imageUrl: "/images/covent-garden.jpg",
    link: "/projects/covent-garden-glass-pavilion",
  },
  {
    id: 4,
    title: "Ufuk Bahçesi",
    description: "Doğanın kalbinde, minimalist mimariyle tasarlanmış, huzurlu bir yaşam alanı.",
    imageUrl: "/images/the-horizon-retreat.jpg",
    link: "/projects/the-horizon-retreat",
  },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>Kipras - Portföy Projeleri</title>
        <meta name="description" content="Kipras'ın modern ve sürdürülebilir projelerini keşfedin." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="full-bg-black-color">
        <Navbar />

        <PageTitle
          title="Portföy Projelerimiz"
          homeText="Anasayfa"
          homeUrl="/"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {projects.map((project) => (
            <ProjectCardStyle2
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              link={project.link}
            />
          ))}
        </div>

        <ContactForm />

        <Footer
          companyName="Kipras"
          companyDescription="Kipras, hayalinizdeki alanın veya ev projenizin bir parçası olmayı çok isteriz."
          address="Fatih Mah. Sanayi Cad. No:18/A Gaziemir/İzmir"
          email="info@kipras.com.tr"
          phone="XXXXXXXX"
          socialLinks={{
            linkedin: "https://www.linkedin.com/company/106088918/admin/dashboard/",
            instagram: "https://www.instagram.com/kiprasgroup?igsh=MTZnaThscXRjY3Y3bQ==",
          }}
          siteMapLinks={[
            { name: "Projeler", url: "/projects" },
            { name: "Haberler ve Makaleler", url: "/blog" },
            { name: "Teklif İste", url: "/contact" },
            { name: "Hizmetler", url: "/services" },
          ]}
          newsletterText="En son projelerimiz ve haberlerimiz için bültenimize abone olun."
          copyright="© 2025 Kipras. Tüm Hakları Saklıdır."
        />
      </div>
    </>
  );
}
