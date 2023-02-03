function toggleText() {
  let btn = document.querySelector('.toggle-text-button')
  let text = document.getElementById('text')

  let hide = () => {
    if(text.hidden) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  }

  btn.addEventListener('click', hide)
}
