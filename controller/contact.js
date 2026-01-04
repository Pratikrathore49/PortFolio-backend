import Contact from "../models/contact.js";
import { transporter } from "../config/mail.js";
import dotenv from 'dotenv'
dotenv.config()

const contactDetails = async (req, res) => {
  console.log("running")
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message || !subject) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }
  const savedContact =   await Contact.create({ name, email, message, subject });
       console.log("mere process",process.env.EMAIL_USER,"dfdfd")
       console.log("save",savedContact)
    // await transporter.sendMail({
    //   from: `"Portfolio Contact",<${process.env.EMAIL_USER}>`,
    //   to: process.env.EMAIL_USER,
    //   replyTo: email,
    //   subject: `New Portfolio Message: ,${subject}`,
    //   html: `
    //     <h3>New Contact Message</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `,
    // });
//     await transporter.sendMail({
//       from: `"Pratik Rathore" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Thanks for connecting with me!",
//       html: `
//   <p>Hey, I'm <strong>Pratik</strong> 👋</p>
//   <p>Thanks for connecting with me through my portfolio.</p>
//   <p>I've received your message and will get back to you shortly.</p>
//   <br/>
//   <p>Best regards,<br/>Pratik Rathore</p>
// `,
//     });

    return res.status(201).json({
      success: true,
      message: "Message send successfully",
      data: savedContact._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error',
    });
  }
};

export { contactDetails };
