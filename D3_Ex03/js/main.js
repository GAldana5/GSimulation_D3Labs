//Load the data
d3.csv("data/ages.csv").then((data) => {
    console.log(data);
});

d3.tsv("data/ages.tsv").then((data) => {
    console.log(data);
});

d3.json("data/ages.json").then((data) => {
    console.log(data);
});

var dataArray = [];

//Make data readable
d3.json("data/ages.json").then((data) => {
    data.forEach((d) => {
        d.age = +d.age;
        dataArray.push(d.age);
    });
    console.log(data);
    console.log(dataArray);

    //Canvas
    var svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400);

    // Bind the information read to the circles
    var circles = svg.selectAll("circle")
        .data(dataArray)

    circles.enter()
        .append("circle")
        .attr("cx", function (d, i) {
            return (i * 80) + 50;
        })
        .attr("cy", 200)
        .attr("r", function (d) {
            return d;
        })
        .style("fill", function (d) {
            if (d > 10) {
                return "red"; // Color for ages above 10
            } else {
                return "steelblue"; // Color for ages 10 and below
            }
        });
});


