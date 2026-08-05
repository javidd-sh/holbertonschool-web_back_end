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
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const studentLines = lines.slice(1);
      console.log(`Number of students: ${studentLines.length}`);

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
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;
