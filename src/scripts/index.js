<<<<<<< HEAD
/*

New Map Instructions:
When adding a new map to the baseLayers folder make sure to update the filename on line 26 (if the new file is the default layer).

The same thing applies to renaming baseLayers, always make sure to update line 26 if the renamed file will serve as the default/pre-selected layer.

*/
import '../style/style.scss';
import blueMarker from '../style/icons/blue_marker.png';
import greenMarker from '../style/icons/green_marker.png';
import yellowMarker from '../style/icons/yellow_marker.png';
import redMarker from '../style/icons/red_marker.png';
import markerShadow from '../style/icons/marker-shadow.png';
<<<<<<< HEAD
=======
import '../style/style.scss';
>>>>>>> d537c09 (hover effects)
=======
>>>>>>> fffa552 (pins)
import '../../node_modules/leaflet/dist/leaflet.css';

import baseLayers from './baseLayers';
import leaf from 'leaflet';
<<<<<<< HEAD
<<<<<<< HEAD

const STARTING_COORDINATES = [37.63837551672515, -122.09706577524128];
// Load and process data
const mapBaseLayers = insertNoneLayer(generateMapLayers(loadBaseLayers()));
const overlayCollection = generateOverlays(loadOverlays());
=======
import { insertNoneLayer, generateMapOverlays } from './overlays';
=======
>>>>>>> 4660563 (hover interactivity)

const STARTING_COORDINATES = [37.63837551672515, -122.09706577524128];
// Load and process data
<<<<<<< HEAD
const geoFeatureCollections = loadFiles(); // All available geoJSON files
const mapBaseOverlays = insertNoneLayer(
    generateMapOverlays(geoFeatureCollections)
);
>>>>>>> d537c09 (hover effects)
=======
const mapBaseLayers = insertNoneLayer(generateMapLayers(loadBaseLayers()));
const overlayCollection = generateOverlays(loadOverlays());
>>>>>>> 50d46fb (markers)

// Load Map
const map = leaf.map('map', {
    center: STARTING_COORDINATES,
<<<<<<< HEAD
<<<<<<< HEAD
    layers: [baseLayers['Digital'], mapBaseLayers['Modified Final Map A']],
=======
    layers: [baseLayers['Digital'], mapBaseOverlays['Draft A']],
>>>>>>> d537c09 (hover effects)
=======
    layers: [baseLayers['Digital'], mapBaseLayers['Draft A']],
>>>>>>> 50d46fb (markers)
    zoom: 12,
});

// Insert map controls
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
const baseLayerControls = createControls(baseLayers).setPosition('bottomleft');
const mapOverlayControls = createControls(mapBaseOverlays, null, {
=======
const mapControls = createControls(baseLayers).setPosition('bottomleft');
const baseLayerControls = createControls(mapBaseLayers, overlayCollection, {
>>>>>>> 50d46fb (markers)
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

<<<<<<< HEAD
console.log(geoFeatureCollections);
>>>>>>> d537c09 (hover effects)

=======
>>>>>>> 50d46fb (markers)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 50d46fb (markers)
function loadBaseLayers() {
    const context = require.context(
        '../datafiles/baseLayers',
        true,
        /\.geojson$/
    );
<<<<<<< HEAD
=======
function loadFiles() {
    const context = require.context('../datafiles/', true, /\.geojson$/);
>>>>>>> d537c09 (hover effects)
=======
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
>>>>>>> 50d46fb (markers)
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
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
>>>>>>> 4660563 (hover interactivity)

function insertNoneLayer(collection) {
    collection['None'] = leaf.layerGroup();
    return collection;
}

/**
 * Convert feature collections into layer groups
 * @param {*} collections - array of feature collections (each feature collection contains an array of features/layers)
 * @return - object containing geoJSON map overlays
 */
<<<<<<< HEAD
<<<<<<< HEAD
function generateMapLayers(collections) {
=======
function generateMapOverlays(collections) {
>>>>>>> 4660563 (hover interactivity)
=======
function generateMapLayers(collections) {
>>>>>>> 50d46fb (markers)
    const overlays = {};

    collections.forEach((collection) => {
        const geoJSONobj = applyFeatureOptions(collection);
        const layerGroup = leaf.layerGroup([geoJSONobj]);
        overlays[`${collection.name}`] = layerGroup;
    });

    return overlays;
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 50d46fb (markers)
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
<<<<<<< HEAD
        const pin = leaf
            .marker(coords, markerOptions(marker))
            .bindTooltip(
                `${marker.School_Nam} ${
                    marker.School_Typ === 'Other' ? '' : marker.School_Typ
                }`
            );
=======
        const pin = leaf.marker(coords, markerOptions(marker));
>>>>>>> 50d46fb (markers)

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fffa552 (pins)
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

<<<<<<< HEAD
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

=======
>>>>>>> 4660563 (hover interactivity)
=======
    console.log(marker);
=======
        iconSize: [25, 41], // size of the icon
        iconAnchor: [0, 41], // point of the icon which will correspond to marker's location
    });
>>>>>>> fffa552 (pins)

    return {
        icon: markerIcon,
    };
}

>>>>>>> 50d46fb (markers)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c340105 (mobile click)
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
=======
                click: zoomToFeature,
            });
<<<<<<< HEAD
>>>>>>> 4660563 (hover interactivity)
=======

            const districtLabel = leaf
                .tooltip({
                    className: 'districtLabel',
                    content: feature.properties.DistrictName,
                    direction: 'center',
                    permanent: true,
                })
                .openTooltip();

            layer.bindTooltip(districtLabel);
>>>>>>> 3616c9b (hover interactivity and demographics)
        },
    });

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
<<<<<<< HEAD
<<<<<<< HEAD
            color: 'black',
            fillColor: layer.options.color,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1e90a20 (thinner hover borders)
            weight: 2,
            dashArray: '',
            fillOpacity: 0.7,
        });

        layer.bringToFront();

        hoverInfoBox.update(layer.feature.properties);
=======
=======
            color: 'black',
            fillColor: layer.options.color,
>>>>>>> 3616c9b (hover interactivity and demographics)
            weight: 4,
=======
            weight: 5,
>>>>>>> 4b0eca6 (style)
            dashArray: '',
            fillOpacity: 0.7,
        });

        layer.bringToFront();
<<<<<<< HEAD
>>>>>>> 4660563 (hover interactivity)
=======

        hoverInfoBox.update(layer.feature.properties);
>>>>>>> 6b513e6 (hover div)
    }

    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
<<<<<<< HEAD
<<<<<<< HEAD
        hoverInfoBox.update();
    }

    function mouseClick(e) {
        const layer = e.target;
        map.panTo(layer.getCenter());
        hoverInfoBox.update(layer.feature.properties); // applies to mobile click
<<<<<<< HEAD
=======
=======
        hoverInfoBox.update();
>>>>>>> 6b513e6 (hover div)
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
>>>>>>> 4660563 (hover interactivity)
=======
>>>>>>> c340105 (mobile click)
    }

    return geojsonLayer;
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
function hoverPopUp(feature, layer) {
    layer.bindTooltip(feature.properties.DistrictName);
}

>>>>>>> 4660563 (hover interactivity)
=======
>>>>>>> 6b513e6 (hover div)
function styleFeature(feature) {
    let color;

    switch (feature.properties.DistrictName) {
        case 'A':
<<<<<<< HEAD
        case '1':
            color = '#003049';
            break;
        case 'B':
        case '2':
            color = '#D62828';
            break;
        case 'C':
        case '4':
            color = '#F77F00';
            break;
        case 'D':
        case '3':
            color = '#0f7b0a';
            break;
        case 'E':
        case '5':
=======
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
>>>>>>> 4660563 (hover interactivity)
            color = '#BC34E6';
            break;
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3616c9b (hover interactivity and demographics)
    const districtLabel = leaf
        .tooltip({
            permanent: true,
        })
        .openTooltip();

<<<<<<< HEAD
    return {
        color,
        dashArray: '5',
        fillOpacity: 0.4,
        weight: 2,
    };
}
=======
>>>>>>> d537c09 (hover effects)
=======
=======
>>>>>>> 3616c9b (hover interactivity and demographics)
    return {
        color,
        dashArray: '5',
        fillOpacity: 0.4,
        weight: 2,
    };
}
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 4660563 (hover interactivity)
=======
/* Make hover lines thinner 
add search bar*/
>>>>>>> 9288d5c (notes)
=======
>>>>>>> 1e90a20 (thinner hover borders)
