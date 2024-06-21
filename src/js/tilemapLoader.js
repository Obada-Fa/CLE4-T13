export async function loadTilemap(xmlPath) {
    const response = await fetch(xmlPath);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'application/xml');

    const map = xmlDoc.getElementsByTagName('map')[0];
    const tileset = xmlDoc.getElementsByTagName('tileset')[0];
    const layer = xmlDoc.getElementsByTagName('layer')[0];
    const data = layer.getElementsByTagName('data')[0].textContent.trim().split(',');

    return {
        width: parseInt(map.getAttribute('width')),
        height: parseInt(map.getAttribute('height')),
        tileWidth: parseInt(map.getAttribute('tilewidth')),
        tileHeight: parseInt(map.getAttribute('tileheight')),
        tiles: data.map(Number),
        tilesetImageSource: tileset.getAttribute('source')
    };
}
