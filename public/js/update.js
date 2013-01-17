/* code to execute when the channel has updated */
function updateStats(analytics) {

  /**
   * Update the analytics
   */
  $('div#hostname').html(analytics.hostname);
  $('div#ostype').html(analytics.osType);
  $('div#oskernel').html(analytics.osKernel);

  $('div#osarchitecture').html(analytics.osArchitecture);
  $('div#osuptime').html(analytics.osUptime);
  $('div#osloadavg').html(analytics.osLoadAvg[0]);
  /* load average of 1 minute in time */

  /* memory usage */
  var memDataset = {
    /* used memory, free memory */
    memory: [(analytics.osTotalMemory - analytics.osFreeMemory), analytics.osFreeMemory],
    total: analytics.osTotalMemory
  };

  /* check if chart is already created */
  if ($(".piechart.memory").children().length === 0) {
    createMemoryChart(memDataset);
  } else {
    updateMemoryChart(memDataset);
  }

  $('div#osfreememory').html(roundToTwo(analytics.osFreeMemory));
  $('div#osusedmemory').html(roundToTwo(analytics.osTotalMemory - analytics.osFreeMemory));

  $("div#oscpus").html(
    analytics.osCpus.length + "&times; " + analytics.osCpus[0].model + " @ " + analytics.osCpus[0].speed +"Mhz"
    );

  //console.log(analytics.osCpuLoad);
  $("div.cpulog").html(analytics.osCpuLoad);

  /* check if chart is already created */
  if ($(".cpuload").children().length === 0) {
    createCpuChart(analytics.osCpuLoad);
  } else {
    updateCpuChart(analytics.osCpuLoad);
  }

}