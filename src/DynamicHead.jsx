import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const DynamicHead = ({ noIndex = false }) => {
  const DEFAULT_META = {
    title: "Career The Explorer",
    description: "Platform untuk menemukan minat dan bakat terbaikmu!",
    keywords: "career, explorer, platform, minat, bakat, jurusan",
    icon: "/favicon.ico",
    favicon: "/favicon.png",
    author: "CTE Team",
    contact: {
      email: "helpdesk@careertheexplorer.com",
      phone: "+6287865790888",
      address: "Jl. Ketintang Madya II no. 42, Surabaya",
    },
    seo: {
      google_analytics: "",
      bing_webmaster: "",
    },
  };

  // Gunakan localStorage untuk cache data agar tidak flickering
  const [metaData, setMetaData] = useState(() => {
    return JSON.parse(localStorage.getItem("metaData")) || DEFAULT_META;
  });

  useEffect(() => {
    const API_URL = `${import.meta.env.VITE_BASE_URL}setting`;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          const newMeta = {
            title: data.data.title || DEFAULT_META.title,
            description: data.data.description || DEFAULT_META.description,
            keywords: data.data.keywords || DEFAULT_META.keywords,
            icon: data.data.icon || DEFAULT_META.icon,
            favicon: data.data.favicon || DEFAULT_META.favicon,
            author: data.data.author || DEFAULT_META.author,
            contact: {
              email: data.data.contact?.email || DEFAULT_META.contact.email,
              phone: data.data.contact?.phone || DEFAULT_META.contact.phone,
              address:
                data.data.contact?.address || DEFAULT_META.contact.address,
            },
            seo: {
              google_analytics: data.data.seo?.google_analytics || "",
              bing_webmaster: data.data.seo?.bing_webmaster || "",
            },
          };

          setMetaData(newMeta);
          localStorage.setItem("metaData", JSON.stringify(newMeta)); // Cache metadata
        }
      })
      .catch((error) => console.error("Error fetching meta:", error));
  }, []);

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{metaData.title}</title>
      <meta name="description" content={metaData.description} />

      {/* SEO Control: Noindex untuk halaman tertentu */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Favicon */}
      {metaData.icon && (
        <link rel="icon" type="image/svg+xml" href={metaData.icon} />
      )}
      <link rel="icon" type="image/png" href={metaData.favicon} />

      {/* Author Metadata */}
      <meta name="keywords" content={metaData.keywords} />
      <meta name="author" content={metaData.author} />

      {/* Contact Metadata */}
      <meta name="contact:email" content={metaData.contact.email} />
      <meta name="contact:phone" content={metaData.contact.phone} />
      <meta name="contact:address" content={metaData.contact.address} />

      {/* SEO Metadata */}
      <meta
        name="google-site-verification"
        content={metaData.seo.google_analytics}
      />
      <meta name="msvalidate.01" content={metaData.seo.bing_webmaster} />
    </Helmet>
  );
};

export default DynamicHead;
