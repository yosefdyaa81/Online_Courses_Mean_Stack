const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationUrl =
    `http://localhost:5000/api/auth/verify-email/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your Online Courses account",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Welcome to Online Courses 🎓</h2>

        <p>
          Thank you for creating an account.
        </p>

        <p>
          Please click the button below to verify your email:
        </p>

        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Verify Email
        </a>

        <p>
          This link will expire in 10 minutes.
        </p>
      </div>
    `,
  });
};

module.exports = {
  sendVerificationEmail,
};