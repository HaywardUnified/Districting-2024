import leaf, { layerGroup, polygon } from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

const STARTING_COORDINATES = [37.63837551672515, -122.09706577524128];

// Map tiles
const baseLayers = {
    Digital: leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
    }),
    Hybrid: leaf.tileLayer(
        'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        {
            attribution:
                '&copy; <a target="_blank" href="https://policies.google.com/">Google</a>',
            maxZoom: 19,
        }
    ),
    Satellite: leaf.tileLayer(
        'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
            attribution:
                '&copy; <a target="_blank" href="https://policies.google.com/">Google</a>',
            maxZoom: 19,
            minZoom: 10,
        }
    ),
};

// Load and process data
const geoFeatureCollections = loadFiles(); // All available geoJSON files
const mapBaseOverlays = insertNoneLayer(
    generateMapOverlays(geoFeatureCollections)
);
const mapLabelOverlays = generateLabelOverlays(geoFeatureCollections);

// Load Map
const map = leaf.map('map', {
    center: STARTING_COORDINATES,
    layers: [baseLayers['Digital'], mapBaseOverlays['Draft A']],
    zoom: 12,
});

// Insert map controls
const baseLayerControls = createControls(baseLayers).setPosition('bottomleft');
const mapOverlayControls = createControls(mapBaseOverlays, null, {
    collapsed: false,
}).setPosition('topleft');
const labelOverlayControls =
    createControls(mapLabelOverlays).setPosition('topleft');

/* const regionLabelControls = createControls();
const demographicControls = createControls(); */

console.log(geoFeatureCollections);

function generateLabelOverlays(collections) {
    let labels = {};

    for (let collection of collections) {
    }
}

function insertNoneLayer(collection) {
    collection['None'] = leaf.layerGroup();
    return collection;
}

/**
 * Convert feature collections into layer groups
 * @param {*} collections - array of feature collections (each feature collection contains an array of features/layers)
 * @return - object containing geoJSON map overlays
 */
function generateMapOverlays(collections) {
    const overlays = {};

    collections.forEach((collection) => {
        const geoJSONobj = applyFeatureOptions(collection.features);
        const layerGroup = leaf.layerGroup([geoJSONobj]);
        overlays[`${collection.name}`] = layerGroup;
    });

    return overlays;
}

/**
 * Create a control layer to store base layers and overlays.
 * @param {*} baseLayers - tile layers (ie. maps); radio buttons
 * @param {*} overlays - stuff that goes over base layers (ie. markers); checkboxes
 * @return {object} layerControl
 */
function createControls(baseLayers, overlays, options) {
    return leaf.control.layers(baseLayers, overlays, options).addTo(map);
}

/**
 * Load and convert .geojson files to geo Feature Collections
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
 * Apply options to geo features.
 * @param {array} features - array of geo features
 */
function applyFeatureOptions(features) {
    return leaf.geoJSON(features, {
        style: styleFeature,
        onEachFeature: hoverPopUp,
    });
}

function hoverPopUp(feature, layer) {
    layer.bindTooltip(feature.properties.DistrictName);
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
