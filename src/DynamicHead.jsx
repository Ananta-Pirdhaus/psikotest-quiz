import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const DynamicHead = ({ noIndex = false }) => {
  const [metaData, setMetaData] = useState({
    title: "Dashboard Career The Explorer",
    description: "Loading...",
    icon: "",
    author: "",
    contact: {
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    const API_URL = `${import.meta.env.VITE_BASE_URL}setting`;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          setMetaData({
            title: data.data.title || "Default Title",
            description: data.data.description || "Default Description",
            keywords: data.data.keywords || "Default Keywords",
            icon: data.data.icon || "",
            author: data.data.author || "Unknown Author",
            contact: {
              email: data.data.contact?.email || "No Email",
              phone: data.data.contact?.phone || "No Phone",
              address: data.data.contact?.address || "No Address",
            },
          });
        }
      })
      .catch((error) => console.error("Error fetching meta:", error));
  }, []);

  return (
    <Helmet>
      {/* Title & Description */}
      <title>{metaData.title}</title>
      <meta name="description" content={metaData.description} />

      {/* SEO Control: Noindex for non-home pages */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Favicon */}
      {metaData.icon && (
        <link rel="icon" type="image/svg+xml" href={metaData.icon} />
      )}

      {/* Author Metadata */}
      <meta name="keywords" content={metaData.keywords} />
      <meta name="author" content={metaData.author} />

      {/* Contact Metadata */}
      <meta name="contact:email" content={metaData.contact.email} />
      <meta name="contact:phone" content={metaData.contact.phone} />
      <meta name="contact:address" content={metaData.contact.address} />
    </Helmet>
  );
};

export default DynamicHead;
