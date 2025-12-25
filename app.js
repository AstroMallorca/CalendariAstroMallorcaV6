let efemerides = {};

fetch("/data/efemerides_2026.json")
  .then(r => r.json())
  .then(data => {
    efemerides = data.dies;
    dibuixaGraella();
  });

function dibuixaGraella() {
  const graella = document.getElementById("graellaDies");
  graella.innerHTML = "";

  Object.keys(efemerides).forEach(data => {
    const dia = document.createElement("div");
    dia.className = "dia";

    const info = efemerides[data];
    if (info.lluna_foscor) {
      dia.style.background = info.lluna_foscor.color;
      dia.style.color =
        info.lluna_foscor.color === "#000000" ? "#fff" : "#000";
    }

    dia.innerText = data.split("-")[2];
    dia.onclick = () => obreDia(data);
    graella.appendChild(dia);
  });
}

function obreDia(data) {
  const modal = document.getElementById("modalDia");
  const contingut = document.getElementById("contingutDia");
  const info = efemerides[data];

  contingut.innerHTML = `
    <h2>${data}</h2>
    <p>Fase lunar: ${info.lluna?.fase}</p>
    <p>Il·luminació: ${info.lluna?.il_luminacio_percent}%</p>
    ${
      info.lluna_foscor?.apte_astrofotografia
        ? "<p>🌑 Dia favorable per astrofotografia</p>"
        : ""
    }
  `;

  modal.classList.remove("ocult");
}

document.querySelector(".tancar").onclick = () =>
  document.getElementById("modalDia").classList.add("ocult");

document.getElementById("toggleNocturn").onclick = () =>
  document.body.classList.toggle("nocturn");
