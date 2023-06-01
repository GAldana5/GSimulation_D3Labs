var svg = d3.select("#chart-area")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

var data = [25, 20, 15, 10, 5];

var rects = svg.selectAll("rect")
  .data(data)

rects.enter()
  .append("rect")
  .attr("width", 40)
  .attr("height", function(d) {
    return d;
  })
  .attr("x", function(d, i) {
    return i * 50; // Spacing between rectangles
  })
  .attr("y", function(d) {
    return 400 - d; // Align rectangles to the bottom
  })
  .style("fill", "limegreen"); // fill color
