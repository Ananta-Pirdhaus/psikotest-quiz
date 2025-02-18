import React from "react";

const PanduanCard = ({ panduan }) => {
  const formatDescription = (description) => {
    // Ubah <ul> menjadi <ol> untuk menampilkan daftar bernomor
    let formattedDescription = description
      .replace(/<ul>/g, "<ol>")
      .replace(/<\/ul>/g, "</ol>");

    // Ubah <li> menjadi <li> dengan style tambahan jika perlu
    formattedDescription = formattedDescription.replace(
      /<li>/g,
      '<li class="list-decimal pl-5">'
    );

    return formattedDescription;
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-10 text-start">
      <h2 className="text-xl font-bold mb-2 text-center">Panduan</h2>
      <div
        className="panduan-description"
        dangerouslySetInnerHTML={{
          __html: formatDescription(panduan.description),
        }}
      />
    </div>
  );
};

export default PanduanCard;
