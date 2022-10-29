module.exports = plop => {
  plop.setGenerator('day', {
    description: 'Create a new day file',
    prompts: [
      {
        type: 'input',
        name: 'puzzleDate',
        message: 'Puzzle date (eg. 202001)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/solutions/{{puzzleDate}}.ts',
        templateFile: '.plop-templates/solution.hbs',
      },
      {
        type: 'add',
        path: 'src/solutions/{{puzzleDate}}.test.ts',
        templateFile: '.plop-templates/test.hbs',
      },
      {
        type: 'modify',
        path: 'src/solutions/index.ts',
        pattern: /(.*Imports Here.*)/gi,
        template: "import { Puzzle{{puzzleDate}} } from './{{puzzleDate}}';\n$1",
      },
      {
        type: 'modify',
        path: 'src/solutions/index.ts',
        pattern: /(.*Maps Here.*)/gi,
        template: '  {{puzzleDate}}: (input) => new Puzzle{{puzzleDate}}(input),\n$1',
      },
      {
        type: 'add',
        path: 'inputs/{{puzzleDate}}.txt',
      },
    ],
  });
};
