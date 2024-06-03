import leaf, { layerGroup, polygon } from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

<<<<<<< HEAD
<<<<<<< HEAD
const map = leaf.map('map').setView([37.656, -122.093], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
=======
=======
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

<<<<<<< HEAD
>>>>>>> 732eaf2 (geoLayer generator)
function loadFiles() {
    const context = require.context('./datafiles/', true, /\.geojson$/);
    const files = {};

    context.keys().forEach((key) => {
        const formattedKey = key
            .replace('./', '')
            .replace(/\.(json|geojson)$/, '');

        files[formattedKey] = context(key);
    });

    return files;
}

/**
 * Creates geo layers for each feature
 * @param {object} features - GeoJSON features
 * @returns map containing layer instances
 */
function generateGeoLayers(features) {
    const layers = new Map();

    Object.keys(features).forEach((key) => {
        layers.set(key, leaf.geoJSON(features[key]));
    });

    return layers;
}

=======
>>>>>>> 8da21c5 (tool tip and colors)
/* Load Map */
<<<<<<< HEAD
const map = leaf.map('map').setView(STARTING_COORDINATES, 12);
const geoFeatureCollections = loadFiles();
const mapLayerGroup = leaf.layerGroup(geoFeatureCollections);

leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
>>>>>>> b6b6b0b (populate map)
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
<<<<<<< HEAD
=======

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const geojsonFeatures = loadFiles();
displayGeojsonFeatures(geojsonFeatures);
>>>>>>> b6b6b0b (populate map)
=======
const geoFeatures = loadFiles();
const geoLayers = generateGeoLayers(geoFeatures);
console.log(geoFeatures);
>>>>>>> 732eaf2 (geoLayer generator)
=======
const geoFeatureCollections = loadFiles();

=======
>>>>>>> 151c39a (layergroup)
// Apply feature options and styling
geoFeatureCollections.forEach((collection) => {
    applyFeatureOptions(collection.features).addTo(map);

    console.log(collection);
=======
const map = leaf.map('map', {
    center: STARTING_COORDINATES,
    layers: [googleHybrid],
    zoom: 12,
>>>>>>> a02c6f9 (base layers and overlays)
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
<<<<<<< HEAD
>>>>>>> 8da21c5 (tool tip and colors)
=======

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
>>>>>>> a02c6f9 (base layers and overlays)
