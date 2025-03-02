async function loadMetaData() {
  try {
    const response = await fetch("/meta.json");
    if (!response.ok) throw new Error("Gagal memuat metadata");

    const meta = await response.json();

    if (meta.title) document.title = meta.title;
    if (meta.description) updateMetaTag("description", meta.description);
    if (meta.keywords) updateMetaTag("keywords", meta.keywords);
    if (meta.author) updateMetaTag("author", meta.author);
  } catch (error) {
    console.error("Error loading metadata:", error);
  }
}

function updateMetaTag(name, content) {
  let metaTag = document.querySelector(`meta[name="${name}"]`);
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", name);
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute("content", content);
}

loadMetaData();
