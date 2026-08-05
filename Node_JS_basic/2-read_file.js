const fs = require('fs');

function countStudents(path) {
  let content;
  try {
    content = fs.readFileSync(path, 'utf-8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const lines = content.split('\n').filter((line) => line.trim().length > 0);
  if (lines.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  // Extract header and student lines
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
}

module.exports = countStudents;
