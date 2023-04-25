import { Scene } from "phaser";
import { CONFIG } from "../config";
import Player from "../entities/Player";
import Touch from "../entities/Touch";

export default class Lab extends Scene {

    /**@type {Phaser.Tilemaps.Tilemap} */
    map;

    layers = {};

    /**@type {Player} */
    player;

    touch;


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
        this.createPlayer();

        this.createColliders();
        this.createCamera();
    }

    update(){
        

    }


    createPlayer(){
        this.touch = new Touch(this, 16*8, 16*5);
        
        this.player = new Player(this, 16*8, 16*5, this.touch);
        this.player.setDepth(2);


        
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
        for (let i = 0; i < layerNames.length; i++){
            const name = layerNames[i];
            
            this.layers[name] = this.map.createLayer(name, [tilesOffice], 0,0);
            this.layers[name].setDepth( i );


            //verifica se o layer possui colisão
            if(name.endsWith('Collision')){
                this.layers[name].setCollisionByProperty({collide: true});

                if ( CONFIG.DEBUG_COLLISION ) {
                    const debugGraphics = this.add.graphics().setAlpha(0.75).setDepth(i);
                    this.layers[name].renderDebug(debugGraphics, {
                        tileColor: null, // Color of non-colliding tiles
                        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
                    });
                }

            }

        }

        
        
    }


    createLayersManual() {
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


    createColliders(){
        const layerNames = this.map.getTileLayerNames();
        for (let i = 0; i < layerNames.length; i++){
            const name = layerNames[i];

            if(name.endsWith('Collision')){
                this.physics.add.collider(this.player, this.layers[name]);
            }

        }

    }

}