export default function updateStudentGradeByCity(students, city, newGrades) {
  if (!Array.isArray(students)) {
    return [];
  }

  return students
    .filter((student) => student.location === city)
    .map((student) => {
      const studentGrade = newGrades.find(
        (gradeObj) => gradeObj.studentId === student.id,
      );

      return {
        ...student,
        grade: studentGrade ? studentGrade.grade : 'N/A',
      };
    });
}
