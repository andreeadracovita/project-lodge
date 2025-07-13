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
import {defaults as defaultInteractions} from 'ol/interaction/defaults.js';
import Modify from 'ol/interaction/Modify.js';
import Select from 'ol/interaction/Select.js';
import PointerInteraction from 'ol/interaction/Pointer.js';

import "./MapView.css";
import { genericMapCenter } from "/src/utils/constants";

class Drag extends PointerInteraction {
  constructor() {
    super({
      handleDownEvent: handleDownEvent,
      handleDragEvent: handleDragEvent,
      handleMoveEvent: handleMoveEvent,
      handleUpEvent: handleUpEvent,
    });

    /**
     * @type {import('ol/coordinate.js').Coordinate}
     * @private
     */
    this.coordinate_ = null;

    /**
     * @type {string|undefined}
     * @private
     */
    this.cursor_ = 'pointer';

    /**
     * @type {Feature}
     * @private
     */
    this.feature_ = null;

    /**
     * @type {string|undefined}
     * @private
     */
    this.previousCursor_ = undefined;
  }
}

/**
 * @param {import('ol/MapBrowserEvent.js').default} evt Map browser event.
 * @return {boolean} `true` to start the drag sequence.
 */
function handleDownEvent(evt) {
	console.log("down event");
	const map = evt.map;

	const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
		return feature;
	});

	if (feature) {
		this.coordinate_ = evt.coordinate;
		this.feature_ = feature;
	}

	return !!feature;
}

/**
 * @param {import('ol/MapBrowserEvent.js').default} evt Map browser event.
 */
function handleDragEvent(evt) {
	console.log("drag");
	const deltaX = evt.coordinate[0] - this.coordinate_[0];
	const deltaY = evt.coordinate[1] - this.coordinate_[1];

	const geometry = this.feature_.getGeometry();
	geometry.translate(deltaX, deltaY);

	this.coordinate_[0] = evt.coordinate[0];
	this.coordinate_[1] = evt.coordinate[1];
}

/**
 * @param {import('ol/MapBrowserEvent.js').default} evt Event.
 */
function handleMoveEvent(evt) {
	if (this.cursor_) {
		const map = evt.map;
		const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
			return feature;
		});
		const element = evt.map.getTargetElement();
		if (feature) {
			if (element.style.cursor != this.cursor_) {
				this.previousCursor_ = element.style.cursor;
				element.style.cursor = this.cursor_;
			}
		} else if (this.previousCursor_ !== undefined) {
			element.style.cursor = this.previousCursor_;
			this.previousCursor_ = undefined;
		}
	}
}

/**
 * @return {boolean} `false` to stop the drag sequence.
 */
function handleUpEvent() {
	console.log("up event");
	this.coordinate_ = null;
	this.feature_ = null;
	return false;
}

// Center = [long, lat]
// Points [] array of 2 number pairs [[lat, long], [lat, long], ...]
export default function MapView({ width, height, center, zoom, points, markCenter, updateCenterPosition }) {
	// If markCenter, create singular pin to position location on map with drag action
	const pinStyle = markCenter
		? {
			'icon-src': 'icons/pin.png',
			'icon-opacity': 0.95,
			'icon-anchor': [0.5, 46],
			'icon-anchor-x-units': 'fraction',
			'icon-anchor-y-units': 'pixels',
			'stroke-width': 3,
			'stroke-color': [255, 0, 0, 1],
			'fill-color': [0, 0, 255, 0.6],
		}
		: {
			"circle-radius": 10,
			"circle-fill-color": "#371590",
			"circle-stroke-width": 2,
			"circle-stroke-color": "white"
		};

	useEffect(() => {
		useGeographic();

		const features = [];
		if (points.length > 0) {
			points.forEach(p => {
				const point = new Point([p[1], p[0]]);
				features.push(new Feature(point));
			});
		}

		if (markCenter) {
			const point = new Point([center[1], center[0]]);
			features.push(new Feature(point));
		}

		const map = new Map({
			...(markCenter && {interactions: defaultInteractions().extend([new Drag()])}),
			target: "map",
			view: new View({
				center: center ? [center[1], center[0]] : genericMapCenter,
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

		const element = document.getElementById("popup");

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
		<>
			<div id="map" style={mapStyle}></div>
			<div id="popup">Overlay</div>
		</>
	)
}
