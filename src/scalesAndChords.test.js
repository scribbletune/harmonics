const scalesAndChords = require('./scalesAndChords');

test('returns a list of available scales', () => {
  expect(Array.isArray(scalesAndChords.scales())).toBe(true);
});

test('returns a list of available chords', () => {
  expect(Array.isArray(scalesAndChords.chords())).toBe(true);
});

test('returns the notes of a scale if available', () => {
  expect(scalesAndChords.scale('C4 major')).toStrictEqual([
    'C4',
    'D4',
    'E4',
    'F4',
    'G4',
    'A4',
    'B4',
  ]);

  expect(scalesAndChords.scale('C4 minor')).toStrictEqual([
    'C4',
    'D4',
    'Eb4',
    'F4',
    'G4',
    'Ab4',
    'Bb4',
  ]);

  expect(scalesAndChords.scale('C5 minor')).toStrictEqual([
    'C5',
    'D5',
    'Eb5',
    'F5',
    'G5',
    'Ab5',
    'Bb5',
  ]);

  expect(scalesAndChords.scale('C5 phrygian dominant')).toStrictEqual([
    'C5',
    'Db5',
    'E5',
    'F5',
    'G5',
    'Ab5',
    'Bb5',
  ]);

  expect(scalesAndChords.scale('C5 phrygian')).toStrictEqual([
    'C5',
    'Db5',
    'Eb5',
    'F5',
    'G5',
    'Ab5',
    'Bb5',
  ]);
});

test('returns the notes of a chord if available', () => {
  expect(scalesAndChords.chord('C4 M')).toStrictEqual(['C4', 'E4', 'G4']);
  expect(scalesAndChords.chord('C5 M')).toStrictEqual(['C5', 'E5', 'G5']);
  expect(scalesAndChords.chord('C5 maj7')).toStrictEqual([
    'C5',
    'E5',
    'G5',
    'B5',
  ]);
});

test('returns the notes for an inline chord if available', () => {
  expect(scalesAndChords.inlineChord('CM')).toStrictEqual(['C4', 'E4', 'G4']);
  expect(scalesAndChords.inlineChord('CM_5')).toStrictEqual(['C5', 'E5', 'G5']);
  expect(scalesAndChords.inlineChord('Cmaj7_5')).toStrictEqual([
    'C5',
    'E5',
    'G5',
    'B5',
  ]);
});
