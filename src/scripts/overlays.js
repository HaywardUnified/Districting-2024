import leaf from 'leaflet';

export function insertNoneLayer(collection) {
    collection['None'] = leaf.layerGroup();
    return collection;
}

/**
 * Convert feature collections into layer groups
 * @param {*} collections - array of feature collections (each feature collection contains an array of features/layers)
 * @return - object containing geoJSON map overlays
 */
export function generateMapOverlays(collections) {
    const overlays = {};

    collections.forEach((collection) => {
        const geoJSONobj = applyFeatureOptions(collection.features);
        const layerGroup = leaf.layerGroup([geoJSONobj]);
        overlays[`${collection.name}`] = layerGroup;
    });

    return overlays;
}

/**
 * Apply options to geo features.
 * @param {array} features - array of geo features
 */
function applyFeatureOptions(features) {
    return leaf.geoJSON(features, {
        style: styleFeature,
        onEachFeature: onEachFeature,
    });
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    });
}

function hoverPopUp(feature, layer) {
    layer.bindTooltip(feature.properties.DistrictName);
}

function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '0',
        fillOpacity: 0.7,
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    leaf.geoJSON.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
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

    return {
        color,
        dashArray: '5',
    };
}
