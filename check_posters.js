// Quick poster URL tester - checks which paths are valid 200 responses
const https = require('https');

const TMDB_BASE = 'https://image.tmdb.org/t/p/w300';

const toTest = [
  // Oppenheimer options
  { name: 'Oppenheimer_A', path: '/ptpr0kGAckfQkJeJIt8st5R8qgA.jpg' },
  { name: 'Oppenheimer_B', path: '/8Gxv8giaFQR7phFEqBKN7UI5KPm.jpg' },
  // Fall Guy options
  { name: 'FallGuy_A', path: '/tSz1qsmSJon3rtyF1go2Ew5LkDE.jpg' },
  { name: 'FallGuy_B', path: '/58syGoHzlbv4nrwBWsMsHkVMGal.jpg' },
  // Kalki
  { name: 'Kalki_A', path: '/tKnzQCVqKMCMuZ2e35HH9yGvgJj.jpg' },
  { name: 'Kalki_B', path: '/ywMpqBSzQTQ2DLaP0KmFnnkGJhT.jpg' },
  // Animal
  { name: 'Animal_A', path: '/wA9CkKiSBQGqCxRbfIFhVGopbiE.jpg' },
  { name: 'Animal_B', path: '/87b0KbNKzROFpz8QpOGAoFfhZ3i.jpg' },
  // Stree 2
  { name: 'Stree2_A', path: '/nRePrFYEpX0nEAp2c3qWBzm6fCn.jpg' },
  { name: 'Stree2_B', path: '/3jG8RNHOdXKfgFfJWP8eiVB8mSz.jpg' },
  // 12th Fail
  { name: '12thFail_A', path: '/clLvHg0HFD4HN0ifpMXMmJTT8H2.jpg' },
  { name: '12thFail_B', path: '/y5hSJGoajx0TwbFP8dOA4GVhMGT.jpg' },
  // Pushpa 2
  { name: 'Pushpa2_A', path: '/2YpFPPlQNEBgBtTRAqC3uBRkqy5.jpg' },
  { name: 'Pushpa2_B', path: '/jKiNnBM6sfhEpjvxR7GWS93TTPE.jpg' },
  // Devara
  { name: 'Devara_A', path: '/2KGxQulxNs2REUagPjCEcGJZSUf.jpg' },
  // Shogun
  { name: 'Shogun_A', path: '/jMXbBWg5SQNuWQBJKaFIFjuRoNp.jpg' },
  { name: 'Shogun_B', path: '/6B5Xd7qzj7K0mSJNEJ1gPhQOMFQ.jpg' },
  // House of Dragon
  { name: 'HOTD_A', path: '/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg' },
  // Boys
  { name: 'Boys_A', path: '/2MRvpMTMXcBj9FZBJqiulBSm5gZ.jpg' },
  // Squid Game
  { name: 'SquidGame_A', path: '/mpFjBZthJi7C1bPpHPG38lHZzHJ.jpg' },
  { name: 'SquidGame_B', path: '/dDlEmu3EZ0Pgg93X2Fe7c38GF1U.jpg' },
  // Heeramandi
  { name: 'Heeramandi_A', path: '/3D8Cme5DFIM4jliNvGkGPdxHLn6.jpg' },
  // Fallout
  { name: 'Fallout_A', path: '/9GvhICFMiRQA4ggys0Wx57UCyam.jpg' },
  // The Penguin
  { name: 'Penguin_A', path: '/fwSFqBPGDHBzvHbdPMZ8bFnVmIn.jpg' },
  // The Bear
  { name: 'Bear_A', path: '/sHFlbKS3WLqMnp9t2ghADaJGCVQ.jpg' },
  // 3 Body Problem
  { name: '3Body_A', path: '/oU7Oq2IT3hl2OySTJgJjVTKLFaP.jpg' },
];

function checkUrl(name, path) {
  return new Promise((resolve) => {
    const url = TMDB_BASE + path;
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve({ name, path, status: res.statusCode });
    });
    req.on('error', () => resolve({ name, path, status: 0 }));
    req.end();
  });
}

(async () => {
  const results = await Promise.all(toTest.map(t => checkUrl(t.name, t.path)));
  results.forEach(r => {
    const ok = r.status === 200 ? '✓' : '✗';
    console.log(`${ok} ${r.name}: ${r.status} - ${TMDB_BASE}${r.path}`);
  });
})();
