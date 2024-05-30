import leaf from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

<<<<<<< HEAD
const map = leaf.map('map').setView([37.656, -122.093], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
=======
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
>>>>>>> b6b6b0b (populate map)
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
<<<<<<< HEAD
=======

const geojsonFeatures = loadFiles();
displayGeojsonFeatures(geojsonFeatures);
>>>>>>> b6b6b0b (populate map)
