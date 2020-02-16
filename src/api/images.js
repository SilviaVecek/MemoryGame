const API = 'https://picsum.photos/200/';

export async function getCards() {
  let responses = await Promise.all([...Array(8)].map(() => fetch(`${API}`)));
  let responsesURL =  responses.map(response => response.url);
  let noDuplicates = [...new Set(responsesURL)].length === 8;
  console.log(noDuplicates)
  return responsesURL
}