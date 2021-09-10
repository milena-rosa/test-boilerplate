const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.')
  console.log('For example :')
  console.log('npx create-my-boilerplate my-app')
  process.exit(1)
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const git_repo = 'https://github.com/milena-rosa/test-boilerplate.git' // git url

try {
  fs.mkdirSync(projectPath)
} catch (error) {
  if (error.code === 'EEXIST') {
    console.log(`The path ${projectName} already exists. Please, give it another name.`);
  } else {
    console.log(error)
  }
  process.exit(1)
}

(() => {
  try {
    console.log('Downloading files...')
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`)

    console.log('Installing dependencies...')
    execSync('npm install')

    console.log('Removing useless files...')
    execSync('npx rimraf ./.git')
    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true })

    console.log('The installation is done, this is ready to use!');
  } catch (error) {
    console.log(error)
  }
})()