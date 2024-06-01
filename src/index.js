import leaf from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

<<<<<<< HEAD
<<<<<<< HEAD
const map = leaf.map('map').setView([37.656, -122.093], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
=======
=======
const STARTING_COORDINATES = [37.6688, -122.081];

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
});

mapLayerGroup.getLayers().forEach((layer) => {
    layer.features.forEach((feature) => {
        leaf.geoJSON(feature);
    });
});

/**
 * Load and convert .geojson files to Geo Feature Collections
 * @returns - geo feature collection
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
        style: function (feature) {
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
        },
    });
}
>>>>>>> 8da21c5 (tool tip and colors)
