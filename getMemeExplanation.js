import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST allowed');
    return;
  }

  const apiKey = 'YOUR_OPENAI_API_KEY'; // 👉 Replace with your real key
  const { topic } = req.body;

  const prompt = `Explain the following topic in Telugu using meme-style humor and famous Telugu movie dialogues. Make it funny but clear.
  Topic: ${topic}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.8
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    res.status(200).json({ reply: response.data.choices[0].text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error calling OpenAI' });
  }
}
