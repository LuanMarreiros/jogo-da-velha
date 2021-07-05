module.exports = {
  name: 'jogo-logica',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/features/jogo-logica',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
