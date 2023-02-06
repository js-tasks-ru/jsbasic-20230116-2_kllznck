function hideSelf() {
  let btn = document.querySelector('.hide-self-button')
  let hideBtn = () => {
    btn.hidden = true;
  }
  btn.addEventListener('click', hideBtn)
}
