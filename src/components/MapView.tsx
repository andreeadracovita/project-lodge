import React, { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/map";
import View from "ol/view";
import TileLayer from "ol/layer/tile";
import OSM from "ol/source/osm";
import {useGeographic} from 'ol/proj';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import Point from 'ol/geom/Point.js';
import Overlay from 'ol/Overlay.js';
import Feature from 'ol/Feature.js';

import "./MapView.css";

// Center = [long, lat]
// Points [] array of 2 number pairs [[lat, long], [lat, long], ...]
function MapView({width, height, center, zoom, points}) {
	const pinStyle = {
        'circle-radius': 5,
		'circle-fill-color': 'blue'
	}

	useEffect(() => {
		useGeographic();

		const features = [];
		if (points.length > 0) {
			points.forEach(p => {
				const point = new Point([p[1], p[0]]);
				features.push(new Feature(point));
			});
		}

		const map = new Map({
		  target: 'map',
		  view: new View({
		    center: center ? [center[1], center[0]] : [0, 0],
		    zoom: zoom,
		  }),
		  layers: [
		    new TileLayer({
		      source: new OSM(),
		    }),
		    new VectorLayer({
		      source: new VectorSource({
		        features: features,
		      }),
		      style: pinStyle
		    })
		  ]
		});

		const element = document.getElementById('popup');

		const popup = new Overlay({
		  element: element,
		  stopEvent: false,
		});
		map.addOverlay(popup);

	    return () => {
	      map.setTarget(null);
	    };
	  }, [center, points]);

	const mapStyle = {
		width: width ?? "100%",
		height: height ?? "1000px"
	};

	return (
		<div id="map" style={mapStyle}></div>
	)
}

export default MapView;