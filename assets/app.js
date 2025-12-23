const API_URL =
  "PASTE_URL_EXEC_BARU_DI_SINI";

const list = document.getElementById("list");

async function loadPDF() {
  list.innerHTML = "Loading…";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    list.innerHTML = "";

    if (!data.length) {
      list.innerHTML = "<p>Tidak ada dokumen.</p>";
      return;
    }

    const section = document.createElement("section");
    section.className = "category";
    section.innerHTML = `<h2>Dokumen</h2><div class="grid"></div>`;
    const grid = section.querySelector(".grid");

    data.forEach(pdf => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${pdf.title}</h3>
        <iframe src="${pdf.preview}" loading="lazy"></iframe>
      `;
      grid.appendChild(card);
    });

    list.appendChild(section);

  } catch (e) {
    console.error(e);
    list.innerHTML = "<p>Gagal memuat data.</p>";
  }
}

loadPDF();
