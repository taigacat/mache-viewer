module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace('.snapspec', '').replace('.ts', '') +
    '.ts' +
    snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace(snapshotExtension, '').replace('.ts', '') +
    '.snapspec.ts',
  testPathForConsistencyCheck: 'test/pages/example.snapspec.ts',
};
