function makeFriendsList(element) {
  ul = document.createElement("ul");
  for (let i = 0; i < element.length; i++) {
    ul.innerHTML += `<li>${element[i].firstName} ${element[i].lastName}</li>`;
  }
  return ul;
}
