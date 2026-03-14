// ============================================================
//  script.js — Semua tampilan & logika dibuat via JavaScript
// ============================================================

// ---------- 1. INJECT GOOGLE FONTS & CSS ----------
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;800&family=DM+Mono:wght@300;400;500&display=swap');

  :root {
    --bg: #0d0d0d;
    --surface: #161616;
    --border: #2a2a2a;
    --accent: #c8f135;
    --accent-dim: rgba(200,241,53,0.12);
    --text: #f0f0f0;
    --muted: #666;
  }

  * { margin:0; padding:0; box-sizing:border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(200,241,53,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,241,53,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    animation: gridShift 20s linear infinite;
  }

  @keyframes gridShift {
    0%   { background-position: 0 0; }
    100% { background-position: 40px 40px; }
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 48px 44px;
    width: 100%;
    max-width: 440px;
    position: relative;
    animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  .card::before {
    content: '';
    position: absolute;
    top:-1px; left:-1px;
    width:60px; height:60px;
    border-top: 2px solid var(--accent);
    border-left: 2px solid var(--accent);
    border-radius: 2px 0 0 0;
  }

  .card::after {
    content: '';
    position: absolute;
    bottom:-1px; right:-1px;
    width:60px; height:60px;
    border-bottom: 2px solid var(--accent);
    border-right: 2px solid var(--accent);
    border-radius: 0 0 2px 0;
  }

  .badge {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    background: var(--accent-dim);
    border: 1px solid rgba(200,241,53,0.3);
    padding: 4px 10px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }

  h1 span { color: var(--accent); }

  .subtitle {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.05em;
    margin-bottom: 36px;
  }

  .field { margin-bottom: 22px; }

  label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    padding: 12px 16px;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input::placeholder { color: #3a3a3a; }

  input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(200,241,53,0.08);
  }

  .btn {
    margin-top: 12px;
    width: 100%;
    background: var(--accent);
    color: #0d0d0d;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 14px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .btn:hover {
    background: #d6ff3a;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(200,241,53,0.25);
  }

  .btn:active { transform: translateY(0); }

  #result {
    display: none;
    margin-top: 28px;
    padding: 16px;
    background: var(--accent-dim);
    border: 1px solid rgba(200,241,53,0.25);
    border-radius: 2px;
    animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1);
  }

  .result-label {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }

  .result-row {
    display: flex;
    gap: 8px;
    font-size: 13px;
    margin-bottom: 4px;
  }

  .result-key { color: var(--muted); min-width: 50px; }
  .result-val { color: var(--text); font-weight: 500; }

  .tanggal-box {
    margin-top: 28px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-radius: 2px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dot {
    width:6px; height:6px;
    background: var(--accent);
    border-radius: 50%;
    flex-shrink: 0;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,100% { opacity:1; }
    50%      { opacity:0.3; }
  }

  #tanggal { font-size: 11px; color: var(--muted); letter-spacing: 0.04em; }
`;
document.head.appendChild(style);


// ---------- 2. BUILD HTML STRUCTURE VIA JS ----------
const app = document.getElementById("app");

app.innerHTML = `
  <div class="card">
    <div class="badge">P4.PDW — JavaScript</div>
    <h1>Data <span>Mahasiswa</span></h1>
    <p class="subtitle">Masukkan informasi data diri Anda</p>

    <div class="field">
      <label>Nama Lengkap</label>
      <input type="text" id="nama" placeholder="Contoh: Budi Santoso" />
    </div>

    <div class="field">
      <label>NIM</label>
      <input type="text" id="nim" placeholder="Contoh: 20210140001" />
    </div>

    <button class="btn" id="btnSubmit">Submit →</button>

    <div id="result">
      <div class="result-label">// Data Tersimpan</div>
      <div class="result-row">
        <span class="result-key">Nama</span>
        <span class="result-val" id="out-nama">—</span>
      </div>
      <div class="result-row">
        <span class="result-key">NIM</span>
        <span class="result-val" id="out-nim">—</span>
      </div>
    </div>

    <div class="tanggal-box">
      <div class="dot"></div>
      <span id="tanggal"></span>
    </div>
  </div>
`;


// ---------- 3. TANGGAL & WAKTU REAL-TIME ----------
function tampilkanTanggal() {
  let tanggal = new Date();
  document.getElementById("tanggal").innerHTML = tanggal.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
tampilkanTanggal();
setInterval(tampilkanTanggal, 1000);


// ---------- 4. FUNGSI SUBMIT ----------
document.getElementById("btnSubmit").addEventListener("click", function () {
  let nama = document.getElementById("nama").value.trim();
  let nim  = document.getElementById("nim").value.trim();

  if (!nama || !nim) {
    alert("⚠️  Nama dan NIM wajib diisi!");
    return;
  }

  alert("✅  Data berhasil disimpan!\n\nNama : " + nama + "\nNIM  : " + nim);

  document.getElementById("out-nama").textContent = nama;
  document.getElementById("out-nim").textContent  = nim;
  document.getElementById("result").style.display = "block";
});
