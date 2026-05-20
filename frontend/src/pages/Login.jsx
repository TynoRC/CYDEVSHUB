function Login({ setUser }) {
  return (
    <section className="page">
      <h1>Login</h1>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target[0].value;
          const name = email.split("@")[0] || "Client";
          setUser({ name, role: "client" });
        }}
      >
        <input placeholder="Email" type="email" required />
        <input placeholder="Parolă" type="password" required />
        <button className="primary">Intră în cont</button>
      </form>
    </section>
  );
}