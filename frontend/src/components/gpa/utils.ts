export const getGradeFromPoints = (points: number): { grade: string; gradePoints: number } => {
  if (points >= 90) return { grade: "A+", gradePoints: 4.0 };
  if (points >= 85) return { grade: "A", gradePoints: 4.0 };
  if (points >= 80) return { grade: "A-", gradePoints: 3.7 };
  if (points >= 75) return { grade: "B+", gradePoints: 3.3 };
  if (points >= 70) return { grade: "B", gradePoints: 3.0 };
  if (points >= 65) return { grade: "B-", gradePoints: 2.7 };
  if (points >= 60) return { grade: "C+", gradePoints: 2.3 };
  if (points >= 50) return { grade: "C", gradePoints: 2.0 };
  if (points >= 45) return { grade: "C-", gradePoints: 1.7 };
  if (points >= 40) return { grade: "D", gradePoints: 1.0 };
  return { grade: "F", gradePoints: 0.0 };
};

export const getGradeColor = (gpa: number) => {
  if (gpa >= 3.7) return "from-emerald-500 to-green-600";
  if (gpa >= 3.3) return "from-blue-500 to-cyan-600";
  if (gpa >= 3.0) return "from-yellow-500 to-orange-500";
  if (gpa >= 2.0) return "from-orange-500 to-red-500";
  return "from-red-500 to-red-700";
};

export const getGradeLabel = (gpa: number) => {
  if (gpa >= 3.7) return "Excellent";
  if (gpa >= 3.3) return "Very Good";
  if (gpa >= 3.0) return "Good";
  if (gpa >= 2.0) return "Satisfactory";
  return "Needs Improvement";
};

export const getPointsColor = (points: number) => {
  if (points >= 85) return "text-emerald-600 dark:text-emerald-400";
  if (points >= 75) return "text-blue-600 dark:text-blue-400";
  if (points >= 60) return "text-yellow-600 dark:text-yellow-400";
  if (points >= 50) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};
