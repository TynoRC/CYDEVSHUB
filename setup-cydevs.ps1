# CYDEVS HUB - Frontend structure and starter code

$frontend = "frontend\src"

New-Item -ItemType Directory -Force -Path "$frontend\components\Navbar"
New-Item -ItemType Directory -Force -Path "$frontend\components\Footer"
New-Item -ItemType Directory -Force -Path "$frontend\components\Hero"
New-Item -ItemType Directory -Force -Path "$frontend\components\PackageCards"
New-Item -ItemType Directory -Force -Path "$frontend\components\Portfolio"
New-Item -ItemType Directory -Force -Path "$frontend\components\Feedback"
New-Item -ItemType Directory -Force -Path "$frontend\components\Forum"
New-Item -ItemType Directory -Force -Path "$frontend\components\AIChat"
New-Item -ItemType Directory -Force -Path "$frontend\pages"
New-Item -ItemType Directory -Force -Path "$frontend\services"
New-Item -ItemType Directory -Force -Path "$frontend\context"

@'
import React, { useState } from "react";
import "./App.css";

const orange = "#ff7a00";

function Navbar({ user, setPage, logout }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setPage("home")}>
        CYDEVS<span>HUB</span>
      </div>

      <div className="links">
        <button onClick={() => setPage("home")}>Acasă</button>
        <button onClick={() => setPage("about")}>Despre noi</button>
        <button onClick={() => setPage("portfolio")}>Portofoliu</button>
        <button onClick={() => setPage("packages")}>Pachete</button>
        <button onClick={() => setPage("orders")}>Comenzi</button>
        <button onClick={() => setPage("forum")}>Forum</button>
        <button onClick={() => setPage("feedback")}>Feedback</button>
        <button onClick={() => setPage("ai")}>AI Agent</button>
      </div>

      <div className="auth">
        {user ? (
          <>
            <span>{user.name}</span>
            <button className="outline" onClick={logout}>Log out</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("login")}>Login</button>
            <button className="primary" onClick={() => setPage("signup")}>Sign up</button>
          </>
        )}
      </div>
    </nav>
  );
}

function Home({ setPage }) {
  return (
    <section className="hero">
      <div className="badge">Digital Business Studio</div>
      <h1>Transformăm ideile în platforme digitale premium.</h1>
      <p>
        CYDEVS HUB creează site-uri, aplicații web, dashboard-uri, automatizări,
        branding digital și soluții software pentru afaceri moderne.
      </p>
      <div className="heroActions">
        <button className="primary big" onClick={() => setPage("orders")}>Comandă proiect</button>
        <button className="outline big" onClick={() => setPage("portfolio")}>Vezi portofoliul</button>
      </div>

      <div className="stats">
        <div><b>24/7</b><span>suport digital</span></div>
        <div><b>AI</b><span>estimare preț</span></div>
        <div><b>100%</b><span>custom design</span></div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page">
      <h1>Cine suntem noi?</h1>
      <p>
        CYDEVS HUB este o agenție digitală construită pentru antreprenori,
        creatori și companii care vor să treacă de la o simplă idee la un
        produs online real, funcțional și scalabil.
      </p>

      <div className="grid">
        <div className="card"><h3>Design modern</h3><p>Interfețe curate, dark-tech, premium și optimizate pentru conversie.</p></div>
        <div className="card"><h3>Dezvoltare full-stack</h3><p>Frontend, backend, baze de date, autentificare și dashboard-uri.</p></div>
        <div className="card"><h3>Automatizare</h3><p>Email-uri automate, comenzi, statusuri și procese digitale.</p></div>
      </div>
    </section>
  );
}

function Portfolio() {
  const projects = [
    "Website prezentare business",
    "Magazin online premium",
    "Dashboard administrativ",
    "Platformă de comenzi",
    "Landing page pentru startup",
    "Aplicație cu AI assistant"
  ];

  return (
    <section className="page">
      <h1>Portofoliu</h1>
      <div className="grid">
        {projects.map((p, i) => (
          <div className="card project" key={i}>
            <div className="projectImage">CYD</div>
            <h3>{p}</h3>
            <p>Design negru-portocaliu, responsive, rapid și adaptat brandului.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Packages() {
  const packs = [
    { name: "Starter", price: "150€+", desc: "Landing page / site simplu de prezentare." },
    { name: "Business", price: "350€+", desc: "Site complet cu pagini, formular, SEO și design premium." },
    { name: "Pro Platform", price: "700€+", desc: "Platformă cu login, dashboard, comenzi și backend." },
  ];

  return (
    <section className="page">
      <h1>Pachete</h1>
      <div className="grid">
        {packs.map((p) => (
          <div className="card package" key={p.name}>
            <h2>{p.name}</h2>
            <h3>{p.price}</h3>
            <p>{p.desc}</p>
            <button className="primary">Alege pachetul</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Orders({ user }) {
  const [sent, setSent] = useState(false);

  if (!user) {
    return (
      <section className="page center">
        <h1>Ai nevoie de cont pentru a plasa o comandă.</h1>
        <p>Autentifică-te sau creează un cont pentru a continua.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Plasează o comandă</h1>
      <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <input placeholder="Numele proiectului" required />
        <select required>
          <option>Website de prezentare</option>
          <option>Magazin online</option>
          <option>Platformă custom</option>
          <option>Dashboard</option>
          <option>Aplicație AI</option>
        </select>
        <textarea placeholder="Descrie ideea ta..." required />
        <button className="primary">Trimite comanda</button>
      </form>

      {sent && (
        <div className="success">
          Comanda a fost plasată. Vei primi email de confirmare.
        </div>
      )}
    </section>
  );
}

function Forum() {
  const [posts, setPosts] = useState(["Cât costă un website premium?", "Ce pachet recomand pentru o afacere mică?"]);
  const [text, setText] = useState("");

  return (
    <section className="page">
      <h1>Forum & Anunțuri</h1>
      <div className="form">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Scrie un anunț sau o întrebare..." />
        <button className="primary" onClick={() => { if(text) setPosts([text, ...posts]); setText(""); }}>Postează</button>
      </div>

      <div className="posts">
        {posts.map((p, i) => <div className="card" key={i}>{p}</div>)}
      </div>
    </section>
  );
}

function Feedback() {
  return (
    <section className="page">
      <h1>Feedback</h1>
      <div className="grid">
        <div className="card">„Design excelent și comunicare foarte bună.”</div>
        <div className="card">„Platforma arată premium și se mișcă rapid.”</div>
        <div className="card">„AI-ul de estimare ajută mult la început.”</div>
      </div>
    </section>
  );
}

function AIChat() {
  const [answer, setAnswer] = useState("");

  function estimate(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const type = data.get("type");
    const pages = Number(data.get("pages"));
    const auth = data.get("auth") === "on";
    const db = data.get("db") === "on";

    let price = 150 + pages * 35;
    if (type === "platform") price += 350;
    if (auth) price += 120;
    if (db) price += 180;

    setAnswer(`Estimare aproximativă: ${price}€ - ${price + 250}€. Prețul final depinde de design, funcționalități și complexitate.`);
  }

  return (
    <section className="page">
      <h1>AI Agent - Estimare preț</h1>
      <form className="form" onSubmit={estimate}>
        <select name="type">
          <option value="website">Website</option>
          <option value="shop">Magazin online</option>
          <option value="platform">Platformă custom</option>
        </select>
        <input name="pages" type="number" placeholder="Număr de pagini" defaultValue="5" />
        <label><input type="checkbox" name="auth" /> Login / Sign up</label>
        <label><input type="checkbox" name="db" /> Bază de date</label>
        <button className="primary">Calculează</button>
      </form>
      {answer && <div className="card result">{answer}</div>}
    </section>
  );
}

function Login({ setUser }) {
  return (
    <section className="page center">
      <h1>Login</h1>
      <form className="form" onSubmit={(e) => { e.preventDefault(); setUser({ name: "Robert", role: "client" }); }}>
        <input placeholder="Email" />
        <input placeholder="Parolă" type="password" />
        <button className="primary">Intră în cont</button>
      </form>
    </section>
  );
}

function Signup({ setUser }) {
  return (
    <section className="page center">
      <h1>Sign up</h1>
      <form className="form" onSubmit={(e) => { e.preventDefault(); setUser({ name: "Client CYDEVS", role: "client" }); }}>
        <input placeholder="Nume" />
        <input placeholder="Email" />
        <input placeholder="Parolă" type="password" />
        <button className="primary">Creează cont</button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <b>CYDEVS HUB</b>
      <span>Build • Scale • Innovate</span>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const logout = () => setUser(null);

  const pages = {
    home: <Home setPage={setPage} />,
    about: <About />,
    portfolio: <Portfolio />,
    packages: <Packages />,
    orders: <Orders user={user} />,
    forum: <Forum />,
    feedback: <Feedback />,
    ai: <AIChat />,
    login: <Login setUser={setUser} />,
    signup: <Signup setUser={setUser} />,
  };

  return (
    <>
      <Navbar user={user} setPage={setPage} logout={logout} />
      {pages[page]}
      <Footer />
    </>
  );
}
'@ | Set-Content "$frontend\App.jsx"

@'
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, Arial, sans-serif;
  background: #060606;
  color: white;
}

button, input, textarea, select {
  font-family: inherit;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 18px 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(6, 6, 6, 0.88);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 122, 0, 0.2);
}

.logo {
  font-size: 24px;
  font-weight: 900;
  cursor: pointer;
}

.logo span {
  color: #ff7a00;
}

.links {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.links button,
.auth button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.links button:hover {
  color: #ff7a00;
}

.auth {
  display: flex;
  gap: 12px;
  align-items: center;
}

.primary {
  background: #ff7a00 !important;
  color: #090909 !important;
  border: none;
  padding: 12px 22px;
  border-radius: 14px;
  font-weight: 900;
  cursor: pointer;
}

.outline {
  border: 1px solid rgba(255, 122, 0, 0.5) !important;
  color: white !important;
  padding: 11px 20px;
  border-radius: 14px;
  background: transparent !important;
  cursor: pointer;
}

.big {
  font-size: 16px;
  padding: 16px 28px;
}

.hero {
  min-height: 88vh;
  padding: 110px 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    radial-gradient(circle at 20% 10%, rgba(255, 122, 0, 0.25), transparent 35%),
    radial-gradient(circle at 90% 60%, rgba(255, 122, 0, 0.12), transparent 35%),
    #060606;
}

.badge {
  width: fit-content;
  padding: 10px 16px;
  border: 1px solid rgba(255, 122, 0, 0.45);
  border-radius: 999px;
  color: #ff7a00;
  font-weight: 800;
  margin-bottom: 24px;
}

.hero h1 {
  max-width: 900px;
  font-size: clamp(44px, 7vw, 92px);
  line-height: 0.95;
  margin: 0;
}

.hero p {
  color: #cfcfcf;
  max-width: 720px;
  font-size: 20px;
  line-height: 1.6;
}

.heroActions {
  display: flex;
  gap: 18px;
  margin-top: 24px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: 60px;
  max-width: 800px;
}

.stats div,
.card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 122, 0, 0.2);
  border-radius: 24px;
  padding: 26px;
  backdrop-filter: blur(14px);
}

.stats b {
  display: block;
  color: #ff7a00;
  font-size: 34px;
}

.stats span {
  color: #d7d7d7;
}

.page {
  min-height: 80vh;
  padding: 100px 8%;
}

.page h1 {
  font-size: clamp(38px, 5vw, 72px);
  margin-top: 0;
}

.page p {
  max-width: 850px;
  color: #d0d0d0;
  font-size: 18px;
  line-height: 1.7;
}

.grid {
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.projectImage {
  height: 180px;
  border-radius: 18px;
  background: linear-gradient(135deg, #ff7a00, #111);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 52px;
  font-weight: 900;
  color: #111;
}

.package h3 {
  color: #ff7a00;
  font-size: 34px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 650px;
}

input, textarea, select {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,122,0,0.25);
  color: white;
  padding: 16px;
  border-radius: 14px;
}

textarea {
  min-height: 160px;
}

.success,
.result {
  margin-top: 25px;
  color: #ff7a00;
  font-weight: 800;
}

.posts {
  display: grid;
  gap: 16px;
  margin-top: 30px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

footer {
  padding: 36px 8%;
  border-top: 1px solid rgba(255, 122, 0, 0.2);
  display: flex;
  justify-content: space-between;
  color: #aaa;
}

footer b {
  color: #ff7a00;
}

@media (max-width: 900px) {
  .navbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .heroActions {
    flex-direction: column;
  }
}
'@ | Set-Content "$frontend\App.css"

Write-Host "CYDEVS HUB frontend generated successfully."