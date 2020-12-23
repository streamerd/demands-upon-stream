import { getTracks } from './State';

import { sleep } from './util';

export async function search(query, state) {
  const tracks = getTracks(state);

  // Simulate a network request
  await sleep(500);

  const q = query.toLocaleLowerCase();

  return tracks.filter(t => {
    const fields = [t.title, t.artist].map(f => f.toLocaleLowerCase());
    return fields.some(f => f.indexOf(q) >= 0);
  });
}