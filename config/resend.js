import {Resend} from 'resend';
const resend = new Resend(process.env.RESENT_API)
export default resend;