import '../style/style.scss';
import blueMarker from '../style/icons/blue_marker.png';
import greenMarker from '../style/icons/green_marker.png';
import yellowMarker from '../style/icons/yellow_marker.png';
import redMarker from '../style/icons/red_marker.png';
import markerShadow from '../style/icons/marker-shadow.png';
import '../../node_modules/leaflet/dist/leaflet.css';

import baseLayers from './baseLayers';
import leaf from 'leaflet';

const STARTING_COORDINATES = [37.63837551672515, -122.09706577524128];
// Load and process data
const mapBaseLayers = insertNoneLayer(generateMapLayers(loadBaseLayers()));
const overlayCollection = generateOverlays(loadOverlays());

// Load Map
const map = leaf.map('map', {
    center: STARTING_COORDINATES,
    layers: [baseLayers['Digital'], mapBaseLayers['Draft A']],
    zoom: 12,
});

// Insert map controls
const mapControls = createControls(baseLayers).setPosition('bottomleft');
const baseLayerControls = createControls(mapBaseLayers, overlayCollection, {
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
        <div data-pct=${props['PercentAsian']}>Asian (${props['PercentAsian']}%): ${props['DOJ_NH_Asn']}</div>
        <div data-pct=${props['PercentBlack']}>Black (${props['PercentBlack']}%): ${props['DOJ_NH_Blk']}</div>
        <div data-pct=${props['PercentLatinoPop']}>Latino (${props['PercentLatinoPop']}%): ${props['Hispanic Origin']}</div>
        <div data-pct=${props['PercentWhitePop']}>White (${props['PercentWhitePop']}%): ${props['NH_Wht']}</div>
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
function loadBaseLayers() {
    const context = require.context(
        '../datafiles/baseLayers',
        true,
        /\.geojson$/
    );
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
 * Load and convert .geojson files to geo Feature Collections
 * @returns - object containing geo feature collection
 */
function loadOverlays() {
    const context = require.context(
        '../datafiles/overlays',
        true,
        /\.geojson$/
    );
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
function generateMapLayers(collections) {
    const overlays = {};

    collections.forEach((collection) => {
        const geoJSONobj = applyFeatureOptions(collection);
        const layerGroup = leaf.layerGroup([geoJSONobj]);
        overlays[`${collection.name}`] = layerGroup;
    });

    return overlays;
}

function generateOverlays(collections) {
    const markers = [];

    // extract properties
    collections.forEach((collection) => {
        collection.features.forEach((feature) => {
            markers.push(feature.properties);
        });
    });

    const overlays = {};

    // sort markers by school type and store them as markers
    markers.forEach((marker) => {
        const type = marker.School_Typ;
        const coords = marker.latlong.split(',');
        const pin = leaf
            .marker(coords, markerOptions(marker))
            .bindTooltip(
                `${marker.School_Nam} ${
                    marker.School_Typ === 'Other' ? '' : marker.School_Typ
                }`
            );

        if (overlays.hasOwnProperty(type)) {
            overlays[type].push(pin);
        } else {
            overlays[type] = [pin];
        }
    });

    // group markers into layerGroups
    Object.keys(overlays).forEach((key) => {
        const layerGroup = leaf.layerGroup([...overlays[key]]);
        overlays[key] = layerGroup;
    });

    return overlays;
}

function markerOptions(marker) {
    let mapMarker;

    switch (marker.School_Typ) {
        case 'Elementary School':
            mapMarker = greenMarker;
            break;
        case 'Middle School':
            mapMarker = yellowMarker;
            break;
        case 'High School':
            mapMarker = redMarker;
            break;
        case 'Other':
            mapMarker = blueMarker;
            break;
    }
    var markerIcon = L.icon({
        iconUrl: mapMarker,
        shadowUrl: markerShadow,

        iconSize: [25, 35], // size of the icon
        iconAnchor: [0, 35], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 40],
        popupAnchor: [0, 0],
        tooltipAnchor: [0, 0],
    });

    return {
        icon: markerIcon,
    };
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
                click: mouseClick,
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
            weight: 2,
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

    function mouseClick(e) {
        const layer = e.target;
        map.panTo(layer.getCenter());
        hoverInfoBox.update(layer.feature.properties); // applies to mobile click
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
        fillOpacity: 0.4,
        weight: 2,
    };
}
