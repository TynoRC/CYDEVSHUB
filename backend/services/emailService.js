const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendAccountConfirmationEmail(userEmail, userName) {
  return transporter.sendMail({
    from: `"CYDEVS HUB" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Cont CYDEVS HUB creat",
    html: `
      <h2>Bun venit, ${userName}!</h2>
      <p>Contul tău CYDEVS HUB a fost creat cu succes.</p>
    `,
  });
}

async function sendOrderConfirmationEmail(
  userEmail,
  userName,
  orderTitle,
  projectType,
  description
) {
  return transporter.sendMail({
    from: `"CYDEVS HUB" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Comanda ta CYDEVS HUB a fost plasată",
    html: `
      <h2>Salut, ${userName}!</h2>
      <p>Comanda ta a fost primită.</p>
      <p><b>Proiect:</b> ${orderTitle}</p>
      <p><b>Tip:</b> ${projectType}</p>
      <p><b>Descriere:</b> ${description}</p>
    `,
  });
}

async function sendClientAssignmentEmail(
  userEmail,
  userName,
  orderTitle,
  developerName,
  developerEmail,
  price,
  paymentIban
) {
  return transporter.sendMail({
    from: `"CYDEVS HUB" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Proiectul tău CYDEVS HUB a fost preluat",
    html: `
      <h2>Salut, ${userName}!</h2>
      <p>Proiectul tău a fost repartizat unui developer.</p>

      <p><b>Proiect:</b> ${orderTitle}</p>
      <p><b>Developer:</b> ${developerName}</p>
      <p><b>Email developer:</b> ${developerEmail}</p>
      <p><b>Preț total:</b> ${price}€</p>

      <h3>Date plată</h3>
      <p><b>IBAN:</b> ${paymentIban}</p>

      <p>După confirmarea plății, proiectul va continua în statusul IN_PROGRESS.</p>
    `,
  });
}

async function sendDeveloperAssignmentEmail(
  developerEmail,
  developerName,
  order,
  client,
  price,
  developerCut
) {
  return transporter.sendMail({
    from: `"CYDEVS HUB" <${process.env.EMAIL_USER}>`,
    to: developerEmail,
    subject: "Ai primit un proiect nou CYDEVS HUB",
    html: `
      <h2>Salut, ${developerName}!</h2>
      <p>Ai primit un task nou.</p>

      <h3>Detalii proiect</h3>
      <p><b>Proiect:</b> ${order.title}</p>
      <p><b>Tip:</b> ${order.projectType}</p>
      <p><b>Cerințe:</b> ${order.description}</p>

      <h3>Client</h3>
      <p><b>Nume:</b> ${client.name}</p>
      <p><b>Email:</b> ${client.email}</p>

      <h3>Financiar</h3>
      <p><b>Preț total:</b> ${price}€</p>
      <p><b>Partea ta 55%:</b> ${developerCut}€</p>
    `,
  });
}

module.exports = {
  sendAccountConfirmationEmail,
  sendOrderConfirmationEmail,
  sendClientAssignmentEmail,
  sendDeveloperAssignmentEmail,
};