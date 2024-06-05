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
const hoverInfoBox = createHoverInfoBox().addTo(map);

function createHoverInfoBox() {
    const box = leaf.control();

    box.onAdd = function (map) {
        this._div = leaf.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    box.update = function (props) {
        this._div.innerHTML =
            `<div class='title'>Regional Demographics</div>` +
            (props
                ? `
<div class='data'>
    <div class='district'>District: ${props.DistrictName}</div>
    <div>Total Population: ${props['Population']}</div>
    <div class='population'>
        <div>Asian (${props['PercentAsian']}%): ${props['DOJ_NH_Asn']}</div>
        <div>Black (${props['PercentBlack']}%): ${props['DOJ_NH_Blk']}</div>
        <div>Latino (${props['PercentLatinoPop']}%): ${props['Hispanic Origin']}</div>
        <div>White (${props['PercentWhitePop']}%): ${props['NH_Wht']}</div>
        <div class='remaining'>
            <div>Remaining Population (${props['PercentMMR']}%):</div>
            <div class='populationValues'>
               <div>Native American: ${props['DOJ_NH_Ind']}</div>
               <div>Hawaiian/Pacific Islander: ${props['DOJ_NH_Hwn']}</div>
               <div>Other: ${props['DOJ_NH_Oth']}</div>
               <div>Other Mixed Race: ${props['DOJ_NH_OthMR']}</div>
            </div>
        </div>
    </div>
</div>`
                : `<div>Hover over a region</div>`);
    };

    return box;
}
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

            const districtLabel = leaf
                .tooltip({
                    className: 'districtLabel',
                    content: feature.properties.DistrictName,
                    direction: 'center',
                    permanent: true,
                })
                .openTooltip();

            layer.bindTooltip(districtLabel);
        },
    });

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            color: 'black',
            fillColor: layer.options.color,
            weight: 5,
            dashArray: '',
            fillOpacity: 0.7,
        });

        layer.bringToFront();

        hoverInfoBox.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
        hoverInfoBox.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    return geojsonLayer;
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

    const districtLabel = leaf
        .tooltip({
            permanent: true,
        })
        .openTooltip();

    return {
        color,
        dashArray: '5',
        fillOpacity: 0.3,
    };
}
/* Make hover lines thinner 
add search bar*/