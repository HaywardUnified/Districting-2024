import leaf, { layerGroup, polygon } from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

const STARTING_COORDINATES = [37.6688, -122.081];
const osm = leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
});
const googleHybrid = leaf.tileLayer(
    'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    {
        attribution:
            '&copy; <a target="_blank" href="https://policies.google.com/">Google</a>',
        maxZoom: 19,
    }
);
const googleSatellite = leaf.tileLayer(
    'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    {
        attribution:
            '&copy; <a target="_blank" href="https://policies.google.com/">Google</a>',
        maxZoom: 19,
    }
);

const baseLayers = {
    Digital: osm,
    Hybrid: googleHybrid,
    Satellite: googleSatellite,
};
const geoFeatureCollections = loadFiles(); // All available geoJSON files
const mapOverlayLayers = {};
const overlays = {};

//
geoFeatureCollections.forEach((collection) => {
    // convert feature collections to geoJSON objects
    const geoJSONobj = applyFeatureOptions(collection.features);
    const layer = leaf.layerGroup([geoJSONobj]);
    mapOverlayLayers[`${collection.name}`] = layer;
});

/* Load Map */
const map = leaf.map('map', {
    center: STARTING_COORDINATES,
    layers: [googleHybrid],
    zoom: 12,
});

const baseOverlayControls = createControls(baseLayers, overlays);
const mapOverlayControls = createControls(mapOverlayLayers, null, {
    collapsed: false,
});

console.log(geoFeatureCollections);
console.log(overlays);

/**
 * Create a layer control to store base layers and overlays.
 * @param {*} baseLayers - tile layers (ie. maps)
 * @param {*} overlays - stuff that goes over base layers (ie. markers, features)
 * @return {object} layerControl
 */
function createControls(baseLayers, overlays, options) {
    return leaf.control.layers(baseLayers, overlays, options).addTo(map);
}

/**
 * Load and convert .geojson files to Geo Feature Collections
 * @returns - object containing geo feature collection
 */
function loadFiles() {
    const context = require.context('./datafiles/', true, /\.geojson$/);
    const files = [];

    context.keys().forEach((key) => {
        const formattedKey = key
            .replace('./', '')
            .replace(/\.(json|geojson)$/, '');

        context(key).name = formattedKey; // Update name data

        files.push(context(key));
    });

    return files;
}

/**
 * Apply options to geo features
 * @param {array} features - array of geo features
 */
function applyFeatureOptions(features) {
    return leaf.geoJSON(features, {
        onEachFeature: (feature, layer) => {
            layer.bindTooltip(feature.properties.DistrictName);
        },
        style: styleFeature,
    });
}

function styleFeature(feature) {
    let color;

    switch (feature.properties.DistrictName) {
        case 'A':
            color = '#ffbe0b';
            break;
        case 'B':
            color = '#fb5607';
            break;
        case 'C':
            color = '#ff006e';
            break;
        case 'D':
            color = '#8338ec';
            break;
        case 'E':
            color = '#3a86ff';
            break;
    }

    return { color };
}
