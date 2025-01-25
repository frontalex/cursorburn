window.onload = function(){
  let isAnimating = true;  // Flag to control animation

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let w = canvas.width = window.innerWidth * 2;
  let h = canvas.height = window.innerHeight * 2;

  const numParticles = 50;
  const particles = [];
  const radius = 12;
  const speed = 0.1;

  function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  const pos = {
    x: w/2,
    y: h/2
  };

  const colors = ["orange",'red', "yellow"];

  // clone object pos
  const accel = JSON.parse(JSON.stringify(pos));

  // Store event listener reference for cleanup
  const mouseMoveHandler = function(e){
    pos.x = e.clientX;
    pos.y = e.clientY;
  };

  document.body.addEventListener("mousemove", mouseMoveHandler);

  // Handle window resize
  const resizeHandler = function() {
    w = canvas.width = window.innerWidth * 2;
    h = canvas.height = window.innerHeight * 2;
  };

  window.addEventListener('resize', resizeHandler);

  function generate(){
    this.x = pos.x;
    this.y = pos.y;
    this.radius = randomize(1,6);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.vx = randomize(-2, 2);
    this.vy = randomize(5, 0);
    this.life = randomize(20, 30);
  }

  // Initialize particles
  for(let i = 0; i < numParticles; i++){
    particles.push(new generate());
  }

  function render(){
    if (!isAnimating) return;  // Stop animation if flag is false

    ctx.clearRect(0, 0, w, h);

    accel.x += (pos.x - accel.x) * 0.5;
    accel.y += (pos.y - accel.y) * 0.5;

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(accel.x, accel.y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.globalCompositeOperation = "xor";

    for(let j = 0; j < particles.length; j++){
      const p = particles[j];

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      ctx.fill();

      p.x += p.vx;
      p.y -= p.vy;

      p.radius -= 0.075;
      p.life--;

      if(p.life < 0 || p.radius < 0){
        particles[j] = new generate();
      }
    }

    requestAnimationFrame(render);
  }

  render();

  // Cleanup function
  window.addEventListener('unload', function() {
    isAnimating = false;
    document.body.removeEventListener("mousemove", mouseMoveHandler);
    window.removeEventListener('resize', resizeHandler);
    ctx.clearRect(0, 0, w, h);
    particles.length = 0;  // Clear particles array
  });
}
