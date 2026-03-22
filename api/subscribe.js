export default async function handler(req, res) {
    // Only allow POST requests (sending data)
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    // Logic: Here is where you would connect to Supabase or Mailchimp
    console.log("New Subscriber:", email);

    // Tell the frontend it worked
    return res.status(200).json({ message: 'Success' });
}
