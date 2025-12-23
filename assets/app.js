const API_URL = "https://script.google.com/macros/s/AKfycbxchH9yjcchFv7JDjU01apyjDbMKAwSU3wgln7IL18-4Iyo3W8ARArE5tSZgPTQrflsBg/exec";

const list = document.getElementById("list");

fetch(API_URL)
  .then(r => r.json())
  .then(data => {
    list.innerHTML = "";

    if (!data.length) {
      list.innerHTML = "<p>Tidak ada PDF.</p>";
      return;
    }

    data.forEach(pdf => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${pdf.title}</h3>
        <iframe
          src="${pdf.preview}"
          style="width:100%;height:400px;border:0;border-radius:12px">
        </iframe>
        <hr>
      `;
      list.appendChild(div);
    });
  })
  .catch(err => {
    console.error(err);
    list.innerHTML = "<p>Gagal memuat data.</p>";
  });
