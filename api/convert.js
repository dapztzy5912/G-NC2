export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const encodedUrl = encodeURIComponent(imageUrl);
    const apiUrl = `https://fastrestapis.fasturl.cloud/aiimage/ghibli?imageUrl=${encodedUrl}&type=png`;

    const response = await fetch(apiUrl);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const mimeType = blob.type || 'image/png';

    res.status(200).json({ image: `data:${mimeType};base64,${base64Image}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
