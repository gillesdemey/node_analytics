http      = require('http'),
SSE       = require('sse'),
express   = require('express'),
app       = express(),
port      = process.argv[2] ? process.argv[2] : 1338,
docRoot   = "./public",
logPath   = docRoot + "/logs",
os        = require('os');
fs        = require('fs');

app.configure(function() {
  app.use(express.static(docRoot));
});

/* set up the HTTP server */
var httpServer = http.createServer(app);

/* set up the SSE server */
var sseServer = new SSE(httpServer,
{
  "path" : "/analytics"
});

/* create the log file for every CPU */
/* createCpuLogs(os.cpus()); */

/* This block always gets executed, even with no active connection */
var id = setInterval(function(){

  /* calculate the load for every CPU */
  cpuLoad = calculateCpuLoad(os.cpus());

  /**
   * Append cpu load data to their respective csv file
   */
  for (var i = 0; i < os.cpus().length; i++) {
    var log = fs.createWriteStream(logPath + '/cpu' + i + '.csv', {'flags' : 'a'});
    log.on('error', function writeOnError(exception){
      console.log(exception);
    });
    /* UNIX timestamp */
    var ts = Math.round((new Date()).getTime() / 1000);
    log.end(ts + ", " + cpuLoad[i] + "\n");
  }
}, 100);

/* client has connected to the channel */
sseServer.on('connection', function(client){

  console.log("Client has connected.");

  /* every 100 ms, execute this code block */
  var id = setInterval(function(){

    /**
     * Send the analytics in JSON format to the listener
     */
    var analytics = {
      hostname: os.hostname(),
      osType: os.type(),
      osKernel: os.platform() + " " + os.release(),
      osArchitecture: os.arch(),
      osUptime: secondsToTime(os.uptime()),
      osLoadAvg: os.loadavg(),
      osTotalMemory: bytesToMegaBytes(os.totalmem()),
      osFreeMemory: bytesToMegaBytes(os.freemem()),
      osCpus: os.cpus(),
      osCpuLoad: cpuLoad
    };

    client.send(JSON.stringify(analytics));
  }, 100);

  /**
   * Basic analytics at system startup
   */
  console.log("Interval block has started.");

  console.log("Hostname is " + os.hostname());
  console.log("OS type is " + os.type());
  console.log("OS kernel is " + os.platform() + " " + os.release());
  console.log("OS architecture is " + os.arch());
  console.log("OS uptime is: " + os.uptime());

  console.log("Load average for 5 minutes is: " + os.loadavg()[1]);
  console.log("Total memory is " + bytesToMegaBytes(os.totalmem()));
  console.log("Free memory is " + bytesToMegaBytes(os.freemem()));

  client.on('close', function(){
    console.log("Client has disconnected.");
    clearInterval(id);
  });

});

httpServer.listen(port);

/* --- helper functions --- */

function createCpuLogs(cpus) {
  /**
   * Create a CSV file for every CPU on the system if they do not exist
   */
  console.log("CreateCpuLogs block");
  for (var i = 0; i < cpus.length; i++) {
    /* check if file exists */
    fs.exists(logPath + '/cpu' + i + '.csv', function (exists) {
      if (exists === false) {
        /* create the files */
        var log = fs.createWriteStream(logPath + '/cpu' + i + '.csv', {'flags' : 'a'});
        log.on('error', function writeOnError(exception){
          console.log(exception);
        });
        log.end("time, load\n");
        console.log("Log file for cpu " + i + "created!");
      } else {
        console.log("Log file for cpu already exists!");
        console.log("Appending CPU Load data to log file...");
      }
    });
  }
}

/**
 * Calculate the CPU load from recieved data from Node's OS.cpus() function
 * @param  {[type]} cpus [description]
 * @return {[type]}      [description]
 */
function calculateCpuLoad(cpus) {
  var cpuLoad = [];
  for (var i = 0; i < cpus.length; i++) {
    var cpu = cpus[i], total = 0;

    /* calculate cpu load totals from all types (idle, user, nice, sys, irq) */
    for (type in cpu.times) {
      total += cpu.times[type];
    }
    cpuLoad[i] = 100 - (100 * cpu.times.idle / total);
  }
  return cpuLoad;
}

/**
 * Convert bytes to MegaBytes
 */
function bytesToMegaBytes(int) {
  int = parseInt(int, 10);
  return int / 1048576;
}

/**
 * Convert sceonds to days, hours and minutes
 */
function secondsToTime(secs)
{
  var divisor_for_hours = Math.floor(secs / (60 * 60));
  var hours = Math.floor(secs / (60 * 60)) % 24;

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var days = Math.floor(divisor_for_hours / 24);

  var obj = {
    "d": days,
    "h": hours,
    "m": minutes,
    "s": seconds
  };
  return obj["d"] + " days, " + obj['h'] + " hours and " + obj['m'] + " minutes.";
}