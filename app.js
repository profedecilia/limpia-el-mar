
const items = document.querySelectorAll('.item');
const bin = document.getElementById('trash-bin');
const message = document.getElementById('message');
const restart = document.getElementById('restart');
const aplauso = document.getElementById('aplauso');
const pop = document.getElementById('pop');

let cleaned = 0;

function resetGame() {
  cleaned = 0;
  items.forEach(item => {
    item.style.display = 'inline';
  });
  message.style.display = 'none';
  restart.style.display = 'none';
}

items.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });

  item.addEventListener('touchstart', (e) => {
    e.dataTransfer = { getData: () => e.target.id };
  });
});

bin.addEventListener('dragover', (e) => {
  e.preventDefault();
});

bin.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const dragged = document.getElementById(id);
  if (dragged && dragged.style.display !== 'none') {
    dragged.style.display = 'none';
    cleaned++;
    pop.play();
    if (cleaned === items.length) {
      message.style.display = 'block';
      restart.style.display = 'block';
      aplauso.play();
    }
  }
});

restart.addEventListener('click', resetGame);
