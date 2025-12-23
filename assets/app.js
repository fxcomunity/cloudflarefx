// 🔴 LINK APPS SCRIPT (SUDAH DIGANTI)
const API_URL =
  "https://script.google.com/macros/s/AKfycbzTW4X0HmFeihMfJYhomjlibMOSuQXh_I-64vJPQIuVwtEnlqLr1boRzk9MZrW4qbJblA/exec";

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

    // kelompokkan berdasarkan kategori
    const groups = {};
    data.forEach(d => {
      groups[d.category] = groups[d.category] || [];
      groups[d.category].push(d);
    });

    // render ke halaman
    for (const cat in groups) {
      const section = document.createElement("section");
      section.className = "category";
      section.innerHTML = `<h2>${cat}</h2><div class="grid"></div>`;

      const grid = section.querySelector(".grid");

      groups[cat].forEach(pdf => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${pdf.title}</h3>
          <iframe
            src="${pdf.preview}"
            loading="lazy">
          </iframe>
        `;

        grid.appendChild(card);
      });

      list.appendChild(section);
    }

  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>Gagal memuat data.</p>";
  }
}

loadPDF();
