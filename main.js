var Visualizer = {
	showTags: function () {
		/*var attrs = Object.keys(data[0]);
		for (var i in attrs) {
			$("#dataset").append(
				$("<div></div>").addClass("attr").html(attrs[i])
			);
		}*/
	}
};

var DataAttr = React.createClass({
	totalAttrs: 0,
	
	handleDragStart: function (e) {
		e.dataTransfer.setData("text/plain", e.target.id);
	},
	
	render: function () {
		var id = "attr-" + this.totalAttrs;
		
		return (
			<div id={id} className="attr" draggable="true" onDragStart={this.handleDragStart}>{this.props.attrName}</div>
		);
	}
});

var Panel = React.createClass({
	getInitialState: function() {
		return {vertAttr: "", horAttr: ""};
	},
	
	handleVertDrop: function (e) {
		e.preventDefault();
		this.setState({vertAttr: "hahadroped"});
	},
	
	handleHorDrop: function (e) {
		e.preventDefault();
		console.log(e.dataTransfer.getData("text"));
		this.setState({horAttr: "whatever"});	
	},
	
	preventDragOver: function (e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	},
	
	render: function () {
		return (
			<table cellSpacing="4" cellPadding="0">
			<tbody>
			<tr>
				<td className="vert-attr" onDrop={this.handleVertDrop} onDragOver={this.preventDragOver}><div className="tag">{this.state.vertAttr}</div></td>
				<td className="graph">Graph</td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td className="hor-attr" onDrop={this.handleHorDrop} onDragOver={this.preventDragOver}>{this.state.horAttr}</td>
			</tr>
			</tbody>
			</table>
		);
	}
});

var DataAttrs = React.createClass({
	render: function () {		
		return (
			<div>{Object.keys(data[0]).map(function (attr) {
				return <DataAttr attrName={attr} />;
			})}</div>
		);
	}
});

ReactDOM.render(
	<DataAttrs />,
	$('#dataattrs')[0]
);

ReactDOM.render(
	<Panel />,
	$("#panel-2")[0]
);