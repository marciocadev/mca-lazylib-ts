import { typescript } from 'projen';
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'mca-lazylib-ts',
  projenrcTs: true,
  repository: 'https://github.com/marciocadev/mca-lazylib-ts.git',

  release: true,
  tsconfig: {
    compilerOptions: {
      lib: ['dom', 'es2019'],
    },
  },

  bin: {
    'mca-lazylib-ts': 'index.js',
  },

  releaseToNpm: true,

  deps: ['projen'],

  bundledDeps: [
    'conventional-changelog-config-spec',
    'yaml',
    'fs-extra',
    'yargs',
    'case',
    'glob@^7',
    'semver',
    'chalk',
    '@iarna/toml',
    'xmlbuilder2',
    'ini',
    'shx',
  ],

  devDeps: [
    '@types/conventional-changelog-config-spec',
    '@types/fs-extra@^8',
    '@types/yargs',
    '@types/glob',
    '@types/semver',
    '@types/ini',
    'markmac',
    'all-contributors-cli',
  ],
});
// list all globally installed node.js modules
// npm ls -g --depth=0
project.synth();