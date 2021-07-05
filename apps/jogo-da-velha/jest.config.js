module.exports = {
  name: 'jogo-da-velha',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/jogo-da-velha',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
