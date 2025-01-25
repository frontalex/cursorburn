window.onload = function(){
  
  var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d");
  
  var w = canvas.width = window.innerWidth * 2;
  var h = canvas.height = window.innerHeight * 2;

  var numParticles = 50,
      particles = [],
      radius = 12,
      speed = 0.1;

  function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var pos = {
    x: w/2,
    y: h/2
  };

  var colors = ["orange",'red',  "yellow"];

  // clone object pos
  var accel = JSON.parse(JSON.stringify(pos));

  document.body.addEventListener("mousemove", function(e){
    pos.x = e.clientX;
    pos.y = e.clientY;
  });

  for(var i = 0; i < numParticles; i++){
    particles.push(new generate());
  };

  function generate(){
    this.x = pos.x;
    this.y = pos.y;
    this.radius = randomize(1,6);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.vx = randomize(-2, 2);
    this.vy = randomize(5, 0);
    this.life = randomize(20, 30);
  };

  render();

  function render(){
    ctx.clearRect(0, 0, w, h);

    accel.x += (pos.x - accel.x) * 0.5;
    accel.y += (pos.y - accel.y) * 0.5;

    ctx.beginPath();
    
    ctx.fillStyle = "white";
    ctx.arc(accel.x, accel.y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.globalCompositeOperation = "xor";

    for(var j = 0; j < particles.length; j++){
      var p = particles[j];

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

}