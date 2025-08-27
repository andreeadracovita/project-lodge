import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/map";
import View from "ol/View";
import TileLayer from "ol/layer/tile";
import OSM from "ol/source/OSM";
import {useGeographic} from "ol/proj";
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";
import Point from "ol/geom/Point.js";
import Fill from "ol/style/Fill.js";
import Stroke from "ol/style/Stroke.js";
import Style from "ol/style/Style.js";
import CircleStyle from "ol/style/Circle.js";
import Text from "ol/style/Text.js";
import Feature from "ol/Feature.js";
import {defaults as defaultInteractions} from "ol/interaction/defaults.js";
import PointerInteraction from "ol/interaction/Pointer.js";
import RegularShape from "ol/style/RegularShape.js";
import * as olExtent from "ol/extent";

import "./MapView.css";
import { genericMapCenter } from "utils/constants";

type MapViewProps = {
	id: string,
	height: any,
	center: any,
	zoom: any,
	boundingbox: any,
	points: any,
	isEditable: boolean,
	updatePinPosition: any,
	updateIdsMap: any,
	handleHighlightItem: any,
	shouldShowText: any,
	priceMap: any
};

// Center = [long, lat]
// Points [] array of 2 number pairs [[lat, long], [lat, long], ...]
export default function MapView({
	id,
	height,
	center,
	zoom,
	boundingbox,
	points,
	isEditable,
	updatePinPosition,
	updateIdsMap,
	handleHighlightItem,
	shouldShowText,
	priceMap
}: MapViewProps) {
	class Drag extends PointerInteraction {
		coordinate_: any;
		feature_: any;
		cursor_: any;
		previousCursor_: any;

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
			this.cursor_ = "pointer";

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
	function handleDownEvent(evt: any) {
		const map = evt.map;

		const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature: any) {
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
	function handleDragEvent(evt: any) {
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
	function handleMoveEvent(evt: any) {
		if (this.cursor_) {
			const map = evt.map;
			const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature: any) {
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
	function handleUpEvent(_evt: any) {
		updatePinPosition([this.coordinate_[1], this.coordinate_[0]]);
		this.coordinate_ = null;
		this.feature_ = null;
		return false;
	}

	// If markCenter, create singular pin to position location on map with drag action
	const pinStyle = new Style({
		image: new CircleStyle({
			radius: 10,
			fill: new Fill({
				color: "#371590",
			}),
			stroke: new Stroke({
				color: "white",
				width: 2,
			}),
		}),
	});

	const priceTagStyle = [
		new Style({
			image: new RegularShape({
				fill: new Fill({
					color: "#371590",
				}),
				stroke: new Stroke({
					color: "white",
					width: 2,
				}),
				radius: 50 / Math.SQRT2,
				radius2: 50,
				points: 4,
				angle: 0,
				scale: [1, 0.5],
			})
		}),
		new Style({
			text: new Text({
				font: 'bold 13px Calibri,sans-serif',
				fill: new Fill({
					color: '#fff',
				}),
			}),
		})
	];

	// const labelStyle = new Style({
	// 	text: new Text({
	// 		font: 'bold 13px Calibri,sans-serif',
	// 		fill: new Fill({
	// 			color: '#fff',
	// 		}),
	// 	}),
	// });

	useEffect(() => {
		if (!id) {
			return;
		}

		useGeographic();

		const features = [];
		if (points.length > 0) {
			const olIds = [];
			points.forEach(p => {
				const point = new Point([p[1], p[0]]);
				const feature = new Feature(point);
				olIds.push(feature.ol_uid);
				features.push(feature);
			});
			if (updateIdsMap) {
				updateIdsMap(olIds);
			}
		}

		let style = [];
		if (shouldShowText) {
			style = priceTagStyle;
		} else {
			style = [pinStyle];
		}

		const map = new Map({
			...(isEditable && {interactions: defaultInteractions().extend([new Drag()])}),
			target: id,
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
					style: function (feature: any) {
						if (shouldShowText) {
							priceTagStyle[1]
								.getText()
								.setText([priceMap.get(feature.ol_uid), '']);
						}
						return style;
					},
				})
			]
		});

		// Compute width as 100% of its parent
		const width = document.getElementById(id)?.parentElement?.clientWidth;
		map.setSize([width, height]);

		if (boundingbox) {
			var view = map.getView();
			// Extent: minx, miny, maxx, maxy
			// view.fit(boundingbox, {padding: [0, 0, 0, 0]});
			const min = [boundingbox[2], boundingbox[0]];
			const max = [boundingbox[3], boundingbox[1]];
			var boundingExtent = olExtent.boundingExtent([min, max]);
			// let res = view.getResolution();
			view.fit(boundingExtent); //, map.getSize(), {padding: [0, 0, 0, 0]}
			const res = view.getResolutionForExtent(boundingExtent, [width, height]);
			view.setResolution(res);
		}

		if (handleHighlightItem) {
			let selected: any = null;
			map.on("pointerup", function (event: any) {
				if (selected !== null) {
					// selected.setStyle(undefined);
					selected = null;
				}

				map.forEachFeatureAtPixel(event.pixel, function (feature: any) {
					selected = feature;
					handleHighlightItem(selected.ol_uid);
					return true;
				});
			});
		}
		
		return () => {
			map.setTarget(undefined);
		};
	  }, [center, points, boundingbox]);

	const mapStyle = {
		width: "100%",
		height: height + "px"
	};

	return (
		<>
			<div id={id} style={mapStyle} className="map"></div>
		</>
	)
}
