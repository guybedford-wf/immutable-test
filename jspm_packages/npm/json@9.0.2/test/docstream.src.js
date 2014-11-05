/* */ 
(function(process) {
  function randint(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }
  var times = Number(process.argv[2]);
  if (isNaN(times))
    times = 5;
  var period = Number(process.argv[3]);
  if (isNaN(period))
    period = 1000;
  var randomize = (process.argv[4] !== undefined);
  var leftover = '';
  var interval = setInterval(function() {
    times--;
    var s = leftover + JSON.stringify({foo: 'bar'}) + '\n';
    var len = s.length;
    if (times <= 0) {
      clearInterval(interval);
    } else if (randomize) {
      len = randint(0, s.length);
    }
    process.stdout.write(s.slice(0, len));
    leftover = s.slice(len);
  }, period);
})(require("github:jspm/nodelibs@0.0.5/process"));
