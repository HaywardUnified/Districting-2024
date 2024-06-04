import leaf, { layerGroup, polygon } from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

<<<<<<< HEAD
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
=======
const STARTING_COORDINATES = [37.63837551672515, -122.09706577524128];
>>>>>>> 2330c72 (map and region controls)

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

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
// Load Map
>>>>>>> 2330c72 (map and region controls)
const map = leaf.map('map', {
    center: STARTING_COORDINATES,
    layers: [baseLayers['Hybrid']],
    zoom: 12,
>>>>>>> a02c6f9 (base layers and overlays)
});

=======
>>>>>>> d958d82 (default map)
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
const baseLayerControls = createControls(baseLayers);
const mapOverlayControls = createControls(mapBaseOverlays, null, {
    collapsed: false,
});

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
<<<<<<< HEAD
>>>>>>> 8da21c5 (tool tip and colors)
=======

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
>>>>>>> a02c6f9 (base layers and overlays)
