function hideSelf() {
  let btn = document.querySelector('.hide-self-button')
  hideBtn = () => {
    btn.hidden = true;
  }
  btn.addEventListener('click', hideBtn)
}
