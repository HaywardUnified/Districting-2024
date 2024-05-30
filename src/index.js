import leaf from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

function loadFiles() {
    const context = require.context('./datafiles/', true, /\.geojson$/);
    const cache = {};

    context.keys().forEach((key) => {
        cache[key] = context(key);
    });

    return cache;
}

function displayGeojsonFeatures(features) {
    Object.keys(features).forEach((key) => {
        leaf.geoJSON(features[key]).addTo(map);
    });
}

/* Load Map */
const map = leaf.map('map').setView([37.6688, -122.081], 13);
leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const geojsonFeatures = loadFiles();
displayGeojsonFeatures(geojsonFeatures);
