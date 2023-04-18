import { Scene } from "phaser";
import { CONFIG } from "../config";
import Player from "../entities/Player";

export default class Lab extends Scene {

    /**@type {Phaser.Tilemaps.Tilemap} */
    map;
    layers;


    /**@type {Player} */
    player;





    constructor() {
        super('Lab');
    }

    preload() {
        // Carregar os dados do mapa
        this.load.tilemapTiledJSON('tilemap-lab-info', 'mapas/lab_info1.json');

        // Carregar os tilesets do map (as imagens)
        this.load.image('tiles-office', 'mapas/tiles/tiles_office.png');


        //Importando um spritesheet
        this.load.spritesheet('player', 'mapas/tiles/RodrigoNathan.png', {
            frameWidth: CONFIG.TILE_SIZE,
            frameHeight: CONFIG.TILE_SIZE *2
        })
    }

    create(){
        this.createMap();
        this.createLayers();
        this.player = new Player(this, 144, 90);

        this.createCamera();
    }

    update(){
        
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
        const tilesOffice = this.map.getTileset('tiles_office')

        this.map.createLayer('nivel0', [tilesOffice], 0, 0);
        this.map.createLayer('nivel 1', [tilesOffice], 0, 0);
        this.map.createLayer('nivel1_1', [tilesOffice], 0, 0);
        this.map.createLayer('nivel2_1', [tilesOffice], 0, 0);
        this.map.createLayer('nivel2', [tilesOffice], 0, 0);
        
    }

    createCamera(){
        const mapWidth = this.map.width * CONFIG.TILE_SIZE;
        const mapHeigth =  this.map.height * CONFIG.TILE_SIZE;

        this.cameras.main.setBounds(0,0, mapWidth, mapHeigth);
        this.cameras.main.startFollow(this.player);
    }
}