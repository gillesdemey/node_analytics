/**
* create the memoryChart
*/
function createMemoryChart(dataset) {

/**
 * Pie chart variables
 */
 var width = 250,
 height = 250,
 radius = Math.min(width, height) / 2;
 var r = 100;
 var ir = 45;

 var color = d3.scale.quantize()
     .range(["#3366FF", "#CCCCCC"]);

 pie = d3.layout.pie();

 arc = d3.svg.arc()
 .startAngle(function(d){ return d.startAngle; })
 .endAngle(function(d){ return d.endAngle; })
 .innerRadius(ir)
 .outerRadius(r);

/**
 * Create the SVG chart
 */
 vis = d3.select(".piechart.memory").append("svg:svg")
 .attr("width", width)
 .attr("height", height);

 var arc_group = vis.append("svg:g")
 .attr("class", "arc")
 .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 /**
  * Group for center text
  */
  var center_group = vis.append("svg:g")
  .attr("class", "center_group")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 /**
  * Total label
  */
  var totalLabel = center_group.append("svg:text")
  .attr("class", "label")
  .attr("dy", -15)
   .attr("text-anchor", "middle") // text-align: right
   .text("TOTAL");

 /**
  * Total Memory label
  */
  var totalValue = center_group.append("svg:text")
  .attr("class", "total")
  .attr("dy", 7)
  .attr("text-anchor", "middle") // text-align: right
  .text(roundToTwo(dataset.total));

 /**
  * Units label
  */
  var totalUnits = center_group.append("svg:text")
  .attr("class", "units")
  .attr("dy", 21)
  .attr("text-anchor", "middle")
  .text("MB");

  /**
   * Create the parts of the pie chart, and set the data
   */
   paths = arc_group.selectAll("path")
   .data(pie(dataset.memory))
   .enter()
   .append("path")
   .attr("fill", function(d, i) { return color(i); })
   .attr("d", arc)
   .each(function(d) { this._current = d; }); // store the initial values
 }

  /**
   * Update the memoryChart, and the data
   */
   function updateMemoryChart(dataset) {
    paths = paths.data(pie(dataset.memory)); // update the data
    paths.transition().duration(200).attrTween("d", arcTween); // redraw the arcs
  }

  /**
   * Store the displayed angles in _current.
   * Then, interpolate from _current to the new angles.
   * During the transition, _current is updated in-place by d3.interpolate.
   *
   */
   function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }