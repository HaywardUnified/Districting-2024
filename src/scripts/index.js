import '../style/style.scss';
import '../../node_modules/leaflet/dist/leaflet.css';

import baseLayers from './baseLayers';
import leaf from 'leaflet';

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
/* const labelOverlayControls =
    createControls(mapLabelOverlays).setPosition('topleft'); */

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
        const geoJSONobj = applyFeatureOptions(collection);
        const layerGroup = leaf.layerGroup([geoJSONobj]);
        overlays[`${collection.name}`] = layerGroup;
    });

    return overlays;
}

/**
 * Apply options to a geoJSON object.
 * @param {array} geojson
 */
function applyFeatureOptions(geojson) {
    const geojsonLayer = new leaf.GeoJSON(geojson, {
        style: styleFeature,
        onEachFeature: (feature, layer) => {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature,
            });
        },
    });

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 4,
            dashArray: '',
            fillOpacity: 0.4,
        });

        layer.bringToFront();
    }

    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    return geojsonLayer;
}

function hoverPopUp(feature, layer) {
    layer.bindTooltip(feature.properties.DistrictName);
}

function styleFeature(feature) {
    let color;

    switch (feature.properties.DistrictName) {
        case 'A':
            color = '#003049';
            break;
        case 'B':
            color = '#D62828';
            break;
        case 'C':
            color = '#F77F00';
            break;
        case 'D':
            color = '#0f7b0a';
            break;
        case 'E':
            color = '#BC34E6';
            break;
    }

    return {
        color,
        dashArray: '5',
    };
}
