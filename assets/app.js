
const list=document.getElementById("list");
const count=document.getElementById("count");
fetch("data/pdfs.json").then(r=>r.json()).then(d=>{
  d.items.forEach(i=>{
    const a=document.createElement("a");
    a.href=i.url;a.textContent=i.title;a.target="_blank";
    list.appendChild(a);list.appendChild(document.createElement("br"));
  });
  count.textContent=d.items.length;
});
