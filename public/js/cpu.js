/**
 * Create the cpu Multi-Series Line Chart
 */

 /* Array with Cpu loads, 4 Cpu's = 4 indexes */
 function createCpuChart(dataset) {

  var formatPercent = d3.format(".0%");

  width = 500, height = 100;

  x = d3.scale.linear()
    .domain([0, d3.max(dataset) + 10]) /* 100% is the maximum I guess? Or d3.max(dataset). Nope Heroku CPU hyperthread all the time (+100% CPU load). +10 for some headroom. */
    .range([0, width]);

  y = d3.scale.ordinal()
    .domain(dataset)
    .rangeBands([0, height]); /* Let's go this high */

  /* This is the chart SVG */
  chart = d3.select(".cpuload").append("svg")
      .attr("class", "cpuload")
      .attr("width", width)
      .attr("height", height + 15) /* adjust for translation */
    .append("g")
      .attr("transform", "translate(10,15)");

  bars = chart
    .append("g")
      .attr("class", "bars");

  lines = chart
    .append("g")
      .attr("class", "lines");

  /* It's data rendering time! */
  bars.selectAll("rect")
    .data(dataset)
  .enter().append("rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());

  /* Text rendering! */
  bars.selectAll("text")
    .data(dataset)
      .enter().append("text")
        .attr("x", x)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .text( function(String) { return roundToTwo(parseFloat(String)) + "%"; } );

  /* Adding some lines to improve readability */
  lines.selectAll("line")
    .data(x.ticks(10))
  .enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", height)
    .style("stroke", "#ccc");

  /* Rules for the lines */
  lines.selectAll(".rule")
       .data(x.ticks(10))
     .enter().append("text")
       .attr("class", "rule")
       .attr("x", x)
       .attr("y", 0)
       .attr("dy", -3)
       .attr("text-anchor", "middle")
       .text(String);

  /* Finally, appending them */
  lines.append("line")
       .attr("y1", 0)
       .attr("y2", 120)
       .style("stroke", "#000");
  }

function updateCpuChart(dataset) {

  //console.log(dataset);

  /* redraw, with transition! */
  bars.selectAll("rect")
    .data(dataset)
  .transition()
    .duration(100)
    .attr("width", x);

  /* Also redraw text */
  $(".cpuload .bars text").remove();

  bars.selectAll("text")
    .data(dataset)
      .enter().append("text")
        .attr("x", x)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .text( function(String) { return roundToTwo(parseFloat(String)) + "%"; } );
}