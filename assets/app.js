const API_URL =
  "https://script.google.com/macros/s/AKfycbwP-15QxrHtZNcyvvmK1HNT1JHbSMienCgm1Hnir5TGdIitxXcFpTF0P7c2TF1xYHAm/exec";

const list = document.getElementById("list");

async function loadPDF() {
  list.innerHTML = "Loading…";

  const res = await fetch(API_URL);
  const data = await res.json();

  list.innerHTML = "";

  const groups = {};
  data.forEach(d => {
    groups[d.category] = groups[d.category] || [];
    groups[d.category].push(d);
  });

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
}

loadPDF();
