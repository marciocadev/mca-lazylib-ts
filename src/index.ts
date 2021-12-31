// import boxen, { Options } from 'boxen';
// import chalk from 'chalk';
import { cdk, FileBase, SourceCode } from 'projen';
import * as yargs from 'yargs';
// import { help } from 'yargs';
// import { hideBin } from 'yargs/helpers';

const project = new cdk.JsiiProject({
  author: 'Marcio Cruz de Almeida',
  authorAddress: 'marciocadev@gmail.com',
  defaultReleaseBranch: 'main',
  name: 'mca-lazylib',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/marciocadev/mca-lazylib.git',
});

interface EntityType {
  key: string; type: string;
}

interface EntityProps {
  readonly sortKey?: EntityType;
  readonly fields?: Array<EntityType>;
}

function createSchema(name: string, partitionKey: EntityType, props?: EntityProps) {
  const basename = name.toLowerCase();
  const model = ts(`./${basename}/model.ts`);
  model.open(`export interface ${name} {`);
  model.line('/**');
  model.line(`* **_${partitionKey.key}_** field is the **partition key**`);
  model.line('*');
  model.line('* @attribute');
  model.line('*/');
  model.line(`readonly ${partitionKey.key}: string; // key`);
  if (props && props.sortKey) {
    model.line('/**');
    model.line(`* **_${props.sortKey.key}_** field is the **sort key**`);
    model.line('*');
    model.line('* @attribute');
    model.line('*/');
    model.line(`readonly ${props.sortKey.key}: ${props.sortKey.type}; // sort key`);
  }
  if (props && props.fields) {
    for (const field of props.fields) {
      model.line('/**');
      model.line('*');
      model.line('* @attribute');
      model.line('*/');
      model.line(`readonly ${field.key}?: ${field.type};`);
    }
  };
  model.close('};');
}

function ts(path: string) : SourceCode {
  const src = new SourceCode(project, path);
  src.line(`// ${FileBase.PROJEN_MARKER}`);
  return src;
}

function entity(name: string, partitionKey: EntityType, props?: EntityProps) {
  // Create Schema
  createSchema(name, partitionKey, props);
  // Create Table Construct
  // createTableConstruct(name, partitionKey, props);
  // Create client
  // createClient(name, partitionKey, props);
}

async function main() {
  const ya = yargs;
  ya.recommendCommands();
  ya.strictCommands();
  ya.showHelpOnFail(false);
  ya.wrap(yargs.terminalWidth());
  ya.option('name', { type: 'string', default: true, desc: 'Name of the model' });
  ya.completion();
  ya.help();

  ya.version(false);
  ya.option('version', { type: 'boolean', description: 'Show version number', global: false });

  const args = await ya.argv;
  entity(args.name as string, { key: 'username', type: 'string' });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
