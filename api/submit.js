import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // These match the "name" attributes in your HTML form exactly
    const { name, email, school, grade, category, title, abstract, message } = req.body;

    const { data, error } = await supabase
      .from('submissions')
      .insert([
        { 
          author_name: name, 
          author_email: email, 
          school_name: school, 
          grade_level: grade, 
          category: category, 
          title: title, 
          abstract: abstract, 
          additional_info: message 
        }
      ]);

    if (error) throw error;

    return res.status(200).json({ message: 'Success' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
