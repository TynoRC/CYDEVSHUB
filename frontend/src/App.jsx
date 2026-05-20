import React, { useEffect, useState } from "react";
import "./App.css";
import {
  signupUser,
  loginUser,
  createOrder,
  getMyOrders,
  getAdminStats,
getAdminUsers,
updateAdminUserRole,
getAdminOrders,
updateAdminOrderStatus,
assignDeveloperToOrder,
getForumPosts,
createForumPost,
getFeedback,
createFeedback,
} from "./services/api";

function Navbar({ user, setPage, logout, theme, setTheme }) {
  return (
    <nav className="navbar responsiveNav">
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
        {user?.role === "ADMIN" && (
  <button onClick={() => setPage("admin")}>Admin</button>
)}
      </div>

      <div className="auth">
        <button
          className="themeBtn"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user ? (
          <>
            <span className="userBadge">👤 {user.name}</span>
            <button className="outline" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <button className="outline" onClick={() => setPage("login")}>
              Login
            </button>
            <button className="primary" onClick={() => setPage("signup")}>
              Sign up
            </button>
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
        CYDEVS HUB creează site-uri, aplicații web, dashboard-uri,
        automatizări, branding digital și soluții software pentru afaceri.
      </p>

      <div className="heroActions">
        <button className="primary big" onClick={() => setPage("orders")}>
          Comandă proiect
        </button>
        <button className="outline big" onClick={() => setPage("portfolio")}>
          Vezi portofoliul
        </button>
      </div>

      <div className="stats">
        <div>
          <b>24/7</b>
          <span>suport digital</span>
        </div>
        <div>
          <b>AI</b>
          <span>estimare preț</span>
        </div>
        <div>
          <b>100%</b>
          <span>custom design</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  const founders = [
    {
      name: "Daniel Mircea BUDEA",
      role: "CEO & CTO",
    },
    {
      name: "Robert Stefan CHESA",
      role: "Finance Manager",
    },
    {
      name: "Patrik Darius TUNS",
      role: "Head of HR",
    },
    {
      name: "Tudor MULEA",
      role: "Head of PR",
    },
  ];

  return (
    <section className="page aboutPage">
      <div className="badge">EST. 2026</div>

      <h1>Cine suntem noi?</h1>

      <p>
        CYDEVS HUB este o agenție digitală pentru antreprenori, creatori și
        companii care vor să transforme o idee într-un produs online real,
        modern și scalabil.
      </p>

      <div className="grid">
        <div className="card">
          <h3>Design modern</h3>
          <p>Interfețe curate, premium și optimizate pentru conversie.</p>
        </div>

        <div className="card">
          <h3>Dezvoltare full-stack</h3>
          <p>Frontend, backend, baze de date, autentificare și dashboard-uri.</p>
        </div>

        <div className="card">
          <h3>Automatizare</h3>
          <p>Emailuri automate, comenzi, statusuri și procese digitale.</p>
        </div>
      </div>

      <div className="foundersSection">
        <h2>Echipa fondatoare</h2>

        <div className="foundersGrid">
          {founders.map((founder) => (
            <div className="founderCard" key={founder.name}>
              <div className="founderAvatar">
                {founder.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <h3>{founder.name}</h3>
                <p>{founder.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const projects = [
    {
      title: "Sistemul Respirator",
      type: "Website educațional interactiv",
      developer: "Dev. Daniel Mircea BUDEA",
      grade: "Nota 10",
      description:
        "Platformă educațională modernă despre sistemul respirator uman. Include animații, explicații interactive, calculatoare automate și elemente grafice avansate. Realizat fără bază de date, focusat pe performanță și experiență vizuală.",
    },

    {
      title: "Regimuri Totalitare — Soft Educațional",
      type: "Aplicație Python",
      developer: "Dev. Daniel Mircea BUDEA",
      grade:
        'Premiat cu MENȚIUNE SPECIALĂ la etapa națională a concursului "Istorie și Societate în Dimensiune Virtuală"',
      description:
        "Aplicație software complexă pe tema istoriei și regimurilor totalitare. Include bază de date, sistem de autentificare, quiz-uri interactive, admin panel, interfață sofisticată și multiple meniuri educaționale.",
    },

    {
      title: "AI Educational Hackathon Platform",
      type: "Platformă AI educațională",
      developer:
        "Dev. Daniel Mircea BUDEA & Dev. Robert Stefan CHESA",
      grade: "Premiată cu mențiune",
      description:
        "Platformă bazată pe agent AI care ajută utilizatorii să își evalueze cunoștințele și să gestioneze probleme contemporane precum anxietatea și stresul. Sistem modern, interactiv și orientat pe educație digitală.",
    },

    {
      title: "Științe Sociale în Dimensiune Virtuală",
      type: "Website educațional",
      developer: "Dev. Robert Stefan CHESA",
      grade:
        'Premiat cu LOCUL II la etapa județeană a concursului "Istorie și Societate în Dimensiune Virtuală"',
      description:
        "Site educațional modern despre științe sociale, construit cu accent pe interactivitate, organizare informațională și design academic premium.",
    },

    {
      title: "Proiecte Educaționale Diverse",
      type: "Website-uri și aplicații",
      developer: "Echipa CYDEVS HUB",
      grade: "Multiple proiecte academice și educaționale",
      description:
        "Set extins de proiecte educaționale, platforme interactive și aplicații software realizate pentru elevi, profesori și instituții academice.",
    },

    {
      title: "CYDEVS HUB",
      type: "Website oficial companie",
      developer: "Dev. Daniel Mircea BUDEA",
      grade: "Proiect activ",
      description:
        "Platforma oficială CYDEVS HUB. Include autentificare reală, dashboard admin, baze de date, sistem de comenzi, email automation, AI integration și infrastructură full-stack modernă.",
    },
  ];

  return (
    <section className="page">
      <div className="badge">PORTOFOLIU</div>

      <h1>Proiectele noastre</h1>

      <p>
        CYDEVS HUB dezvoltă platforme moderne, educaționale și comerciale,
        orientate spre performanță, design premium și automatizare inteligentă.
      </p>

      <div className="grid">
        {projects.map((project) => (
          <div className="card portfolioCard" key={project.title}>
            <div className="portfolioTop">
              <span className="portfolioType">{project.type}</span>
              <span className="portfolioGrade">{project.grade}</span>
            </div>

            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <div className="portfolioDev">
              <strong>Realizat de:</strong>
              <span>{project.developer}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Packages({ setPage, setSelectedPackage }) {
  const packages = [
    {
      name: "UPGRADE",
      price: "1000€",
      badge: "Optimizare & retușuri",
      short:
        "Pentru proiecte existente care au nevoie de îmbunătățiri tehnice și estetice.",
      features: [
        "Retușuri tehnice și estetice",
        "Optimizare UI/UX",
        "Îmbunătățire performanță",
        "Corectare bug-uri",
        "Modernizare vizuală",
        "Responsive upgrade",
      ],
    },
    {
      name: "MENTENANȚĂ",
      price: "~200€ / lună",
      badge: "Support & întreținere",
      short:
        "Pentru proiecte care au nevoie de suport constant și intervenții rapide.",
      features: [
        "4h de mentenanță / lună",
        "Support tehnic 24/7 în caz de nevoie",
        "Monitorizare funcționalitate",
        "Actualizări și patch-uri",
        "Pot exista taxe suplimentare",
      ],
    },
    {
      name: "BASIC",
      price: "1500€ - 2000€",
      badge: "Construcție simplă",
      short:
        "Pentru website-uri construite de la zero, clare, moderne și responsive.",
      highlighted: true,
      features: [
        'Construcție website de la "0"',
        "Frontend modern",
        "Responsive design",
        "Pagini personalizate",
        "Integrare contact & email",
        "Deployment și optimizare",
      ],
    },
    {
      name: "AVANSAT",
      price: "2500€+",
      badge: "Soluții complexe",
      short:
        "Pentru platforme serioase: ecommerce, dashboard-uri, baze de date și AI.",
      features: [
        "E-commerce complet",
        "Dashboard-uri și panel-uri",
        "Baze de date complexe",
        "Afilieri cu baze externe",
        "Implementare AI",
        "Construire agent AI personalizat",
        "Sisteme automatizate",
      ],
    },
  ];

  function choosePackage(pack) {
    setSelectedPackage(pack);
    setPage("orders");
  }

  return (
    <section className="page">
      <div className="badge">PACHETE</div>

      <h1>Alege pachetul potrivit</h1>

      <p>
        Începi prin alegerea unui pachet, apoi completezi detaliile proiectului.
        Astfel putem estima corect complexitatea, prețul final și developerul
        potrivit.
      </p>

      <div className="grid">
        {packages.map((pack) => (
          <div
            className={`card pricingCard ${
              pack.highlighted ? "highlightedCard" : ""
            }`}
            key={pack.name}
          >
            <div className="pricingTop">
              <span className="pricingBadge">{pack.badge}</span>
              {pack.highlighted && <span className="popularTag">POPULAR</span>}
            </div>

            <h2>{pack.name}</h2>
            <div className="price">{pack.price}</div>
            <p>{pack.short}</p>

            <div className="pricingFeatures">
              {pack.features.map((feature) => (
                <div className="feature" key={feature}>
                  <span>✓</span>
                  <p>{feature}</p>
                </div>
              ))}
            </div>

            <button className="primary" onClick={() => choosePackage(pack)}>
              Selectează pachetul
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Orders({
  user,
  token,
  setPage,
  selectedPackage,
  setSelectedPackage,
}) {
  const [orders, setOrders] = useState([]);
  const [sent, setSent] = useState(false);

useEffect(() => {
  const savedOrders =
    JSON.parse(localStorage.getItem("cydevsDemoOrders")) || [];

  setOrders(savedOrders);
}, []);

  if (!user) {
    return (
      <section className="page">
        <h1>Ai nevoie de cont pentru a plasa o comandă.</h1>
        <p>Autentifică-te sau creează un cont pentru a continua.</p>

        <div className="heroActions">
          <button className="primary" onClick={() => setPage("login")}>
            Login
          </button>
          <button className="outline" onClick={() => setPage("signup")}>
            Sign up
          </button>
        </div>
      </section>
    );
  }

 async function handleOrder(e) {
  e.preventDefault();

  if (!selectedPackage) {
    alert("Te rugăm să alegi mai întâi un pachet.");
    setPage("packages");
    return;
  }

  const title = e.target[0].value;
  const projectType = e.target[1].value;
  const urgency = e.target[2].value;
  const description = e.target[3].value;

  const needsDesign = e.target[4].checked;
  const needsDatabase = e.target[5].checked;
  const needsAuth = e.target[6].checked;
  const needsAI = e.target[7].checked;

  const fullDescription = `
Pachet selectat: ${selectedPackage.name}
Preț orientativ pachet: ${selectedPackage.price}
Tip proiect: ${projectType}
Urgență: ${urgency}

Cerințe:
${description}

Extra:
- Design complet: ${needsDesign ? "DA" : "NU"}
- Bază de date: ${needsDatabase ? "DA" : "NU"}
- Login / conturi: ${needsAuth ? "DA" : "NU"}
- AI / automatizări: ${needsAI ? "DA" : "NU"}
`;

async function handleOrder(e) {
  e.preventDefault();

  if (!selectedPackage) {
    alert("Te rugăm să alegi mai întâi un pachet.");
    setPage("packages");
    return;
  }

  const title = e.target[0].value;
  const projectType = e.target[1].value;
  const urgency = e.target[2].value;
  const description = e.target[3].value;

  const newOrder = {
    id: Date.now(),
    title,
    projectType: `${selectedPackage.name} — ${projectType}`,
    description,
    urgency,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  const savedOrders =
    JSON.parse(localStorage.getItem("cydevsDemoOrders")) || [];

  localStorage.setItem(
    "cydevsDemoOrders",
    JSON.stringify([newOrder, ...savedOrders])
  );

  setOrders([newOrder, ...orders]);
  setSent(true);
  setSelectedPackage(null);

  alert(
    "Comanda a fost plasată cu succes. Vei fi contactat de echipa CYDEVS HUB."
  );
}

  if (!data.order) {
    alert(data.message || "Eroare la plasarea comenzii.");
    return;
  }

  setSent(true);
  setSelectedPackage(null);
}

  return (
    <section className="page">
      <h1>Plasează o comandă</h1>

      <div className="orderFlow">
  <div className="orderSummary card">
    <span className="stepBadge">PASUL 1</span>
    <h2>Pachet selectat</h2>

    {selectedPackage ? (
      <>
        <h3>{selectedPackage.name}</h3>
        <div className="price smallPrice">{selectedPackage.price}</div>
        <p>{selectedPackage.short}</p>

        <button
          className="outline"
          onClick={() => {
            setSelectedPackage(null);
            setPage("packages");
          }}
        >
          Schimbă pachetul
        </button>
      </>
    ) : (
      <>
        <p>Nu ai selectat încă un pachet.</p>
        <button className="primary" onClick={() => setPage("packages")}>
          Alege pachet
        </button>
      </>
    )}
  </div>

  <form className="form orderForm card" onSubmit={handleOrder}>
    <span className="stepBadge">PASUL 2</span>

    <h2>Detalii proiect</h2>

    <input
      placeholder="Numele proiectului"
      defaultValue={
        selectedPackage ? `Proiect ${selectedPackage.name}` : ""
      }
      required
    />

    <select required defaultValue="">
      <option value="" disabled>
        Alege tipul proiectului
      </option>
      <option>Website de prezentare</option>
      <option>Website educațional</option>
      <option>Magazin online / E-commerce</option>
      <option>Platformă custom</option>
      <option>Dashboard / Admin panel</option>
      <option>Aplicație AI</option>
      <option>Mentenanță / Retușuri</option>
    </select>

    <select required defaultValue="">
      <option value="" disabled>
        Nivel de urgență
      </option>
      <option>Normal</option>
      <option>Prioritar</option>
      <option>Urgent</option>
    </select>

    <textarea
      placeholder="Descrie ideea, funcționalitățile dorite, paginile, deadline-ul și orice detaliu important..."
      required
    />

    <div className="orderChecklist">
      <label>
        <input type="checkbox" /> Am nevoie de design complet
      </label>
      <label>
        <input type="checkbox" /> Am nevoie de bază de date
      </label>
      <label>
        <input type="checkbox" /> Am nevoie de login / conturi utilizatori
      </label>
      <label>
        <input type="checkbox" /> Am nevoie de AI / automatizări
      </label>
    </div>

    <button className="primary">Trimite cererea</button>
  </form>
</div>

      {sent && (
        <div className="success">
          Comanda a fost plasată. Vei primi email de confirmare.
        </div>
      )}
      <div className="ordersList">
  <h2>Comenzile mele</h2>

  {orders.length === 0 ? (
    <p>Nu ai comenzi încă.</p>
  ) : (
    orders.map((order) => (
      <div className="card" key={order.id}>
        <h3>{order.title}</h3>
        <p>{order.projectType}</p>
        <p>{order.description}</p>
        <strong>Status: {order.status}</strong>
      </div>
    ))
  )}
</div>
    </section>
  );
}

function Forum({ user, token, setPage }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  async function loadPosts() {
    const data = await getForumPosts();

    if (Array.isArray(data)) {
      setPosts(data);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function addPost() {
    if (!user) {
      alert("Trebuie să fii logat ca să postezi.");
      setPage("login");
      return;
    }

    if (!text.trim()) return;

    const data = await createForumPost(text, token);

    if (!data.id) {
      alert(data.message || "Mesajul nu s-a postat.");
      return;
    }

    setText("");
    loadPosts();
  }

  function formatDate(date) {
    return new Date(date).toLocaleString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <section className="page">
      <div className="badge">FORUM LIVE</div>

      <h1>Forum CYDEVS HUB</h1>

      <p>
        Spațiu de discuții pentru clienți, developeri și administratori.
        Mesajele sunt salvate în baza de date și nu dispar după refresh.
      </p>

      <div className="chatBox card">
        <div className="chatMessages">
          {posts.length === 0 ? (
            <p>Nu există mesaje încă.</p>
          ) : (
            posts.map((post) => (
              <div className="chatMessage" key={post.id}>
                <div className="chatHeader">
                  <strong>{post.user?.name || "Utilizator"}</strong>

                  <span className={`roleBadge role${post.user?.role}`}>
                    {post.user?.role || "CLIENT"}
                  </span>

                  <small>{formatDate(post.createdAt)}</small>
                </div>

                <p>{post.content}</p>
              </div>
            ))
          )}
        </div>

        <div className="chatInput">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              user
                ? "Scrie un mesaj..."
                : "Trebuie să fii logat ca să postezi..."
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") addPost();
            }}
          />

          <button className="primary" onClick={addPost}>
            Trimite
          </button>
        </div>
      </div>
    </section>
  );
}

function Feedback({ user, token, setPage }) {
  const developers = [
    {
      name: "Daniel Mircea BUDEA",
      email: "daniel.budea@lucaciu.ro",
      projects: [
        "Sistemul Respirator",
        "Regimuri Totalitare — Soft Educațional",
        "AI Educational Hackathon Platform",
        "CYDEVS HUB",
      ],
      success: 100,
    },
    {
      name: "Robert Stefan CHESA",
      email: "robert.chesa@lucaciu.ro",
      projects: [
        "AI Educational Hackathon Platform",
        "Științe Sociale în Dimensiune Virtuală",
      ],
      success: 100,
    },
    {
      name: "Patrik Darius TUNS",
      email: "patrik.tuns@lucaciu.ro",
      projects: [
        "Management HR CYDEVS",
        "Structură internă developers",
      ],
      success: 100,
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  async function loadReviews() {
    const data = await getFeedback();

    if (Array.isArray(data)) {
      setReviews(data);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function getDeveloperReviews(email) {
    return reviews.filter((review) => review.developerEmail === email);
  }

  function getAverageRating(email) {
    const devReviews = getDeveloperReviews(email);

    if (devReviews.length === 0) {
      return "5.0";
    }

    const total = devReviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / devReviews.length).toFixed(1);
  }

  function getAverageSatisfaction(email) {
    const devReviews = getDeveloperReviews(email);

    if (devReviews.length === 0) {
      return 100;
    }

    const total = devReviews.reduce(
      (sum, review) => sum + review.satisfaction,
      0
    );

    return Math.round(total / devReviews.length);
  }

  async function submitReview(e) {
    e.preventDefault();

    if (!user) {
      alert("Trebuie să fii logat ca să lași review.");
      setPage("login");
      return;
    }

    const developerEmail = e.target[0].value;
    const developer = developers.find((dev) => dev.email === developerEmail);

    const projectTitle = e.target[1].value;
    const rating = e.target[2].value;
    const satisfaction = e.target[3].value;
    const message = e.target[4].value;

    const data = await createFeedback(
      {
        developerName: developer.name,
        developerEmail: developer.email,
        projectTitle,
        rating,
        satisfaction,
        message,
      },
      token
    );

    if (!data.id) {
      alert(data.message || "Review-ul nu s-a putut salva.");
      return;
    }

    e.target.reset();
    loadReviews();
    alert("Review trimis cu succes.");
  }

  return (
    <section className="page">
      <div className="badge">DEVELOPER PERFORMANCE</div>

      <h1>Feedback & Statistici Developeri</h1>

      <p>
        Vezi performanța developerilor CYDEVS HUB, proiectele realizate,
        rating-ul primit și recenziile clienților după proiectele predate.
      </p>

      <div className="grid">
        {developers.map((developer) => {
          const devReviews = getDeveloperReviews(developer.email);
          const satisfaction = getAverageSatisfaction(developer.email);

          return (
            <div
              className="card developerStatsCard"
              key={developer.email}
              onClick={() => setSelectedDeveloper(developer)}
            >
              <div className="developerAvatarBig">
                {developer.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <h2>{developer.name}</h2>

              <div className="performanceLine">
                <span>Rating performanță</span>
                <strong>{getAverageRating(developer.email)}/5</strong>
              </div>

              <div className="performanceLine">
                <span>Proiecte la activ</span>
                <strong>{developer.projects.length}</strong>
              </div>

              <div className="performanceLine">
                <span>Rată de reușită</span>
                <strong>{developer.success}%</strong>
              </div>

              <div className="performanceLine">
                <span>Satisfacție clienți</span>
                <strong>{satisfaction}%</strong>
              </div>

              <div className="progressBar">
                <div style={{ width: `${satisfaction}%` }} />
              </div>

              <p>{devReviews.length} recenzii primite</p>

              <button className="outline" type="button">
                Vezi recenziile
              </button>
            </div>
          );
        })}
      </div>

      {selectedDeveloper && (
        <div className="reviewsPanel card">
          <div className="panelHeader">
            <div>
              <h2>{selectedDeveloper.name}</h2>
              <p>{selectedDeveloper.email}</p>
            </div>

            <button
              className="outline"
              onClick={() => setSelectedDeveloper(null)}
            >
              Închide
            </button>
          </div>

          <h3>Proiecte la activ</h3>

          <div className="projectTags">
            {selectedDeveloper.projects.map((project) => (
              <span key={project}>{project}</span>
            ))}
          </div>

          <h3>Recenzii primite</h3>

          {getDeveloperReviews(selectedDeveloper.email).length === 0 ? (
            <p>Nu există încă recenzii pentru acest developer.</p>
          ) : (
            getDeveloperReviews(selectedDeveloper.email).map((review) => (
              <div className="reviewItem" key={review.id}>
                <div className="chatHeader">
                  <strong>{review.user?.name}</strong>

                  <span className={`roleBadge role${review.user?.role}`}>
                    {review.user?.role}
                  </span>

                  <small>
                    {new Date(review.createdAt).toLocaleString("ro-RO")}
                  </small>
                </div>

                <p>
                  <b>Proiect:</b> {review.projectTitle}
                </p>

                <p>
                  <b>Rating:</b> {review.rating}/5
                </p>

                <p>
                  <b>Satisfacție:</b> {review.satisfaction}%
                </p>

                <p>{review.message}</p>
              </div>
            ))
          )}
        </div>
      )}

      <div className="reviewFormSection card">
        <h2>Lasă un review</h2>

        <p>
          Utilizatorii care au comandat pot evalua developerul, pot seta
          procentul de satisfacție și pot adăuga un comentariu.
        </p>

        <form className="form" onSubmit={submitReview}>
          <select required defaultValue="">
            <option value="" disabled>
              Alege developerul
            </option>

            {developers.map((developer) => (
              <option value={developer.email} key={developer.email}>
                {developer.name}
              </option>
            ))}
          </select>

          <input placeholder="Numele proiectului" required />

          <select required defaultValue="">
            <option value="" disabled>
              Rating
            </option>
            <option value="5">5 - Excelent</option>
            <option value="4">4 - Foarte bun</option>
            <option value="3">3 - Bun</option>
            <option value="2">2 - Slab</option>
            <option value="1">1 - Foarte slab</option>
          </select>

          <input
            type="number"
            min="0"
            max="100"
            placeholder="Cât % ești mulțumit?"
            required
          />

          <textarea
            placeholder="Scrie comentariul tău despre colaborare..."
            required
          />

          <button className="primary">Trimite review</button>
        </form>
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

    if (type === "shop") price += 250;
    if (type === "platform") price += 350;
    if (auth) price += 120;
    if (db) price += 180;

    setAnswer(
      `Estimare aproximativă: ${price}€ - ${
        price + 250
      }€. Prețul final depinde de design, funcționalități și complexitate.`
    );
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

        <input
          name="pages"
          type="number"
          placeholder="Număr de pagini"
          defaultValue="5"
        />

        <label>
          <input type="checkbox" name="auth" /> Login / Sign up
        </label>

        <label>
          <input type="checkbox" name="db" /> Bază de date
        </label>

        <button className="primary">Calculează</button>
      </form>

      {answer && <div className="card result">{answer}</div>}
    </section>
  );
}

function Login({ setUser, setToken, setPage }) {
  return (
    <section className="page">
      <h1>Login</h1>

      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();

          const email = e.target[0].value.trim().toLowerCase();
          const password = e.target[1].value;

          const data = await loginUser(email, password);

          if (!data.token) {
            alert(data.message || "Date incorecte.");
            return;
          }

          localStorage.setItem("cydevsCurrentUser", JSON.stringify(data.user));
          localStorage.setItem("cydevsToken", data.token);

          setUser(data.user);
          setToken(data.token);
          setPage("home");
        }}
      >
        <input placeholder="Email" type="email" required />
        <input placeholder="Parolă" type="password" required />

        <button className="primary">Intră în cont</button>
      </form>
    </section>
  );
}

function Signup({ setUser, setToken, setPage }) {
  return (
    <section className="page">
      <h1>Sign up</h1>

      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();

          const name = e.target[0].value.trim();
          const email = e.target[1].value.trim().toLowerCase();
          const password = e.target[2].value;

          if (password.length < 6) {
            alert("Parola trebuie să aibă minim 6 caractere.");
            return;
          }

          const data = await signupUser(name, email, password);

          if (!data.token) {
            alert(data.message || "Eroare la creare cont.");
            return;
          }

          localStorage.setItem("cydevsCurrentUser", JSON.stringify(data.user));
          localStorage.setItem("cydevsToken", data.token);

          setUser(data.user);
          setToken(data.token);
          setPage("home");

          alert("Cont creat cu succes. Emailul de confirmare a fost trimis.");
        }}
      >
        <input placeholder="Nume" type="text" required />
        <input placeholder="Email" type="email" required />
        <input placeholder="Parolă" type="password" required />

        <button className="primary">Creează cont</button>
      </form>
    </section>
  );
}

function AdminPanel({ user, token }) {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const developers = [
  {
    name: "Daniel Budea",
    email: "daniel.budea@lucaciu.ro",
  },
  {
    name: "Patrik Tuns",
    email: "patrik.tuns@lucaciu.ro",
  },
  {
    name: "Robert Chesa",
    email: "robert.chesa@lucaciu.ro",
  },
];

async function assignDeveloper(orderId) {
  const developerEmail = prompt(
    "Email developer:\n" +
      developers.map((dev) => dev.email).join("\n")
  );

  const developer = developers.find((dev) => dev.email === developerEmail);

  if (!developer) {
    alert("Developer invalid.");
    return;
  }

  const price = prompt("Preț total proiect (€):");

  if (!price || isNaN(price)) {
    alert("Preț invalid.");
    return;
  }

  const data = await assignDeveloperToOrder(
    orderId,
    {
      developerName: developer.name,
      developerEmail: developer.email,
      price: Number(price),
    },
    token
  );

  if (!data.order) {
    alert(data.message || "Eroare la repartizare.");
    return;
  }

  alert("Developer repartizat. Emailurile au fost trimise.");
  loadAdminData();
}

  async function loadAdminData() {
    const statsData = await getAdminStats(token);
    const usersData = await getAdminUsers(token);
    const ordersData = await getAdminOrders(token);

    setStats(statsData);

    if (Array.isArray(usersData)) {
      setUsers(usersData);
    }

    if (Array.isArray(ordersData)) {
      setOrders(ordersData);
    }
  }

  useEffect(() => {
    if (user?.role === "ADMIN") {
      loadAdminData();
    }
  }, [user, token]);

  async function changeUserRole(userId, role) {
    await updateAdminUserRole(userId, role, token);
    loadAdminData();
  }

  async function changeOrderStatus(orderId, status) {
    await updateAdminOrderStatus(orderId, status, token);
    loadAdminData();
  }

  if (!user || user.role !== "ADMIN") {
    return (
      <section className="page">
        <h1>Acces interzis</h1>
        <p>Ai nevoie de rol ADMIN pentru această pagină.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Admin Dashboard</h1>
      <p>Panou central pentru administrarea platformei CYDEVS HUB.</p>

      {stats && (
        <div className="grid">
          <div className="card">
            <h3>Utilizatori</h3>
            <strong>{stats.users}</strong>
          </div>

          <div className="card">
            <h3>Comenzi totale</h3>
            <strong>{stats.orders}</strong>
          </div>

          <div className="card">
            <h3>Comenzi pending</h3>
            <strong>{stats.pendingOrders}</strong>
          </div>

          <div className="card">
            <h3>Finalizate</h3>
            <strong>{stats.completedOrders}</strong>
          </div>
        </div>
      )}

      <div className="adminSection">
        <h2>Utilizatori</h2>

        <div className="adminTable">
          {users.map((item) => (
            <div className="adminRow" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>{item.email}</p>
              </div>

              <select
                value={item.role}
                onChange={(e) => changeUserRole(item.id, e.target.value)}
              >
                <option value="CLIENT">CLIENT</option>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="adminSection">
        <h2>Comenzi</h2>

        <div className="adminTable">
          {orders.map((order) => (
            <div className="adminRow" key={order.id}>
              <div>
                <strong>{order.title}</strong>
                <p>
                  {order.projectType} — {order.user?.name} —{" "}
                  {order.user?.email}
                </p>
                <p>{order.description}</p>
              </div>

              <select
                value={order.status}
                onChange={(e) => changeOrderStatus(order.id, e.target.value)}
                >
                <option value="PENDING">PENDING</option>
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
                </select>

                <button
                className="primary"
                onClick={() => assignDeveloper(order.id)}
                >
                Repartizează developer
                </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeveloperPanel({ user, token }) {
  const [orders, setOrders] = useState([]);

  async function loadDeveloperOrders() {
    const data = await getDeveloperOrders(token);

    if (Array.isArray(data)) {
      setOrders(data);
    }
  }

  useEffect(() => {
    if (user?.role === "DEVELOPER" || user?.role === "ADMIN") {
      loadDeveloperOrders();
    }
  }, [user, token]);

  async function changeStatus(orderId, status) {
    await updateDeveloperOrderStatus(orderId, status, token);
    loadDeveloperOrders();
  }

  if (!user || (user.role !== "DEVELOPER" && user.role !== "ADMIN")) {
    return (
      <section className="page">
        <h1>Acces interzis</h1>
        <p>Ai nevoie de rol DEVELOPER pentru această pagină.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Developer Panel</h1>
      <p>
        Aici vezi proiectele repartizate ție, datele clientului, cerințele,
        prețul total și partea ta de 55%.
      </p>

      <div className="adminSection">
        <h2>Comenzile mele active</h2>

        {orders.length === 0 ? (
          <div className="card">
            Nu ai încă proiecte repartizate.
          </div>
        ) : (
          <div className="adminTable">
            {orders.map((order) => (
              <div className="adminRow developerOrder" key={order.id}>
                <div>
                  <h3>{order.title}</h3>

                  <p>
                    <b>Tip proiect:</b> {order.projectType}
                  </p>

                  <p>
                    <b>Cerințe:</b> {order.description}
                  </p>

                  <p>
                    <b>Client:</b> {order.user?.name}
                  </p>

                  <p>
                    <b>Email client:</b> {order.user?.email}
                  </p>

                  <p>
                    <b>Preț total:</b> {order.price || 0}€
                  </p>

                  <p>
                    <b>Partea developerului 55%:</b>{" "}
                    {order.developerCut || 0}€
                  </p>

                  <p>
                    <b>Status:</b> {order.status}
                  </p>

                  <p>
                    <b>Data comenzii:</b>{" "}
                    {new Date(order.createdAt).toLocaleString("ro-RO")}
                  </p>
                </div>

                <div>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      changeStatus(order.id, e.target.value)
                    }
                  >
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>

                  <div className="miniInfo">
                    <strong>Developer:</strong>
                    <span>{order.assignedDeveloperName}</span>
                    <span>{order.assignedDeveloperEmail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <b>CYDEVS HUB</b>
        <span>Build • Scale • Innovate</span>
      </div>

      <div className="footerCopy">
        © 2026 CYDEVS HUB. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingAIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text:
        "Salut! Sunt AI Assistant CYDEVS HUB. Spune-mi ce vrei să construiești, câte pagini ai nevoie, dacă vrei login, bază de date, AI, ecommerce, dashboard sau mentenanță, iar eu îți estimez pachetul și prețul potrivit.",
    },
  ]);
  const [input, setInput] = useState("");

  function analyzeProject(text) {
    const q = text.toLowerCase();

    let score = 0;
    let estimatedPrice = 0;
    let recommendedPackage = "BASIC";
    let reasons = [];

    if (q.includes("retus") || q.includes("retuș") || q.includes("bug") || q.includes("optimiz")) {
      score += 1;
      estimatedPrice += 1000;
      recommendedPackage = "UPGRADE";
      reasons.push("ai menționat retușuri, bug-uri sau optimizare");
    }

    if (q.includes("mentenan") || q.includes("support") || q.includes("suport")) {
      score += 1;
      estimatedPrice += 200;
      recommendedPackage = "MENTENANȚĂ";
      reasons.push("ai nevoie de mentenanță sau suport");
    }

    if (q.includes("site") || q.includes("website") || q.includes("prezentare") || q.includes("landing")) {
      score += 2;
      estimatedPrice += 1500;
      recommendedPackage = "BASIC";
      reasons.push("ai descris un website de prezentare sau landing page");
    }

    if (q.includes("login") || q.includes("sign up") || q.includes("cont") || q.includes("utilizatori")) {
      score += 2;
      estimatedPrice += 350;
      recommendedPackage = "AVANSAT";
      reasons.push("ai nevoie de conturi utilizatori / autentificare");
    }

    if (q.includes("baza de date") || q.includes("database") || q.includes("db") || q.includes("date salvate")) {
      score += 3;
      estimatedPrice += 500;
      recommendedPackage = "AVANSAT";
      reasons.push("ai nevoie de bază de date");
    }

    if (q.includes("ecommerce") || q.includes("magazin") || q.includes("plata") || q.includes("plăți") || q.includes("produse")) {
      score += 4;
      estimatedPrice += 900;
      recommendedPackage = "AVANSAT";
      reasons.push("ai menționat ecommerce / produse / plăți");
    }

    if (q.includes("dashboard") || q.includes("admin") || q.includes("panel") || q.includes("pannel")) {
      score += 3;
      estimatedPrice += 700;
      recommendedPackage = "AVANSAT";
      reasons.push("ai nevoie de dashboard sau admin panel");
    }

    if (q.includes("ai") || q.includes("agent") || q.includes("chatbot") || q.includes("automatizare")) {
      score += 4;
      estimatedPrice += 1000;
      recommendedPackage = "AVANSAT";
      reasons.push("ai nevoie de AI / chatbot / automatizări");
    }

    const pageMatch = q.match(/(\d+)\s*(pagini|pagina|page|pages)/);
    if (pageMatch) {
      const pages = Number(pageMatch[1]);
      const extra = Math.max(0, pages - 3) * 120;
      estimatedPrice += extra;

      if (pages > 6) {
        recommendedPackage = "AVANSAT";
      }

      reasons.push(`ai menționat aproximativ ${pages} pagini`);
    }

    if (q.includes("urgent") || q.includes("repede") || q.includes("rapid")) {
      estimatedPrice += 300;
      reasons.push("ai menționat urgență / deadline rapid");
    }

    if (estimatedPrice === 0) {
      estimatedPrice = 1500;
      recommendedPackage = "BASIC";
      reasons.push("ai nevoie de o estimare generală pentru un proiect digital");
    }

    if (recommendedPackage === "MENTENANȚĂ") {
      return {
        package: "MENTENANȚĂ",
        range: "~200€/lună",
        explanation:
          "Pentru ce ai descris, pachetul de MENTENANȚĂ este cel mai potrivit. Include aproximativ 4h/lună și suport 24/7 în caz de nevoie. Pentru cerințe complexe pot apărea taxe suplimentare.",
        reasons,
      };
    }

    if (recommendedPackage === "UPGRADE") {
      return {
        package: "UPGRADE",
        range: "aprox. 1000€",
        explanation:
          "Pentru ce ai descris, pachetul UPGRADE pare potrivit. Este destinat proiectelor existente care au nevoie de retușuri tehnice, estetice, optimizare, bug fixing sau responsive upgrade.",
        reasons,
      };
    }

    if (recommendedPackage === "BASIC") {
      return {
        package: "BASIC",
        range: "1500€ - 2000€",
        explanation:
          "Pentru ce ai descris, pachetul BASIC oferă cel mai bun raport produs-preț. Este recomandat pentru website-uri construite de la zero, fără logică foarte complexă, dar cu design modern și responsive.",
        reasons,
      };
    }

    const min = Math.max(2500, estimatedPrice);
    const max = min + 800;

    return {
      package: "AVANSAT",
      range: `${min}€ - ${max}€+`,
      explanation:
        "Pentru ce ai descris, pachetul AVANSAT este cel mai potrivit. Este recomandat pentru proiecte cu baze de date, login, dashboard-uri, ecommerce, AI, automatizări sau integrări externe.",
      reasons,
    };
  }

  function generateAnswer(question) {
    const q = question.toLowerCase();

    if (
      q.includes("pret") ||
      q.includes("preț") ||
      q.includes("cost") ||
      q.includes("cat costa") ||
      q.includes("cât costă") ||
      q.includes("vreau") ||
      q.includes("site") ||
      q.includes("aplicatie") ||
      q.includes("aplicație") ||
      q.includes("platforma") ||
      q.includes("platformă") ||
      q.includes("magazin") ||
      q.includes("dashboard") ||
      q.includes("ai")
    ) {
      const result = analyzeProject(question);

      return (
        `Estimarea mea: pachetul recomandat este ${result.package}, cu un preț orientativ de ${result.range}.\n\n` +
        `${result.explanation}\n\n` +
        `De ce: ${result.reasons.join(", ")}.\n\n` +
        "Pentru o ofertă finală corectă, recomand să trimiți o comandă cu: număr de pagini, funcționalități dorite, deadline, exemple vizuale și dacă ai nevoie de bază de date, login sau AI."
      );
    }

    if (q.includes("finante") || q.includes("finanțe") || q.includes("buget") || q.includes("investitie") || q.includes("investiție")) {
      return (
        "Din punct de vedere financiar, recomand să alegi pachetul după scop: BASIC pentru validare rapidă și cost controlat, UPGRADE pentru proiecte existente, MENTENANȚĂ pentru suport constant, iar AVANSAT pentru proiecte care pot genera venit, automatizări sau scalare. Cel mai bun ROI apare de obicei la AVANSAT dacă proiectul include vânzări, baze de date sau AI."
      );
    }

    if (q.includes("servicii") || q.includes("oferiti") || q.includes("oferiți")) {
      return (
        "CYDEVS HUB oferă website-uri de prezentare, platforme custom, ecommerce, dashboard-uri, admin panel-uri, baze de date, login/signup, automatizări email, mentenanță, optimizare UI/UX și integrare sau construire de AI."
      );
    }

    return (
      "Pot să te ajut cu estimări de preț, alegerea pachetului potrivit, comparații produs-preț, servicii IT, bugete și întrebări despre dezvoltarea unui proiect digital. Descrie-mi proiectul în câteva detalii și îți dau o recomandare."
    );
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage = {
      from: "user",
      text: input,
    };

    const aiMessage = {
      from: "ai",
      text: generateAnswer(input),
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  }

  return (
    <>
      {open && (
        <div className="aiChatBox">
          <div className="aiChatHeader">
            <div>
              <strong>CYDEVS AI Assistant</strong>
              <span>Estimări • IT • Finanțe • Pachete</span>
            </div>

            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="aiChatMessages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`aiMessage ${
                  message.from === "user" ? "userAiMessage" : "botAiMessage"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="aiChatInput">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: vreau un magazin online cu login și AI..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>Trimite</button>
          </div>
        </div>
      )}

      <button className="aiFloatingButton" onClick={() => setOpen(!open)}>
        {open ? "×" : "💬"}
      </button>
    </>
  );
}


export default function App() {
  const [page, setPage] = useState("home");
  const [selectedPackage, setSelectedPackage] = useState(null);

    const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cydevsCurrentUser");
    return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
    return localStorage.getItem("cydevsToken") || null;
    });

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

    function logout() {
    localStorage.removeItem("cydevsCurrentUser");
    localStorage.removeItem("cydevsToken");
    setUser(null);
    setToken(null);
    setPage("home");
    }

  const pages = {
    home: <Home setPage={setPage} />,
    about: <About />,
    portfolio: <Portfolio />,
    packages: (
        <Packages
            setPage={setPage}
            setSelectedPackage={setSelectedPackage}
        />
        ),
        orders: (
        <Orders
            user={user}
            token={token}
            setPage={setPage}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
        />
        ),
    forum: <Forum user={user} token={token} setPage={setPage} />,
    feedback: <Feedback user={user} token={token} setPage={setPage} />,
    ai: <AIChat />,
    login: <Login setUser={setUser} setToken={setToken} setPage={setPage} />,
    signup: <Signup setUser={setUser} setToken={setToken} setPage={setPage} />,
    admin: <AdminPanel user={user} token={token} />,
    developer: <DeveloperPanel user={user} token={token} />,
  };

return (
  <>
    <Navbar
      user={user}
      setPage={setPage}
      logout={logout}
      theme={theme}
      setTheme={setTheme}
    />

    {pages[page]}

    <Footer />

    <FloatingAIAssistant />
  </>
);
}