/**
 * Tooling to generate simplified scale and chord map JSON files from tonal's chroma prop
 * These are to be consumed by the exported Node module
 */

const fs = require('fs');
const { Scale, Chord, ChordType } = require('@tonaljs/tonal');
const svara = require('./svara.json');
const melakarta = require('./melakarta.json');

/**
 *
 * @param {*} param0
 * @returns String
 * Generate a bit map string denoting 1 for a notes to be used and 0 for a note
 * to be skipped while traversing notes from a chromatic scale
 */
const getBitmap = ({ scale, chord }) => {
  let tonalObject;

  if (scale) tonalObject = Scale.get(`C4 ${scale}`);
  else if (chord) tonalObject = Chord.getChord(chord, 'C4');
  else throw 'No scale or chord provided';

  return tonalObject.chroma;
};

// Genarate JSON file for scaleMaps
const scaleMaps = {};
Scale.names().forEach((scale) => {
  scaleMaps[scale] = getBitmap({ scale });
});

scaleMaps['ionian'] = scaleMaps['major'];
scaleMaps['minor'] = scaleMaps['aeolian'];

// Append the melakarta ragas to scaleMaps
Object.keys(melakarta).forEach(m => {
  // console.log(m); // top level category of the ragas (for eg Indu)
  Object.keys(melakarta[m]).forEach(r => {
      // r is the actual raga (for eg Kanakangi)
      const nums = melakarta[m][r].split(' ').map(n => svara[n]);
      
      let bitmap = '';
      let pointer = 0;

      // walk over 12 semitones to derive bitmap
      for (let i = 0; i < 12; i++) {
          if (i === nums[pointer]) {
              bitmap = bitmap + '1';
              pointer++;
          } else {
              bitmap = bitmap + '0';
          }
      }

      scaleMaps[r] = bitmap;
  })
});

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
