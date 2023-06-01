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
        .attr("width", 900)
        .attr("height", 900);

    // Bind the information read to the rectangles
    var rects = svg.selectAll("rect")
        .data(dataArray)

    var rectWidth = 30;
    var rectPadding = 5;

    rects.enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (rectWidth + rectPadding);
        })
        .attr("y", function (d) {
            return 900 - d;
        })
        .attr("width", rectWidth)
        .attr("height", function (d) {
            return d;
        })
        .attr("fill", "steelblue");

});


