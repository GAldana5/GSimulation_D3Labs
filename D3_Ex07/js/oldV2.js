//Margin
var margin = { top: 10, right: 10, bottom: 200, left: 100 };
var width = 600;
var height = 400;
var flag = true;

//Group
var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// SCALES  
var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

var y = d3.scaleLinear()
    .range([0, height]);

//AXIS
var xAxisGroup = g.append("g").attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g").attr("class", "left axis");

//---TITLE LABELS
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


//Make data readable
d3.json("data/revenues.json").then((data) => {
    data.forEach((d) => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });
    // ... more code to add scales and axis and more
    // ...

    var rects = g.selectAll("rect").data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => {
            return x(d.month);
        })
        .attr("y", function (d) {
            return 400 - y(d.revenue);
        })
        .attr("width", x.rectWidth)
        .attr("height", (d) => {
            return y(d.revenue);
        })
        .attr("fill", "indianred");

    // ------ UPDATE INTERVAL
    d3.interval(() => { update(data); }, 1000);
    update(data);
    flag = !flag;

}).catch((error) => {
    console.log(error);
});


//-----------------------------------------UPDATE
function update(data) {
    var value = flag ? "revenue" : "profit";
    yLabel.text(value);

    //SCALES
    x.domain(data.map((d) => d.month)) // Month as domain
    y.domain([0, d3.max(data, (d) => d[value])]) // Revenue as domain

    var bottomAxis = d3.axisBottom(x);

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

    var leftAxis = d3.axisLeft(y)
    .ticks(11).tickFormat((d) => { return (50000 - d) / 1000 + "K"; });

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

    //---------RECTANGLES
    // Bind the information read to the rectangles
    rects = g.selectAll("rect").data(data);
    rects.exit().remove();

    var rectWidth = 30;
    rects.attr("x", (d) => x(d.month))
        .attr("y", (d) => y(d[value]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d[value]))
        .attr("fill", "indianred");
}
