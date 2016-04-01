var freqs = [100, 200, 300, 400, 500];

function BarChart (elm) {
	this.canvas = null;
	this.canvasW = 400;
	this.canvasH = 300;
	this.elm = elm;
	this.margin = {top: 20, right: 20, bottom: 30, left: 40};
	this.width = 400 - this.margin.left - this.margin.right;
	this.height = 300 - this.margin.top - this.margin.bottom;
	
	this.init();
}

BarChart.prototype = {
	init: function () {
		this.canvas = d3.select(this.elm)
			.append("svg")
			.attr("width", this.canvasW)
			.attr("height", this.canvasH)
		.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
		
		var canvas = this.canvas;
		this.canvas
			.on("mousedown", function () {
				var p = d3.mouse(this);

				canvas.append("rect")
					.attr({
						class: "selection",
						x: p[0],
						y: p[1],
						width: 0,
						height: 0
					})
			})
			.on("mousemove", function () {
				var s = canvas.select("rect.selection");

				if (s.empty()) return;
			
				var p = d3.mouse(this),
					d = {
						x: parseInt(s.attr("x"), 10), 
						y: parseInt(s.attr("y"), 10), 
						width: parseInt(s.attr("width"), 10), 
						height: parseInt(s.attr("height"), 10)
					},
					move = {
						x: p[0] - d.x,
						y: p[1] - d.y
					};

				if (move.x < 1 || (move.x * 2 < d.width)) {
					d.x = p[0];
					d.width -= move.x;
				} else {
					d.width = move.x;
				}

				if (move.y < 1 || (move.y * 2 < d.height)) {
					d.y = p[1];
					d.height -= move.y;
				} else {
					d.height = move.y;
				}

				s.attr(d);
			})
			.on("mouseup", function () {
				canvas.select("rect.selection").remove();
			});		
		
		var width = this.width;
		var height = this.height;
		
		var x = d3.scale.linear()
    		.domain([1, freqs.length])
    		.range([0, this.width]);
		
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(5);
		
		var y = d3.scale.linear()
    		.domain([d3.max(freqs), 0])
    		.range([0, this.height]);
		
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(8);
		
		this.canvas.append("g")
    		.attr("transform", "translate(0, " + height + ")")
    		.attr("class", "x axis")
			.call(xAxis);
		
		this.canvas.append("g")
    		.attr("transform", "translate(0, 0)")
    		.attr("class", "y axis")
			.call(yAxis);
		
		this.canvas.selectAll(".bar")
			.data(freqs)
		.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function (d, i) { console.log("x: " + i + " tr: " + x(i)); return x(i + 1); })
			.attr("width", 20)
			.attr("y", function (d) { console.log("y: " + d + " tr: " + y(d)); return y(d); })
			.attr("height", function(d) { return height - y(d); });

		console.log(x(500));
	}
};

new BarChart($("#testGraph")[0]);