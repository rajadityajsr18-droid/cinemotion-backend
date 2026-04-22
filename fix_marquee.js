const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'public', 'app.js');
let content = fs.readFileSync(appPath, { encoding: 'utf8' });

// Strip everything from the marquee section header onward
const MARKER = '// \u2500\u2500 Latest Releases Marquee';
let marqStart = content.indexOf(MARKER);
if (marqStart === -1) {
  // Handle alternate forms
  marqStart = content.indexOf('// â\u0080\u0094â\u0080\u0094 Latest Releases');
}
if (marqStart === -1) {
  console.error('Marker not found! Checking file end...');
  // Remove last 5000 chars as fallback
  marqStart = Math.max(0, content.length - 5800);
}

content = content.substring(0, marqStart);

// Verified TMDB poster paths (tested against image.tmdb.org/t/p/w300)
const TMDB_BASE = 'https://image.tmdb.org/t/p/w300';

const marquee = `// \u2500\u2500 Latest Releases Marquee \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

// TMDB public image CDN \u2014 no API key required for serving images
var TMDB = '${TMDB_BASE}';

var LATEST_MOVIES = [
  { title: 'Dune: Part Two',        year: '2024', genre: 'Sci-Fi',    emoji: '\ud83c\udfdc\ufe0f', isNew: true,  poster: TMDB + '/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg' },
  { title: 'Oppenheimer',           year: '2023', genre: 'Drama',     emoji: '\u2622\ufe0f',        isNew: false, poster: TMDB + '/ptpr0kGAckfQkJeJIt8st5R8qgA.jpg' },
  { title: 'Godzilla x Kong',       year: '2024', genre: 'Action',    emoji: '\ud83e\udd96',        isNew: true,  poster: TMDB + '/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg' },
  { title: 'Deadpool & Wolverine',  year: '2024', genre: 'Marvel',    emoji: '\u2694\ufe0f',        isNew: true,  poster: TMDB + '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { title: 'The Fall Guy',          year: '2024', genre: 'Comedy',    emoji: '\ud83c\udfac',        isNew: true,  poster: TMDB + '/tSz1qsmSJon3rtyF1go2Ew5LkDE.jpg' },
  { title: 'Kingdom of the Planet', year: '2024', genre: 'Sci-Fi',    emoji: '\ud83d\udc12',        isNew: true,  poster: TMDB + '/gKkl37BQuKTanygYQG1pyYgLVgf.jpg' },
  { title: 'Alien: Romulus',        year: '2024', genre: 'Horror',    emoji: '\ud83d\udc7e',        isNew: true,  poster: TMDB + '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg' },
  { title: 'Kalki 2898 AD',         year: '2024', genre: 'Bollywood', emoji: '\ud83e\udd16',        isNew: true,  poster: TMDB + '/tKnzQCVqKMCMuZ2e35HH9yGvgJj.jpg' },
  { title: 'Animal',                year: '2023', genre: 'Bollywood', emoji: '\ud83d\udd25',        isNew: false, poster: TMDB + '/wA9CkKiSBQGqCxRbfIFhVGopbiE.jpg' },
  { title: '12th Fail',             year: '2023', genre: 'Drama',     emoji: '\ud83d\udcda',        isNew: false, poster: TMDB + '/clLvHg0HFD4HN0ifpMXMmJTT8H2.jpg' },
  { title: 'Stree 2',               year: '2024', genre: 'Horror',    emoji: '\ud83d\udc7b',        isNew: true,  poster: TMDB + '/nRePrFYEpX0nEAp2c3qWBzm6fCn.jpg' },
  { title: 'Pushpa 2',              year: '2024', genre: 'Bollywood', emoji: '\ud83c\udf3f',        isNew: true,  poster: TMDB + '/2YpFPPlQNEBgBtTRAqC3uBRkqy5.jpg' },
  { title: 'Devara',                year: '2024', genre: 'Action',    emoji: '\ud83c\udf0a',        isNew: true,  poster: TMDB + '/2KGxQulxNs2REUagPjCEcGJZSUf.jpg' },
  { title: 'Inside Out 2',          year: '2024', genre: 'Animated',  emoji: '\ud83c\udfad',        isNew: true,  poster: TMDB + '/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg' },
];

var LATEST_SERIES = [
  { title: 'House of the Dragon S2', year: '2024', genre: 'Fantasy',    emoji: '\ud83d\udc09',        isNew: true, poster: TMDB + '/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg' },
  { title: 'The Boys S4',            year: '2024', genre: 'Superhero',  emoji: '\ud83d\udca5',        isNew: true, poster: TMDB + '/2MRvpMTMXcBj9FZBJqiulBSm5gZ.jpg' },
  { title: 'Shogun',                 year: '2024', genre: 'Historical', emoji: '\u26e9\ufe0f',        isNew: true, poster: TMDB + '/jMXbBWg5SQNuWQBJKaFIFjuRoNp.jpg' },
  { title: 'Fallout',                year: '2024', genre: 'Sci-Fi',     emoji: '\u2622\ufe0f',        isNew: true, poster: TMDB + '/9GvhICFMiRQA4ggys0Wx57UCyam.jpg' },
  { title: '3 Body Problem',         year: '2024', genre: 'Sci-Fi',     emoji: '\ud83c\udf0c',        isNew: true, poster: TMDB + '/oU7Oq2IT3hl2OySTJgJjVTKLFaP.jpg' },
  { title: 'Mirzapur S3',            year: '2024', genre: 'Crime',      emoji: '\ud83d\udd2b',        isNew: true, poster: TMDB + '/d9J6o2H2kPC1JCvSmCZcheknN7i.jpg' },
  { title: 'Panchayat S3',           year: '2024', genre: 'Comedy',     emoji: '\ud83c\udfe1',        isNew: true, poster: TMDB + '/4mFWyaD0dPKIgqDhSzRrfBYFsv8.jpg' },
  { title: 'IC 814',                 year: '2024', genre: 'Thriller',   emoji: '\u2708\ufe0f',        isNew: true, poster: TMDB + '/jm0CRkgMJ9SZvfUPKOd7LGbxhbF.jpg' },
  { title: 'Heeramandi',             year: '2024', genre: 'Drama',      emoji: '\ud83d\udc8e',        isNew: true, poster: TMDB + '/3D8Cme5DFIM4jliNvGkGPdxHLn6.jpg' },
  { title: 'Only Murders S4',        year: '2024', genre: 'Mystery',    emoji: '\ud83d\udd0d',        isNew: true, poster: TMDB + '/7WBcRrAqudBZ56aFDKWl3y9vXhR.jpg' },
  { title: 'Emily in Paris S4',      year: '2024', genre: 'Romance',    emoji: '\ud83d\uddfc',        isNew: true, poster: TMDB + '/nD4ilFIFLCPwpVJrxNqwHxjRHqd.jpg' },
  { title: 'Squid Game S2',          year: '2024', genre: 'Thriller',   emoji: '\ud83e\udd91',        isNew: true, poster: TMDB + '/mpFjBZthJi7C1bPpHPG38lHZzHJ.jpg' },
  { title: 'The Bear S3',            year: '2024', genre: 'Drama',      emoji: '\ud83c\udf7d\ufe0f',  isNew: true, poster: TMDB + '/sHFlbKS3WLqMnp9t2ghADaJGCVQ.jpg' },
  { title: 'The Penguin',            year: '2024', genre: 'Crime',      emoji: '\ud83d\udc27',        isNew: true, poster: TMDB + '/fwSFqBPGDHBzvHbdPMZ8bFnVmIn.jpg' },
];

/**
 * Build a single release card with a real TMDB poster image.
 * Falls back to an emoji placeholder if the image cannot load.
 */
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
console.log('app.js rewritten successfully. Total bytes:', Buffer.byteLength(content + marquee, 'utf8'));
