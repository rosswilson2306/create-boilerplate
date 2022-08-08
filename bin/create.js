#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

const appName = process.argv[2];

if (!appName) {
  console.error('You must provide a valid name for your application.');
  process.exit(1);
}

if (fs.existsSync(appName)) {
  console.error(`The name "${appName}" already exists in your current directory. Please choose another.`);
  process.exit(1);
}

const main = () => {
  try {
    console.log('Cloning repo...');
    execSync(`git clone --depth 1 https://github.com/rosswilson2306/starter-project-boilerplate ${appName}`, 
      { stdio: 'inherit'});

    execSync('rm -rf node_modules');

    console.log('Installing dependencies...');
    execSync(`cd ${appName}`);
    execSync('npm i', { stdio: 'inherit' });

    console.log('Opening in VSCode...')
    execSync('code .');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
