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

function MapView() {
	const pinStyle = {
        'circle-radius': 9,
		'circle-fill-color': 'white'
	}

	useEffect(() => {
		useGeographic();

		const place = [8.5410422, 47.3744489];

		const point = new Point(place);

		const map = new Map({
		  target: 'map',
		  view: new View({
		    center: place,
		    zoom: 8,
		  }),
		  layers: [
		    new TileLayer({
		      source: new OSM(),
		    }),
		    new VectorLayer({
		      source: new VectorSource({
		        features: [new Feature(point)],
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
	  }, []);

	return (
		<div id="map"></div>
	)
}

export default MapView;