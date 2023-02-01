function makeDiagonalRed(table) {
  let td = table.querySelectorAll('td')
  for(let i = 0; i < td.length; i++){
    if(i % 6 === 0) {
      td[i].style.backgroundColor = 'red'
    }
  }
}
