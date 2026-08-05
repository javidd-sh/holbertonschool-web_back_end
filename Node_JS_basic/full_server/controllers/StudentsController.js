import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const dbFile = process.argv[2];

    readDatabase(dbFile)
      .then((fields) => {
        const outputLines = ['This is the list of our students'];

        // Sort fields alphabetically (case-insensitive)
        const sortedFields = Object.keys(fields).sort((a, b) => (
          a.toLowerCase().localeCompare(b.toLowerCase())
        ));

        sortedFields.forEach((field) => {
          const students = fields[field];
          outputLines.push(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
        });

        return response.status(200).send(outputLines.join('\n'));
      })
      .catch(() => {
        return response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    const dbFile = process.argv[2];

    readDatabase(dbFile)
      .then((fields) => {
        const students = fields[major] || [];
        return response.status(200).send(`List: ${students.join(', ')}`);
      })
      .catch(() => {
        return response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
