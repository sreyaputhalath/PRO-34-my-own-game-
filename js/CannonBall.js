class CannonBall {
    constructor(x, y) {
      var options = {
        isStatic: true
      };
      this.r = 30;
      this.speed = 0.05;
      this.body = Bodies.circle(x, y, this.r, options);
      this.image = loadImage("./assets/cannonball.png");
      this.animation = [this.image];
      this.trajectory = [];
     
      World.add(world, this.body);
    }
  
    animate() {
      this.speed += 0.05;
    }

    shoot() {
      var newAngle = cannon.angle - 28;
      newAngle = newAngle *(3.14/180)
      var velocity = p5.Vector.fromAngle(newAngle);
      velocity.mult(0.5);
      Matter.Body.setStatic(this.body, false);
      Matter.Body.setVelocity(this.body, {
        x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});  
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      var index = floor(this.speed % this.animation.length);
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation[index], 0, 0, this.r, this.r);
      pop();
  
      if (
        this.body.velocity.x > 0 &&
        this.body.position.x > 300)
         {
        var position = [this.body.position.x, this.body.position.y];
        this.trajectory.push(position);
      }
  
      for (var i = 0; i < this.trajectory.length; i++) {
        image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
      }
    }
  }
  