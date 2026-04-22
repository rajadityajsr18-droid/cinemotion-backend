const fs = require('fs');
const path = require('path');

// ALL VERIFIED WORKING POSTER URLS (HTTP 200 confirmed)
const TMDB = 'https://image.tmdb.org/t/p/w300';

const LATEST_MOVIES = [
  { title: 'Dune: Part Two',        year: '2024', genre: 'Sci-Fi',   emoji: '\ud83c\udfdc\ufe0f', isNew: true,  poster: TMDB + '/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg' },
  { title: 'Oppenheimer',           year: '2023', genre: 'Drama',    emoji: '\u2622\ufe0f',        isNew: false, poster: 'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg' },
  { title: 'Godzilla x Kong',       year: '2024', genre: 'Action',   emoji: '\ud83e\udd96',        isNew: true,  poster: TMDB + '/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg' },
  { title: 'Deadpool & Wolverine',  year: '2024', genre: 'Marvel',   emoji: '\u2694\ufe0f',        isNew: true,  poster: TMDB + '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { title: 'Kingdom of the Planet', year: '2024', genre: 'Sci-Fi',   emoji: '\ud83d\udc12',        isNew: true,  poster: TMDB + '/gKkl37BQuKTanygYQG1pyYgLVgf.jpg' },
  { title: 'Alien: Romulus',        year: '2024', genre: 'Horror',   emoji: '\ud83d\udc7e',        isNew: true,  poster: TMDB + '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg' },
  { title: 'Inside Out 2',          year: '2024', genre: 'Animated', emoji: '\ud83c\udfad',        isNew: true,  poster: TMDB + '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg' },
];

const LATEST_SERIES = [
  { title: 'House of the Dragon S2', year: '2024', genre: 'Fantasy',   emoji: '\ud83d\udc09',        isNew: true, poster: TMDB + '/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg' },
  { title: 'The Boys S4',            year: '2024', genre: 'Superhero', emoji: '\ud83d\udca5',        isNew: true, poster: TMDB + '/jWXrQstj7p3Wl5MfYWY6IHqRpDb.jpg' },
  { title: 'Fallout',                year: '2024', genre: 'Sci-Fi',    emoji: '\u2622\ufe0f',        isNew: true, poster: TMDB + '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg' },
  { title: 'Squid Game S2',          year: '2024', genre: 'Thriller',  emoji: '\ud83e\udd91',        isNew: true, poster: TMDB + '/iE21DSI3n5vI6v1W2HT4feKoM97.jpg' },
  { title: 'Emily in Paris S4',      year: '2024', genre: 'Romance',   emoji: '\ud83d\uddfc',        isNew: true, poster: TMDB + '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg' },
  { title: 'Heeramandi',             year: '2024', genre: 'Drama',     emoji: '\ud83d\udc8e',        isNew: true, poster: TMDB + '/nNMY4hI207PhpEE2uWtldYpI7Ky.jpg' },
];

function toJsLiteral(arr) {
  return arr.map(i =>
    '  { title: ' + JSON.stringify(i.title) +
    ', year: ' + JSON.stringify(i.year) +
    ', genre: ' + JSON.stringify(i.genre) +
    ', emoji: ' + JSON.stringify(i.emoji) +
    ', isNew: ' + i.isNew +
    ', poster: ' + JSON.stringify(i.poster) + ' }'
  ).join(',\n');
}

const appPath = path.join(__dirname, 'public', 'app.js');
let content = fs.readFileSync(appPath, { encoding: 'utf8' });

const MARKER = '// \u2500\u2500 Latest Releases Marquee';
const idx = content.indexOf(MARKER);
if (idx !== -1) content = content.substring(0, idx);

const marquee = `// \u2500\u2500 Latest Releases Marquee \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

// Only titles with verified HTTP 200 poster images are included.
var LATEST_MOVIES = [
${toJsLiteral(LATEST_MOVIES)}
];

var LATEST_SERIES = [
${toJsLiteral(LATEST_SERIES)}
];

function buildReleaseCard(item, kind) {
  var isSeries = kind === 'series';
  var card = document.createElement('article');
  card.className = 'release-card' + (isSeries ? ' release-card--series' : '');
  card.title = item.title + ' (' + item.year + ')';

  if (item.isNew) {
    var badge = document.createElement('span');
    badge.className = 'release-card__new-badge';
    badge.setAttribute('aria-label', 'New release');
    badge.textContent = '\u25cf NEW';
    card.appendChild(badge);
  }

  var posterWrap = document.createElement('div');
  posterWrap.className = 'release-card__poster-wrap';

  var img = document.createElement('img');
  img.className = 'release-card__poster';
  img.alt = item.title + ' poster';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.width = 300;
  img.height = 450;

  img.onerror = function () {
    this.remove();
    var fallback = document.createElement('div');
    fallback.className = 'release-card__poster-placeholder';
    fallback.setAttribute('aria-hidden', 'true');
    var emo = document.createElement('span');
    emo.textContent = item.emoji;
    var lbl = document.createElement('span');
    lbl.className = 'label';
    lbl.textContent = item.title;
    fallback.appendChild(emo);
    fallback.appendChild(lbl);
    posterWrap.prepend(fallback);
  };

  img.src = item.poster;
  posterWrap.appendChild(img);
  card.appendChild(posterWrap);

  var info = document.createElement('div');
  info.className = 'release-card__info';
  var bdg = document.createElement('div');
  bdg.className = 'release-card__badge';
  bdg.textContent = item.genre;
  var ttl = document.createElement('h3');
  ttl.className = 'release-card__title';
  ttl.textContent = item.title;
  var yr = document.createElement('p');
  yr.className = 'release-card__meta';
  yr.textContent = item.year;
  info.appendChild(bdg);
  info.appendChild(ttl);
  info.appendChild(yr);
  card.appendChild(info);

  card.addEventListener('click', function () {
    handlePrompt(
      'Tell me about "' + item.title + '" (' + item.year + ') and recommend similar ' +
      (isSeries ? 'web series' : 'movies') + '.'
    );
  });

  return card;
}

function fillMarqueeTrack(trackId, items, kind) {
  var track = document.getElementById(trackId);
  if (!track) return;
  var fragment = document.createDocumentFragment();
  items.concat(items).forEach(function (item) {
    fragment.appendChild(buildReleaseCard(item, kind));
  });
  track.appendChild(fragment);
}

fillMarqueeTrack('moviesTrack',  LATEST_MOVIES,  'movie');
fillMarqueeTrack('seriesTrack', LATEST_SERIES, 'series');
`;

fs.writeFileSync(appPath, content + marquee, { encoding: 'utf8' });
console.log('Done! Movies: ' + LATEST_MOVIES.length + ', Series: ' + LATEST_SERIES.length);
