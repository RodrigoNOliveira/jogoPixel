import { Scene } from "phaser";
import { CONFIG } from "../config";
import HUD from "../entities/HUD";


export default class Lab2 extends Scene {


    /**@type {Phaser.Tilemaps.Tilemap} */
    map;

    layers = {};
    hud;


    spaceDown = false;


    constructor() {
        super('Lab2');
    }

    preload() {
        // Carregar os dados do mapa
        this.load.tilemapTiledJSON('tilemap-lab-info', 'mapas/lab_info1.json');

        // Carregar os tilesets do map (as imagens)
        this.load.image('tiles-office', 'mapas/tiles/tiles_office.png');

        this.load.atlas('hud', 'mapas/tiles/hud.png', 'mapas/tiles/hud.json');

    }

    create() {

        this.cursors = this.input.keyboard.createCursorKeys();

        this.createMap();
        this.createLayers();

        this.hud = new HUD(this, 0, 0);



    }

    update() {
        const { space } = this.cursors;

        if (space.isDown && !this.spaceDown) {
            this.spaceDown = true;
            console.log("espaço");
            this.hud.showDialog('Este é o texto que deve aparecer na caixa de dialogo, por favor coloquem um texto grande aqui para que ele use varias linhas.');
        } else if (!space.isDown && this.spaceDown) {
            this.spaceDown = false;
        }
    }

    createMap() {
        this.map = this.make.tilemap({
            key: 'tilemap-lab-info',
            tileWidth: CONFIG.TILE_SIZE,
            tileHeight: CONFIG.TILE_SIZE
        });

        //Fazendo a correspondencia entre as imagens usadas no Tiled
        // e as carregadas pelo Phaser
        this.map.addTilesetImage('tiles_office', 'tiles-office');

    }

    createLayers() {
        const tilesOffice = this.map.getTileset('tiles_office');

        const layerNames = this.map.getTileLayerNames();
        for (let i = 0; i < layerNames.length; i++) {
            const name = layerNames[i];

            this.layers[name] = this.map.createLayer(name, [tilesOffice], 0, 0);
            this.layers[name].setDepth(i);
        }
    }


}