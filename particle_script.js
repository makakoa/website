// Particle code from Jason Dicks with edits
//http://codepen.io/jsndks/pen/ogWdxe

// ///////////////////////////////////////////////////////////
// Particle
// ///////////////////////////////////////////////////////////
var Particle = function(stageConfig, particleConfig) {
  this.stageConfig = stageConfig;
  this.particleConfig = particleConfig;
};

var pProto = Particle.prototype;
var lastX;
var lastY;
pProto.draw = function() {
  this.stageConfig.context.strokeStyle = '#f4f4ff';
  this.stageConfig.context.fillStyle = "#a3a3cc";
  if (Math.random() > 0.995) {
    this.stageConfig.context.strokeStyle = '#7e7eff';
    this.stageConfig.context.fillStyle = "#FF9900";
    this.particleConfig.modR *= 1.8;
  }

  //lines
  //  this.stageConfig.context.moveTo(this.stageConfig.centerX, this.stageConfig.centerY); //for apex
  this.stageConfig.context.lineTo(this.particleConfig.x, this.particleConfig.y);
  this.stageConfig.context.lineTo(lastX, lastY); //for linked network
  this.stageConfig.context.stroke();

  //circle
  this.stageConfig.context.beginPath();
  this.stageConfig.context.arc(lastX, lastY, this.particleConfig.modR, 0, Math.PI * 2, false);
  this.stageConfig.context.fill();

  lastX = this.particleConfig.x;
  lastY = this.particleConfig.y;

};

// ///////////////////////////////////////////////////////////
// ParticlesView
// ///////////////////////////////////////////////////////////
var ParticlesView = function() {
  this.init();
};

var proto = ParticlesView.prototype;

proto.init = function() {
  this
    .setupHandlers()
    .layout()
    .createParticles()
    .render();
};

proto.setupHandlers = function() {
  this.renderHandler = this.render.bind(this);

  return this;
};

proto.layout = function() {
  var stage = document.createElement('canvas');
  stage.width = window.innerWidth;
  stage.height = window.innerHeight;
  var context = stage.getContext('2d');
  var centerX = stage.width / 2;
  lastX = centerX;
  var centerY = stage.height / 2;
  lastY = centerY;
  var start = Date.now();

  this.stageConfig = {
    stage: stage,
    context: context,
    centerX: centerX,
    centerY: centerY,
    start: start
  };

  document.body.appendChild(this.stageConfig.stage);
  this.particleStore = [];

  return this;
};

proto.createParticles = function() {
  var i = 0;
  var l = 75; //count
  for(; i < l; i++) {
    this.particleStore.push({
      x: 0,
      y: 0,
      r: Math.random() * 5,
      modR: 1,
      angleX: Math.random() * 360,
      angleY: Math.random() * 360,
      angle: Math.random() * 360,
      speedX: (Math.random() * 0.01) - (0.05 / 2),
      speedY: (Math.random() * 0.01) - (0.01 / 2),
      radX: Math.random() * this.stageConfig.centerX/2,
      radY: Math.random() * this.stageConfig.centerY
    });
  }

  return this;
};

proto.render = function() {
  this.update();
  this.draw();
  window.requestAnimationFrame(this.renderHandler);
};

proto.update = function() {
  var i = 0;
  var l = this.particleStore.length;
  var time = Date.now() - this.stageConfig.start;
  var yProportion = 0.01;
  var xProportion = 0.01;
  if (time < 3000) {
    yProportion = time / 3000; // vertical expansion
    xProportion = time / 3000; // horizontal expansion
  } else {
    yProportion = 1;
    xProportion = 1;
  }
  for(; i < l; i++) {
    this.particleStore[i].x = this.stageConfig.centerX + Math.cos(this.particleStore[i].angleX) * this.particleStore[i].radX * xProportion;
    this.particleStore[i].modR = this.particleStore[i].r
      + this.particleStore[i].r
      * Math.sin(this.particleStore[i].angleX)
      * (this.particleStore[i].radX * 1.8 / this.stageConfig.centerX); // depth mod
    this.particleStore[i].y = this.stageConfig.centerY + Math.sin(this.particleStore[i].angleY) * this.particleStore[i].radY * yProportion;
    this.particleStore[i].angleX += this.particleStore[i].speedX * (5000 / time); //logarithmic decay
    this.particleStore[i].angleY += this.particleStore[i].speedY * (5000 / time);
  }
};

proto.draw = function() {
  this.stageConfig.context.clearRect(0, 0, this.stageConfig.stage.width, this.stageConfig.stage.height);
  var i = 0;
  var l = this.particleStore.length;
  for(; i < l; i++) {
    var p = new Particle(this.stageConfig, this.particleStore[i]);
    p.draw();
  }
};

new ParticlesView();
