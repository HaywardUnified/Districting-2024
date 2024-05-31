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

/* Load Map */
const map = leaf.map('map').setView(STARTING_COORDINATES, 13);
leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
>>>>>>> b6b6b0b (populate map)
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
<<<<<<< HEAD
=======

<<<<<<< HEAD
const geojsonFeatures = loadFiles();
displayGeojsonFeatures(geojsonFeatures);
>>>>>>> b6b6b0b (populate map)
=======
const geoFeatures = loadFiles();
const geoLayers = generateGeoLayers(geoFeatures);
console.log(geoFeatures);
>>>>>>> 732eaf2 (geoLayer generator)
