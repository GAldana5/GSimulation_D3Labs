//Make data readable
d3.json("data/revenues.json").then((data) => {
    data.forEach((d) => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });
    console.log(data);

    //Margin
    var margin = { top: 10, right: 10, bottom: 200, left: 100 };
    var width = 600;
    var height = 400;

    //Group
    var g = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    // SCALES  
    var x = d3.scaleBand()
        .domain(data.map((d) => d.month)) // Month as domain
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.revenue)]) // Revenue as domain
        .range([0, height]);

    var color = d3.scaleOrdinal()
        .domain(data.map((d) => d.month))
        .range(d3.schemeSet3);


    //---AXIS LABELS
    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y)
        .ticks(11).tickFormat((d) => { return (50000 - d) / 1000 + "K"; });

    g.append("g")
        .attr("class", "bottom axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(bottomAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

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
        .style("fill", "black")
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
        .style("fill", "black")
        .text("Revenue (dlls.)");


    // Bind the information read to the rectangles
    var rects = g.selectAll("rect").data(data);
    rects.exit().remove();

    var rectWidth = 30;
    rects.attr("x", (d) => x(d.month))
        .attr("y", (d) => y(d.revenue))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.revenue))
        .attr("fill", "indianred");


    rects.enter()
        .append("rect")
        .attr("x", function (d, i) {
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
        });

    var flag = true;
    d3.interval(() => {
        flag = !flag;
        update();
    }, 1000);

    function update() {
        var value = flag ? "revenue" : "profit";
        x.domain(data.map((d) => d.month));
        y.domain([0, d3.max(data, (d) => d[value])]);
    
        rects.transition()
            .duration(500)
            .attr("y", (d) => y(d[value]))
            .attr("height", (d) => height - y(d[value]));
    }


}).catch((error) => {
    console.log(error);
});