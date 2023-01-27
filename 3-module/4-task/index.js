function showSalary(users, age) {
  const result = []
  users.forEach((user) => {
    if (user.age <= age) {
      result.push(user.name);
      result.push(user.balance);
    }
  })
  for (let i = 0; i < result.length - 1; i++) {
    if(i % 2 != 0) {
      result[i] = result[i] + '\n'
    } else {
      result[i] = result[i] + ', '
    }
  }
  return result.join('') 
}
