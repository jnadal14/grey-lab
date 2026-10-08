// Every image the site uses: a short key → its master in _source/.
// optimize-images.mjs builds web copies for these keys only, and components
// refer to images by key (see lib/media.ts). Gallery categories live in
// content/gallery.ts; this file only says which files are published.

const gl = id => ({ prefix: `gl--${id}`, credit: 'Greylab Productions' })
const ji = id => ({ prefix: `ji--jacksoniseli.com--${id}`, credit: 'Jackson Iseli' })

export const BRAND = {
  logo: gl('0e8d12f0'),
  icon: { ...gl('16434306'), knockout: true }, // white on opaque black in the source
  hat: gl('1609b983'),
}

export const POSTERS = {
  'poster-homecoming': gl('79dc57c0'),
  'poster-crashtest': gl('76ecdcc4'),
  'poster-summerfest': gl('ae5c68b4'),
}

export const PHOTOS = {
  // Page imagery
  'hero': gl('1754c04a'),            // wide Hollywood Theatre crowd, purple stage
  'hero-bw': gl('0e600a7f'),         // the current greylab.ca hero
  'crowdsurf': gl('b21ac09a'),
  'pit': gl('3fca5dad'),
  'about-1': gl('60ad1a97'),
  'about-2': gl('5446635a'),
  'about-3': gl('74dd0efa'),
  'involved': gl('5a81d2b9'),
  // Service images, exactly as on greylab.ca/work-with-us
  'svc-showrunning': gl('b9a49af2'),
  'svc-media': gl('5e45080f'),
  'svc-backline': gl('5cf8f2d3'),
  'svc-management': gl('a76f3a25'),
  // Concert (Greylab)
  'c-gl-01': gl('04781307'), 'c-gl-02': gl('11e94980'), 'c-gl-03': gl('13206fee'),
  'c-gl-04': gl('174ad8dc'), 'c-gl-05': gl('227ec825'), 'c-gl-06': gl('2c9242cb'),
  'c-gl-07': gl('4bfbcd46'), 'c-gl-08': gl('70bef108'), 'c-gl-09': gl('78f271a7'),
  'c-gl-10': gl('7afdf197'), 'c-gl-11': gl('7c513ecf'), 'c-gl-12': gl('af49d794'),
  'c-gl-13': gl('b0f83473'), 'c-gl-14': gl('b890658b'), 'c-gl-15': gl('c0de410b'),
  // Concert (Jackson)
  'c-ji-01': ji('00ba893a'), 'c-ji-02': ji('013e9962'), 'c-ji-03': ji('01b55ffc'),
  'c-ji-04': ji('0e414bf1'), 'c-ji-05': ji('1024e274'), 'c-ji-06': ji('1192f2a5'),
  'c-ji-07': ji('1befdbd5'), 'c-ji-08': ji('20d24124'), 'c-ji-09': ji('2aa2287d'),
  'c-ji-10': ji('340c8979'), 'c-ji-11': ji('343bdff1'), 'c-ji-12': ji('4282b3f7'),
  'c-ji-13': ji('4789a7fa'), 'c-ji-14': ji('5274bd2e'), 'c-ji-15': ji('61f1ae77'),
  'c-ji-16': ji('624bb01d'), 'c-ji-17': ji('62a217c4'), 'c-ji-18': ji('694f636a'),
  'c-ji-19': ji('7109cdb4'), 'c-ji-20': ji('73ed8770'), 'c-ji-21': ji('78d5d84f'),
  'c-ji-22': ji('81e1d823'), 'c-ji-23': ji('8c287fc5'), 'c-ji-24': ji('92c44a15'),
  'c-ji-25': ji('92dc137e'), 'c-ji-26': ji('9b54b3a2'), 'c-ji-27': ji('c05277ed'),
  'c-ji-28': ji('c66ee487'), 'c-ji-29': ji('c7bb242f'), 'c-ji-30': ji('d390d06b'),
  'c-ji-31': ji('e032d179'), 'c-ji-32': ji('fbb71ec4'), 'c-ji-33': ji('a07c5d25'),
  'c-ji-34': ji('cf5d8645'), 'c-ji-35': ji('74b2ec01'), 'c-ji-36': ji('4e74ce82'),
  'c-ji-37': ji('b7402369'),
  // Concert (Jackson, from the Dirty Aesthetic repo)
  'c-da-02': { prefix: 'da--jackson-iseli--02', credit: 'Jackson Iseli' },
  'c-da-03': { prefix: 'da--jackson-iseli--03', credit: 'Jackson Iseli' },
  'c-da-05': { prefix: 'da--jackson-iseli--05', credit: 'Jackson Iseli' },
  'c-da-08': { prefix: 'da--jackson-iseli--08', credit: 'Jackson Iseli' },
  // Shoots
  's-gl-01': gl('6ee723b9'), 's-gl-02': gl('74c7f1bc'), 's-gl-03': gl('9642b204'),
  's-gl-04': gl('9bf06ae5'), 's-gl-05': gl('d064fb5b'),
  's-ji-01': ji('128139a3'), 's-ji-02': ji('14243c3b'), 's-ji-03': ji('17746ba3'),
  's-ji-04': ji('3581336f'), 's-ji-05': ji('37fdc142'), 's-ji-06': ji('3bc4832f'),
  's-ji-07': ji('a139045d'), 's-ji-08': ji('acd1e893'), 's-ji-09': ji('b13a0d36'),
  's-ji-10': ji('c09202ae'), 's-ji-11': ji('c39e47d8'), 's-ji-12': ji('d383f0b1'),
  's-ji-13': ji('d8eaaba3'), 's-ji-14': ji('e9c7aa2a'),
}
