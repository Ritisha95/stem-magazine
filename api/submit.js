export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    // Destructure all the fields from your submission form
    const { authorName, title, category, content } = req.body;

    // Logic: This is where you save the article to your 'Submissions' 
    // table in Supabase so your editors can read it later.
    console.log(`New Article Submission: "${title}" by ${authorName}`);

    return res.status(200).json({ status: 'Article submitted for review' });
}
