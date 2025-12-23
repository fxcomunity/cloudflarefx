// ===============================
// KONFIGURASI
// ===============================
const API_URL =
  "https://script.google.com/macros/s/AKfycbwP-15QxrHtZNcyvvmK1HNT1JHbSMienCgm1Hnir5TGdIitxXcFpTF0P7c2TF1xYHAm/exec";

// elemen HTML
const list = document.getElementById("list");
const count = document.getElementById("count");

// ===============================
// LOAD & RENDER
// ===============================
async function loadPDF() {
  list.innerHTML = "Loading…";
  count.textContent = "0";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    list.innerHTML = "";

    if (!data.length) {
      list.innerHTML = "<p>Tidak ada dokumen.</p>";
      return;
    }

    count.textContent = data.length;

    // grouping by category
    const groups = {};
    data.forEach(d => {
      groups[d.category] = groups[d.category] || [];
      groups[d.category].push(d);
    });

    // render
    Object.keys(groups).forEach(category => {
      const section = document.createElement("section");
      section.className = "category";

      section.innerHTML = `<h2>${category}</h2>`;
      const grid = document.createElement("div");
      grid.className = "list";

      groups[category].forEach(pdf => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${pdf.title}</h3>
          <a href="${pdf.preview}" target="_blank">Preview</a>
          <a href="${pdf.download}" target="_blank">Download</a>
        `;

        grid.appendChild(card);
      });

      section.appendChild(grid);
      list.appendChild(section);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>Gagal memuat data.</p>";
  }
}

// ===============================
// REAL-TIME REFRESH
// ===============================
loadPDF();
setInterval(loadPDF, 60000); // refresh tiap 60 detik
