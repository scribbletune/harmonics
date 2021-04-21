const scaleMaps = require('../gen/scaleMaps.json');
const chordMaps = require('../gen/chordMaps.json');

const getChromatic = (root, octave) => {
  const o1 = [
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
  ].map((n) => n + octave);
  const o2 = [
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
  ].map((n) => n + (octave + 1));

  const c = o1.concat(o2);
  return c.slice(c.indexOf(root + octave));
};

const _getNotesForScaleOrChord = ({ scale, chord }) => {
  const rootOctaveScale = scale || chord;
  const NOTES_TYPE = scale ? 'scale' : 'chord';
  if (typeof rootOctaveScale !== 'string') {
    throw `${rootOctaveScale} is not a valid input for ${NOTES_TYPE}`;
  }
  const indexOfFirstSpace = rootOctaveScale.indexOf(' ');
  const scaleOrChord = rootOctaveScale.slice(indexOfFirstSpace + 1);
  const rootOctave = rootOctaveScale.slice(0, indexOfFirstSpace);
  const root = rootOctave.replace(/\d/g, '');
  const octave = +rootOctave.replace(/\D/g, '');

  if (isNaN(octave)) {
    throw `${rootOctave[0]} does not have a valid octave`;
  }

  if (!scaleMaps[scaleOrChord] && !chordMaps[scaleOrChord]) {
    throw `${rootOctaveScale} is not a valid ${NOTES_TYPE}`;
  }
  const chroma = getChromatic(root, octave);
  const acc = [];
  let p1 = 0,
    p2 = 0;

  const map = scale ? scaleMaps : chordMaps;

  while (p1 < map[scaleOrChord].length) {
    if (map[scaleOrChord][p1] === '1') {
      acc.push(chroma[p2]);
    }
    p1++;
    p2++;
  }

  return acc;
};

export const chords = () => Object.keys(chordMaps);
export const scales = () => Object.keys(scaleMaps);
export const chord = (chord) => _getNotesForScaleOrChord({ chord });
export const scale = (scale) => _getNotesForScaleOrChord({ scale });
