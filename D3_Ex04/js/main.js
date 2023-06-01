//Load the data
d3.json("data/buildings.json").then((data) => {
    console.log(data);
});

var dataArray = [];

//Make data readable
d3.json("data/buildings.json").then((data) => {
    data.forEach((d) => {
        d.height = +d.height;
        dataArray.push(d.height);
    });
    console.log(data);
    console.log(dataArray);

    //Canvas
    var svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);

    // SCALES  
    var x = d3.scaleBand()
        .domain(data.map((d) => d.name)) // Building names as domain
        .range([0, 500])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.height)]) // Max height as domain
        .range([0, 500]);

    var color = d3.scaleOrdinal()
        .domain(dataArray)
        .range(d3.schemeSet3);

    // Bind the information read to the rectangles
    var rects = svg.selectAll("rect")
        .data(data)

    var rectWidth = 30;
    var rectPadding = 5;

    rects.enter()
        .append("rect")
        .attr("x", function (d, i) {
            console.log(x(d.name));
            console.log(d.name)
            return x(d.name);
        })
        .attr("y", function (d) {
            return y(d.height);
        })
        .attr("width", rectWidth)
        .attr("height", function (d) {
            return 500 - y(d.height);
        })
        .attr("fill", function (d) {
            return color(d.height);
        });
}).catch((error)=>{
    console.log(error);
});


