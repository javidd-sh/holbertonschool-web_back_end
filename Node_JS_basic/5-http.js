const http = require('http');
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

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const dbFile = process.argv[2];
    const responseText = 'This is the list of our students\n';

    countStudents(dbFile)
      .then((data) => {
        res.end(`${responseText}${data}`);
      })
      .catch((err) => {
        res.end(`${responseText}${err.message}`);
      });
  } else {
    res.end('Hello Holberton School!');
  }
});

app.listen(1245);

module.exports = app;
