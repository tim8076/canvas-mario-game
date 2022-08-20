const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const imageUrls = {
  ground: './image/ground2.png',
}

canvas.width = 1254;
canvas.height = 576;
let gravity = 0.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.width = 30;
    this.height = 30;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor({ image, x, y }) {
    this.image = image;
    this.position = {
      x,
      y,
    }
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

const player = new Player();
const image = new Image();
image.src = imageUrls.ground;

const platforms = [
  new Platform({ 
    image,
    x: 0,
    y: canvas.height - image.height,
  }),
];

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  platforms.forEach(platform => {
    if (player.position.y + player.height === platform.position.y) {
      player.velocity.y = 0
    }
    platform.draw()
  });
}

animate();

window.addEventListener('keydown', (e) => {
  let { keyCode } = e;
  switch (keyCode) {
    case 37: 
      console.log('left');
      player.velocity.x = -5;
      break;
    case 39: 
      console.log('right');
      player.velocity.x = 5;
      break;
    case 32: 
      player.velocity.y -= 20;
      break;
  }
})

window.addEventListener('keyup', (e) => {
  let { keyCode } = e;
  switch (keyCode) {
    case 37: 
      console.log('left');
      player.velocity.x = 0;
      break;
    case 39: 
      console.log('right');
      player.velocity.x = 0;
      break;
    case 32: 
      player.velocity.y = 0;
      break;
  }
})







