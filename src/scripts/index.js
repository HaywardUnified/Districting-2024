import '../style/style.scss';
import '../../node_modules/leaflet/dist/leaflet.css';

import baseLayers from './baseLayers';
import leaf from 'leaflet';
import { insertNoneLayer, generateMapOverlays } from './overlays';

const STARTING_COORDINATES = [37.63837551672515, -122.09706577524128];

// Load and process data
const geoFeatureCollections = loadFiles(); // All available geoJSON files
const mapBaseOverlays = insertNoneLayer(
    generateMapOverlays(geoFeatureCollections)
);

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
    const context = require.context('../datafiles/', true, /\.geojson$/);
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
