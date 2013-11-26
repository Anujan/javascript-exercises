function Clock() {
  this.date = new Date();
  this.hours = this.date.getHours();
  this.minutes = this.date.getMinutes();
  this.seconds = this.date.getSeconds();
}

Clock.prototype.run = function() {
  console.log(this.hours + ":" + this.minutes + ":" + this.seconds);
  var self = this;
  setInterval(function() {
    self.seconds += 5;
    if (self.seconds >= 60) {
      self.minutes += 1;
      self.seconds -= 60;
    }
    if (self.minutes >= 60) {
      self.hours += 1;
      self.minutes -= 60;
    }
    if (self.hours > 24) {
      self.hours -= 24;
    }
    console.log(self.hours + ":" + self.minutes + ":" + self.seconds);
  }, 5000);
}

var c = new Clock();
c.run();