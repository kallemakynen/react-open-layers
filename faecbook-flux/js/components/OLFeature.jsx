var React = require('react')

var OLFeature = React.createClass({

	getInitialState: function() {
		return {
			showDialog: true
		};
	},

	componentWillMount: function() {
		console.log("will mount")

	},

	componentDidMount: function() {

		this.props.map.addLayer(new OpenLayers.Layer('base', {
			isBaseLayer: true,
			maxExtent: bounds
		}));

		var bounds = new OpenLayers.Bounds(-200, -200, 100, 100);

		// vector1 - the blue marker shape
		var vectorLayer1 = new OpenLayers.Layer.Vector("vector1", {
			maxExtent: bounds
		});
		this.props.map.addLayer(vectorLayer1);


		var lonlat = new OpenLayers.LonLat(14975000,4268330);

		var position = parseInt(this.props.position);
		//var position = 1;

		var f1 = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Point(14975000,4268330 + position * 400000), {
				id: this.props.id
			}, {
				externalGraphic: '../images/pikachu.png',
				graphicWidth: 40,
				graphicHeight: 40
			});
			vectorLayer1.addFeatures(f1);

			var drag1 = new OpenLayers.Control.DragFeature(vectorLayer1, {
				autoActivate: true
			});
			this.props.map.addControl(drag1);

			selectControl = new OpenLayers.Control.SelectFeature(
					[vectorLayer1],
					{
							clickout: true, toggle: false,
							multiple: false, hover: false,
							toggleKey: "ctrlKey", // ctrl key removes from selection
							multipleKey: "shiftKey" // shift key adds to selection
					}
			);

			this.props.map.addControl(selectControl);
			selectControl.activate();

			vectorLayer1.events.on({
				"featureselected": function(e) {
					console.log("selected");
				}
			});

			//      this.props.map.zoomToMaxExtent();


		},

		render: function() {
			return (
				<div className="feature">
				</div>
			)
		}
	});

	module.exports = OLFeature;