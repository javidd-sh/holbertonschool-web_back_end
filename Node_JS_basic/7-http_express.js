const express = require('express');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim().length > 0);
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const studentLines = lines.slice(1);
      let output = `Number of students: ${studentLines.length}`;

      const fields = {};

      studentLines.forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (firstname && field) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
        }
      });

      for (const [field, students] of Object.entries(fields)) {
        output += `\nNumber of students in ${field}: ${students.length}. List: ${students.join(', ')}`;
      }

      resolve(output);
    });
  });
}

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const dbFile = process.argv[2];
  const responseText = 'This is the list of our students\n';

  countStudents(dbFile)
    .then((data) => {
      res.send(`${responseText}${data}`);
    })
    .catch((err) => {
      res.send(`${responseText}${err.message}`);
    });
});

app.listen(port);

module.exports = app;
