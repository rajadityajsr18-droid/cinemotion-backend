const https = require('https');
const { URL } = require('url');

function fetchUrl(urlStr) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + (u.search || ''),
      headers: { 'Accept': 'text/html', 'User-Agent': 'Mozilla/5.0 CineMotion/1.0' }
    };
    const req = https.get(opts, (res) => {
      if ([301, 302, 303].includes(res.statusCode)) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let d = '';
      res.on('data', c => { d += c; });
      res.on('end', () => resolve(d));
    });
    req.on('error', reject);
  });
}

function extractPoster(html) {
  const og = html.match(/property="og:image"\s+content="([^"]+)"/);
  if (!og) return null;
  const src = og[1];
  const m = src.match(/\/t\/p\/[^/]+(\/[^?]+\.jpg)/);
  return m ? m[1] : src;
}

const items = [
  { name: 'Oppenheimer',   url: 'https://www.themoviedb.org/movie/872585' },
  { name: 'FallGuy',       url: 'https://www.themoviedb.org/movie/746036' },
  { name: 'Shogun2024',    url: 'https://www.themoviedb.org/tv/126308' },
  { name: 'Boys',          url: 'https://www.themoviedb.org/tv/76479' },
  { name: 'Fallout',       url: 'https://www.themoviedb.org/tv/106379' },
  { name: 'TheBear',       url: 'https://www.themoviedb.org/tv/136315' },
  { name: 'ThePenguin',    url: 'https://www.themoviedb.org/tv/194764' },
  { name: 'SquidGame',     url: 'https://www.themoviedb.org/tv/93405' },
  { name: 'Heeramandi',    url: 'https://www.themoviedb.org/tv/239452' },
  { name: 'Mirzapur',      url: 'https://www.themoviedb.org/tv/90684' },
  { name: 'Panchayat',     url: 'https://www.themoviedb.org/tv/92102' },
  { name: 'IC814',         url: 'https://www.themoviedb.org/tv/256257' },
  { name: 'OnlyMurders',   url: 'https://www.themoviedb.org/tv/107113' },
  { name: 'EmilyParis',    url: 'https://www.themoviedb.org/tv/109463' },
  { name: 'Kalki2898',     url: 'https://www.themoviedb.org/movie/1011985' },
  { name: 'Animal2023',    url: 'https://www.themoviedb.org/movie/1011985' },
  { name: '12thFail',      url: 'https://www.themoviedb.org/movie/1140499' },
  { name: 'Stree2',        url: 'https://www.themoviedb.org/movie/1202836' },
  { name: 'Pushpa2',       url: 'https://www.themoviedb.org/movie/1128088' },
  { name: 'Devara',        url: 'https://www.themoviedb.org/movie/1074674' },
  { name: '3BodyProblem',  url: 'https://www.themoviedb.org/tv/108978' },
];

(async () => {
  for (const item of items) {
    try {
      const html = await fetchUrl(item.url);
      const poster = extractPoster(html);
      console.log(item.name + ': ' + (poster || 'NOT FOUND'));
    } catch (e) {
      console.log(item.name + ': ERROR - ' + e.message);
    }
    await new Promise(r => setTimeout(r, 200)); // rate limit
  }
})();
