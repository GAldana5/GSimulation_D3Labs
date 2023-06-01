//Margin
var margin = { top: 100, right: 10, bottom: 200, left: 100 };
var width = 600;
var height = 400;
var flag = true;

var containerHeight = height + margin.top + margin.bottom + 100;

//Group
var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", containerHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// SCALES  
var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .range([height, 0]);

//AXIS
var xAxisGroup = g.append("g").attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")");
var yAxisGroup = g.append("g").attr("class", "left axis");

//---TITLE LABELS
//x label
g.append("text")
.attr("class", "x axis-label")
.attr("x", (width / 2))
.attr("y", height + 140)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.style("fill","black")
.attr("transform", "translate(0, -50)")
.text("Month");

// Y Label
var yLabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "black")
    .text("Revenue (dlls.)");


var rects; // Variable to store the rectangles

//Make data readable
d3.json("data/revenues.json").then((data) => {
    data.forEach((d) => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });

    // Set up scales and axis
    x.domain(data.map((d) => d.month)) // Month as domain
    y.domain([0, d3.max(data, (d) => d.revenue) + 10000, 0]) // Revenue as domain

    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y).ticks(11).tickFormat((d) => (60000 - d) / 1000 + "K");

    // Draw x-axis and y-axis
    xAxisGroup.call(bottomAxis)
        .selectAll("text")
        .attr("class", "x axis-label")
        .attr("x", (width / 2))
        .attr("y", height + 140)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .attr("transform", "translate(0, -50)")
        .text("Month");
    yAxisGroup.call(leftAxis);

    g.append("g")
        .attr("class", "bottom axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(bottomAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");


    // Draw initial rectangles
    rects = g.selectAll("rect").data(data).enter()
        .append("rect")
        .attr("x", (d) => x(d.month))
        .attr("y", (d) => height - y(d.revenue))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(d.revenue))
        .attr("fill", "indianred");

    // ------ UPDATE INTERVAL
    d3.interval(() => { update(data); }, 1000);
    //update(data);

}).catch((error) => {
    console.log(error);
});


//-----------------------------------------UPDATE
function update(data) {
    flag = !flag; // Toggle flag
    var value = flag ? "revenue" : "profit";
    var label = flag ? "Revenue (dlls.)" : "Profit (dlls.)";
    yLabel.text(label);

    // Update scales
    y.domain([d3.max(data, (d) => d[value]) + 10000, 0]);

    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y).ticks(11).tickFormat((d) => (60000 - d) / 1000 + "K");

    // Update x-axis and y-axis
    xAxisGroup.call(bottomAxis);
    yAxisGroup.call(leftAxis);

    // Remove existing x-axis tick labels
    xAxisGroup.selectAll("text").remove();

    // Add new x-axis tick labels
    xAxisGroup
        .call(bottomAxis)
        .selectAll("text")
        .attr("class", "x axis-label")
        .attr("x", width / 2)
        .attr("y", height + 140)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .attr("transform", "translate(0, -50)")
        .text((d) => d);

    //--------- UPDATE RECTANGLES
    rects
        .data(data)
        .transition()
        .duration(500)
        .attr("x", (d) => x(d.month))
        .attr("y", (d) => height - y(d[value]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(d[value]))
        .attr("fill", "indianred");
}
