/**
 * Tooling to generate simplified scale and chord map JSON files from tonal
 * These are to be consumed by the exported Node module
 */

const fs = require('fs');
const { Scale, Chord, ChordType } = require('@tonaljs/tonal');

/**
 *
 * @param {*} param0
 * @returns String
 * Generate a bit map string denoting 1 for a notes to be used and 0 for a note
 * to be skipped while traversing notes from a chromatic scale
 */
const getBitmap = ({ scale, chord }) => {
  const chromatic = Scale.get('C4 chromatic').notes.concat(
    Scale.get('C5 chromatic')
  );
  let mode;

  if (scale) mode = Scale.get(`C4 ${scale}`).notes;
  else if (chord) mode = Chord.getChord(chord, 'C4').notes;
  else throw 'No scale or chord provided';

  let i = 0,
    j = 0;
  let bitmap = '';

  while (i < chromatic.length) {
    if (chromatic[i] === mode[j]) {
      bitmap += '1';
      j++;
    } else {
      bitmap += '0';
    }
    i++;
  }

  return bitmap;
};

// Genarate JSON file for scaleMaps
const scaleMaps = {};
Scale.names().forEach((scale) => {
  scaleMaps[scale] = getBitmap({ scale });
});

scaleMaps['ionian'] = scaleMaps['major'];
scaleMaps['minor'] = scaleMaps['aeolian'];

fs.writeFile('./gen/scaleMaps.json', JSON.stringify(scaleMaps), function (err) {
  if (err) return console.log(err);
  console.log('Generated scaleMaps.json');
});

// Genarate JSON file for chordMaps
const numChords = ['4', '5', '6', '7', '9', '11', '13'];
const chordMaps = {};
ChordType.symbols().forEach((chord) => {
  let chordName = chord;
  if (numChords.includes(chord)) {
    chordName += 'th';
  }
  chordMaps[chordName] = getBitmap({ chord });
});

fs.writeFile('./gen/chordMaps.json', JSON.stringify(chordMaps), function (err) {
  if (err) return console.log(err);
  console.log('Generated chordMaps.json');
});
