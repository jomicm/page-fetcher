const fs = require('fs');
const request = require('request');
const readline = require('readline');

const args = process.argv.splice(2);
if (args.length !== 2) return;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[0], (err, response, body) => {
  if (err) {
    console.log('An error ocurred, probably the site is down or does not exist: ' + err);
    return;
  } else {
    if (fs.existsSync(args[1])) {
      rl.question('The path already exists, do you want to overwrite it? (y/n)', (answer) => {
        if (answer.toLowerCase() === 'y') {
          console.log('The file will be overwritten');
          saveHTML(args[1], body);
        } else if (answer.toLowerCase() === 'n') console.log("The file won't be overwritten");
        else console.log("Not a valid input this process is finishing");
        rl.close();
        return;
      });
    } else {
      saveHTML(args[1], body);
      return;
    }
  }
});

const saveHTML = (path, content) => {
  fs.writeFile(path, content, err => {
    if (err) return console.log(err);
    console.log("The file was saved!");
  });
};