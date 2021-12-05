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

  expect(scalesAndChords.scale('C4 lydian')).toStrictEqual([
    'C4',
    'D4',
    'E4',
    'Gb4',
    'G4',
    'A4',
    'B4',
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

test('accepts sharps', () => {
  expect(scalesAndChords.scale('C#4 major')).toStrictEqual([
    'Db4',
    'Eb4',
    'F4',
    'Gb4',
    'Ab4',
    'Bb4',
    'C5',
  ]);

  expect(scalesAndChords.chord('C#4 M')).toStrictEqual(['Db4', 'F4', 'Ab4']);
});

test('accepts lowercase note name', () => {
  expect(scalesAndChords.scale('c5 phrygian')).toStrictEqual([
    'C5',
    'Db5',
    'Eb5',
    'F5',
    'G5',
    'Ab5',
    'Bb5',
  ]);

  expect(scalesAndChords.chord('c5 maj7')).toStrictEqual([
    'C5',
    'E5',
    'G5',
    'B5',
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
  expect(scalesAndChords.chord('Db6 M')).toStrictEqual(['Db6', 'F6', 'Ab6']);
  expect(scalesAndChords.chord('Ab m')).toStrictEqual(['Ab4', 'B4', 'Eb5']); // DEFAULT_CORD
});

test('returns the notes of a chord with inline notation if available', () => {
  expect(scalesAndChords.chord('C#M')).toStrictEqual(['Db4', 'F4', 'Ab4']); // DEFAULT_CORD
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

test('returns the indices of the given scale by it s name or it s bitmap', () => {
  expect(scalesAndChords.getIndicesFromScale('phrygian')).toStrictEqual([0, 1,  3,  5, 7, 8, 10, 12]);
  expect(scalesAndChords.getIndicesFromScale('110101011010')).toStrictEqual([0, 1,  3,  5, 7, 8, 10, 12]);
});