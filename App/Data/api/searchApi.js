// https://github.com/benestudio/react-native-ws-2018-feb/blob/5d14c5c11865725dc0c4c067ae18ff39b84f1d35/src/api/search.js

const apiPrefix = 'https://api.spotify.com/v1';

export default async ({
  offset,
  limit,
  q,
  token,
}) => {

  const uri = `${apiPrefix}/search?type=track&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}&type=track`;

  const res = await fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const json = await res.json();

  if (!res.ok) {
    return [];
  }

  const {
    tracks: {
      items,
    }
  } = json;
  const itemsParsed = json.tracks.items;
  let results = itemsParsed.map(item => ({
    id: item.id,
    title: item.name,
    artists: item.artists,

  }));
  return results;
};