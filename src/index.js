import leaf from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

/* const map = leaf.map('map').setView([37.656, -122.093], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map); */

function loadFiles() {
    const context = require.context('./datafiles/', true, /\.geojson$/);
    const cache = {};

    context.keys().forEach((key) => {
        cache[key] = context(key);
    });

    return cache;
}

console.log(loadFiles());
