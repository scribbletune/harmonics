import scaleMaps from './gen/scaleMaps.json';
import chordMaps from './gen/chordMaps.json';

const DEFAULT_OCTAVE = 4;

const sharpToFlatMap: Record<string, string> = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
  'CB': 'B',
  'FB': 'E',
  'E#': 'F',
  'B#': 'C',
};

function sharpToFlat(root: string): string {
  return sharpToFlatMap[root.toUpperCase()] || (root.charAt(0).toUpperCase() + root.slice(1));
}

const CHROMATIC: string[] = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

function getChromatic(root: string, octave: number): string[] {
  const index = CHROMATIC.indexOf(root);
  if (index === -1) {
    throw new Error(`${root} is not a valid root note`);
  }
  const o1 = CHROMATIC.map((n) => n + octave);
  const o2 = CHROMATIC.map((n) => n + (octave + 1));

  const c = o1.concat(o2);
  return c.slice(index);
}

interface ScaleOrChordOptions {
  scale?: string;
  chord?: string;
}

const scaleMap = scaleMaps as Record<string, string>;
const chordMap = chordMaps as Record<string, string>;

function _getNotesForScaleOrChord({ scale, chord }: ScaleOrChordOptions): string[] {
  const input = scale || chord;
  const SCALE_OR_CHORD = scale ? 'scale' : 'chord';
  if (typeof input !== 'string') {
    throw new Error(`${input} is not a valid input for ${SCALE_OR_CHORD}`);
  }
  const rootOctaveScale = input.trim();
  const indexOfFirstSpace = rootOctaveScale.indexOf(' ');
  let scaleOrChord: string;
  let rootOctave: string;
  if (indexOfFirstSpace === -1) {
    scaleOrChord = rootOctaveScale.slice(1);
    rootOctave = rootOctaveScale[0];

    if (rootOctaveScale[1] === 'b' || rootOctaveScale[1] === '#') {
      scaleOrChord = rootOctaveScale.slice(2);
      rootOctave += rootOctaveScale[1];
    }
  } else {
    scaleOrChord = rootOctaveScale.slice(indexOfFirstSpace === -1 ? 1 : indexOfFirstSpace + 1);
    rootOctave = rootOctaveScale.slice(0, indexOfFirstSpace);
  }
  const root = sharpToFlat(rootOctave.replace(/\d/g, ''));
  const octaveNumber = rootOctave.replace(/\D/g, '');
  const octave = octaveNumber !== '' ? +rootOctave.replace(/\D/g, '') : DEFAULT_OCTAVE;

  if (isNaN(octave)) {
    throw new Error(`${rootOctave[0]} does not have a valid octave`);
  }

  if (!scaleMap[scaleOrChord] && !chordMap[scaleOrChord]) {
    throw new Error(`${rootOctaveScale} is not a valid ${SCALE_OR_CHORD}`);
  }
  const chroma = getChromatic(root, octave);
  const acc: string[] = [];
  let p1 = 0,
    p2 = 0;

  const map = scale ? scaleMap : chordMap;

  while (p1 < map[scaleOrChord].length) {
    if (map[scaleOrChord][p1] === '1') {
      acc.push(chroma[p2]);
    }
    p1++;
    p2++;
  }

  return acc;
}

/**
 *
 * @param {String} rootChord_Oct e.g. CM or CM_5 Fmaj7 or Dbb9sus or Db9sus
 * @returns Array
 * Take an inline chord such as CM or Csus4_3 and return an array of it's notes
 * Used in Scribbletune to allow adding chords inline with notes
 */
export function inlineChord(rootChord_Oct: string): string[] {
  // only b9sus is a chord that starts with a `b` which can be confused with a flat
  // hence isolate it explicitly
  const B9SUS = 'b9sus';
  let root: string,
    chord: string,
    octave: number = DEFAULT_OCTAVE;
  if (rootChord_Oct.includes(B9SUS)) {
    chord = B9SUS;
    root = rootChord_Oct.slice(0, rootChord_Oct.indexOf(B9SUS));
  } else {
    root = rootChord_Oct[0];
    chord = rootChord_Oct.slice(1);
    if (rootChord_Oct[1] === 'b' || rootChord_Oct[1] === '#') {
      root += rootChord_Oct[1];
      chord = rootChord_Oct.slice(2);
    }
  }

  if (rootChord_Oct.includes('_')) {
    octave = +rootChord_Oct.split('_')[1];
    // since chord was originally set by simply removing the root
    // it can still have a _ and the octave dangling in case of an inlineChord
    chord = chord.slice(0, chord.indexOf('_'));
  }

  return _getNotesForScaleOrChord({ chord: root + octave + ' ' + chord });
}

export function chords(): string[] {
  return Object.keys(chordMap);
}

export function scales(): string[] {
  return Object.keys(scaleMap);
}

export function chord(chord: string): string[] {
  return _getNotesForScaleOrChord({ chord });
}

export function scale(scale: string): string[] {
  return _getNotesForScaleOrChord({ scale });
}

/**
 *
 * @param {String} scaleOrBitmap e.g '110010110011' or 'phrygian'
 * @returns {Array} e.g. [0, 1,  3,  5, 7, 8, 10, 12]
 */
export function getIndicesFromScale(scaleOrBitmap: string): number[] {
  const str = scaleMap[scaleOrBitmap] || scaleOrBitmap;
  const intervals: number[] = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '1') {
      intervals.push(i);
    }
  }

  intervals.push(12); // Add the next octave
  return intervals;
}
