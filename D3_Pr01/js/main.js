//Load the data
d3.json("data/buildings.json").then((data) => {
    console.log(data);
});

var dataArray = [];

//Make data readable
d3.json("data/revenues.json").then((data) => {
    data.forEach((d) => {
        d.height = +d.height;
        dataArray.push(d.height);
    });
    console.log(data);
    console.log(dataArray);

    //Margin
    var margin = { top: 10, right: 10, bottom: 200, left: 100 };
    var width = 600;
    var height = 400;

    //Group
    var g = d3.select("body")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    // SCALES  
    var x = d3.scaleBand()
        .domain(data.map((d) => d.month)) // Month as domain
        .range([0, 600])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.revenue)]) // Revenue as domain
        .range([0, 400]);

    var color = d3.scaleOrdinal()
        .domain(dataArray)
        .range(d3.schemeSet3);

    // Bind the information read to the rectangles
    var rects = g.selectAll("rect").data(data);
    var rectWidth = 30;
    var rectPadding = 5;
    rects.enter()
        .append("rect")
        .attr("x", function (d, i) {
            console.log(x(d.month));
            console.log(d.month)
            return x(d.month);
        })
        .attr("y", function (d) {
            return 400 - y(d.revenue);
        })
        .attr("width", rectWidth)
        .attr("height", function (d) {
            return y(d.revenue);
        })
        .attr("fill", function (d) {
            return "indianred";
        //.attr("fill", function (d) {
        //    return color(d.revenue);
        });

    //---AXIS LABELS
    var bottomAxis = d3.axisBottom(x);
    g.append("g")
        .attr("class", "bottom axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(bottomAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");
        
    var leftAxis = d3.axisLeft(y)
        .ticks(11).tickFormat((d) => { return (50000 - d) / 1000 + "K";});
    g.append("g")
        .attr("class", "left axis")
        .call(leftAxis);

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
    g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill","black")
    .text("Revenue (dlls.)");


}).catch((error) => {
    console.log(error);
});


