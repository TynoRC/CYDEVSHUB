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
