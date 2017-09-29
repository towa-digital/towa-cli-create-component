/* eslint-disable no-console */
const fs = require('fs');
const chalk = require('chalk');

// use third argument from command line
const componentName = process.argv[2];

const files = [
  {
    name: 'index.js',
    content: `import './${componentName}.scss';
`
  },
  {
    name: `${componentName}.scss`,
    content: `.${componentName} {
  font-family: sans-serif;
  background-color: DeepSkyBlue;
  color: white;
  padding: 10px;
}
`
  },
  {
    name: `${componentName}.json`,
    content: `{
  "title": "Sektion: ${componentName}"
}
`
  },
  {
    name: `${componentName}.twig`,
    content: `<section class="${componentName}">{{ section.title }}</section>`
  }
];

if (fs.existsSync('./components/' + componentName)) {
  console.log('\n' + chalk.red(componentName + ' already exists.') + '\n');
  process.exit(0);
}

fs.mkdirSync('./components/' + componentName);
files.forEach(file => {
  fs.writeFileSync(`./components/${componentName}/${file.name}`, file.content);
});

console.log('\nCreated component ' + chalk.green(componentName) + ' 🙌\n');
