/**
 * Create the cpu Multi-Series Line Chart
 */

 /* Array with Cpu loads, 4 Cpu's = 4 indexes */
 function createCpuChart(dataset) {

  var formatPercent = d3.format(".0%");

  width = 400, height = 100;

  var x = d3.scale.linear()
    .domain([0, 100]) /* 100% is the maximum I guess? Or d3.max(dataset) */
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

  /* It's data rendering time! */
  chart.selectAll("rect")
    .data(dataset)
  .enter().append("rect")
    .attr("y", y)
    .attr("width", x)
    .attr("height", y.rangeBand());

  /* Text rendering! */
  chart.selectAll("text")
    .data(dataset)
      .enter().append("text")
        .attr("x", x)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .text( function(String) { return roundToTwo(parseFloat(String)) + "%"; } );

  /* Adding some lines to improve readability */
  chart.selectAll("line")
    .data(x.ticks(10))
  .enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", 120)
    .style("stroke", "#ccc");

  /* Rules for the lines */
  chart.selectAll(".rule")
       .data(x.ticks(10))
     .enter().append("text")
       .attr("class", "rule")
       .attr("x", x)
       .attr("y", 0)
       .attr("dy", -3)
       .attr("text-anchor", "middle")
       .text(String);

  /* Finally, appending them */
  chart.append("line")
       .attr("y1", 0)
       .attr("y2", 120)
       .style("stroke", "#000");
  }

function updateCpuChart(dataset) {

  console.log(dataset);

  var x = d3.scale.linear()
    .domain([0, 100]) /* 100% is the maximum I guess? */
    .range([0, width]);

  /* redraw, with transition! */
  chart.selectAll("rect")
    .data(dataset)
  .transition()
    .duration(10)
    .attr("y", y)
    .attr("width", x);

  /* Also redraw text */
  $(".chart text").remove();

  chart.selectAll("text")
    .data(dataset)
      .enter().append("text")
        .attr("x", x)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .text( function(String) { return roundToTwo(parseFloat(String)) + "%"; } );
}