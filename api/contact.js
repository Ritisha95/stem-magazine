export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email, message } = req.body;

    // Logic: You would use a library like 'nodemailer' here 
    // to email this info to yourself.
    console.log(`Contact from ${name}: ${message}`);

    return res.status(200).json({ status: 'Message received' });
}
