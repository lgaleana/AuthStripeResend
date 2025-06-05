import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailParams {
    from: string;
    to: string[];
    subject: string;
    html: string;
}

export async function sendEmail({ from, to, subject, html }: EmailParams) {
    const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
    });
    if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
    return data;
}