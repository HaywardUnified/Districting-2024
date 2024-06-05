import leaf from 'leaflet';

// Map tiles
const baseLayers = {
    Digital: leaf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
            '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
    }),
    Hybrid: leaf.tileLayer(
        'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        {
            attribution:
                '&copy; <a target="_blank" href="https://policies.google.com/">Google</a>',
            maxZoom: 19,
        }
    ),
    Satellite: leaf.tileLayer(
        'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
            attribution:
                '&copy; <a target="_blank" href="https://policies.google.com/">Google</a>',
            maxZoom: 19,
            minZoom: 10,
        }
    ),
};

export default baseLayers;
