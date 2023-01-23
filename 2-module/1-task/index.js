function sumSalary(salaries) {
  let result = 0;
  for (let key in salaries) {
    if (
      typeof salaries[key] == "number" &&
      !isNaN(salaries[key]) &&
      isFinite(salaries[key]) // не могу никак додуматься как убрать все эти проверки
    ) {
      result += salaries[key];
    }
  }
  return result;
}
