import { Physics, Scene } from "phaser";
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

    /**@type {Phaser.Physics.Arcade.Group} */
    groupObjects;

    isTouching = false;

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
            frameHeight: CONFIG.TILE_SIZE * 2
        })
    }

    create() {
        this.createMap();
        this.createLayers();

        this.createPlayer();
        this.createObjects();
        this.createColliders();
        this.createCamera();
    }

    update() {


    }


    createPlayer() {
        this.touch = new Touch(this, 16 * 8, 16 * 5);

        this.player = new Player(this, 16 * 8, 16 * 5, this.touch);
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


    createObjects() {
        this.groupObjects = this.physics.add.group();

        const objects = this.map.createFromObjects("Objeto", {
            name: "cadeira",
        })

        this.physics.world.enable(objects);

        for (let i = 0; i < objects.length; i++) {
            const obj = objects[i];

            const prop = this.map.objects[0].objects[i];

            obj.setDepth(this.layers.length + 1);
            obj.setVisible(false);

            this.groupObjects.add(obj);
            console.log(obj);
        }




    }


    createLayers() {
        const tilesOffice = this.map.getTileset('tiles_office');

        const layerNames = this.map.getTileLayerNames();
        for (let i = 0; i < layerNames.length; i++) {
            const name = layerNames[i];

            this.layers[name] = this.map.createLayer(name, [tilesOffice], 0, 0);
            this.layers[name].setDepth(i);


            //verifica se o layer possui colisão
            if (name.endsWith('Collision')) {
                this.layers[name].setCollisionByProperty({ collide: true });

                if (CONFIG.DEBUG_COLLISION) {
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

    createCamera() {
        const mapWidth = this.map.width * CONFIG.TILE_SIZE;
        const mapHeigth = this.map.height * CONFIG.TILE_SIZE;

        this.cameras.main.setBounds(0, 0, mapWidth, mapHeigth);
        this.cameras.main.startFollow(this.player);
    }


    createColliders() {
        //diferenca entre collider e overlap:
        //COLLIDER: colide e impede a passagem
        //OVERLAP: detecta a sobreposição dos elemetos, não impede a passagem



        //criando colisao entre o player e as camadas de colisao do tiled
        const layerNames = this.map.getTileLayerNames();
        for (let i = 0; i < layerNames.length; i++) {
            const name = layerNames[i];

            if (name.endsWith('Collision')) {
                this.physics.add.collider(this.player, this.layers[name]);
            }

        }
        //criando a colisao entre a "maozinha" do player (touch) e os objetos da camada de objetos

        //chama a funcao this.handleTouch toda vez que o this.touch entrar em contato com um objeto do this.groupObjects
        this.physics.add.overlap(this.touch, this.groupObjects, this.handleTouch, undefined, this);
    }


    handleTouch(touch, object) {

        if (this.isTouching && this.player.isAction) {
            return;
        }

        if (this.isTouching && !this.player.isAction) {
            this.isTouching = false;
            return;
        }

        if (this.player.isAction) {
            this.isTouching = true;
            if (object.name == "cadeira") {

                if (this.player.body.enable == true) {
                    this.player.body.enable = false;
                    this.player.x = object.x - 8;
                    this.player.y = object.y - 8;

                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.UP);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
                    this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

                    this.player.direction = 'up';
                    this.player.setDepth(0);

                    
                } else {
                    console.log("TESTE")
                    this.player.body.enable = true;
                    this.player.x = object.x +8;
                    this.player.y = object.y  +8;
                    this.player.cursors = this.input.keyboard.addKeys({
                        up: Phaser.Input.Keyboard.KeyCodes.UP,
                        down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                        right: Phaser.Input.Keyboard.KeyCodes.RIGHT, 
                        space: Phaser.Input.Keyboard.KeyCodes.SPACE
                    });
                    this.player.setDepth(2);
                }
            }

        }


    }


}