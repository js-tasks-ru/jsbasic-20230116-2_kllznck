function highlight(table) {
  let tr = table.querySelectorAll('tr');
      
  let classes = {
    m: 'male',
    f: 'female',
    true: 'available',
    false: 'unavailable'
  };

  for( let i = 1; i < tr.length; i++) {
    let status = tr[i].children[3];
    let gender = tr[i].children[2];
    let age = tr[i].children[1];

    if(status.dataset.available){
      let availability = status.getAttribute('data-available');
      status.parentNode.classList.add(classes[availability]);
    } else {
      status.parentNode.hidden = true;
    };

    gender.parentNode.classList.add(classes[gender.innerHTML]);

    if(age.innerHTML < '18')  {
      age.parentNode.style.textDecoration = 'line-through';
    };
  }
}
