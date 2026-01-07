import Contact from "../models/contact.js";
import resend from "../config/resend.js";
import dotenv from "dotenv";
dotenv.config();

const contactDetails = async (req, res) => {
  try {
    console.log("Resend object:", resend);

    console.log("📩 Contact API hit");
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message || !subject) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }
    const savedContact = await Contact.create({
      name,
      email,
      message,
      subject,
    });
    console.log("📨 Sending admin email...");


   const adminEmail =  await resend.emails.send({
      from: `Portfolio Contact <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM,
      subject: `New Portfolio Message: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });
    console.log("Admin email response:", adminEmail);

  console.log("📨 Sending user email...");

   const userEmail = await resend.emails.send({
      from: `Pratik Rathore <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Thanks for connecting with me!",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting me through my portfolio.</p>
        <p>I’ve received your message and will reply soon.</p>
        <br/>
        <p>Regards,<br/>Pratik Rathore</p>
      `,
    });
    console.log("User email response:", userEmail);

    return res.status(201).json({
      success: true,
      message: "Message send successfully",
      data: savedContact._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error",
    });
  }
};

export { contactDetails };
