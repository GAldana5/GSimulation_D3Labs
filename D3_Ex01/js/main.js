var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var circle = svg.append("circle")
	.attr("cx", 130)
	.attr("cy", 200)
	.attr("r", 70)
	.attr("fill", "blue");

var rect = svg.append("rect")
	.attr("x", 20)
	.attr("y", 20)
	.attr("width", 20)
	.attr("height", 20)
	.attr("fill","red");

var rect = svg.append("rect")
	.attr("x", 200)
	.attr("y", 20)
	.attr("width", 20)
	.attr("height", 20)
	.attr("fill","red");

