import leaf from 'leaflet';
import './style/style.scss';
import '../node_modules/leaflet/dist/leaflet.css';

const STARTING_COORDINATES = [37.6688, -122.081];

/* Load Map */
const map = leaf.map('map').setView(STARTING_COORDINATES, 12);

leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const geoFeatureCollections = loadFiles();

// Apply feature options and styling
geoFeatureCollections.forEach((collection) => {
    applyFeatureOptions(collection.features).addTo(map);
});

console.log(geoFeatureCollections);

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
