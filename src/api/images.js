const API = 'https://picsum.photos/200/';

export async function getCards() {
  const responses = await Promise.all([...Array(8)].map(() => fetch(`${API}`)));
  console.log(responses)
  return responses.map(response => response.url);
}