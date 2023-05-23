import { Scene } from "phaser";
import { CONFIG } from "../config";


export default class Lab2 extends Scene {


    /**@type {Phaser.Tilemaps.Tilemap} */
    map;

    layers = {};

    /**@type {Phaser.GameObjects.Container} */
    dialog;

    /**@type {Phaser.GameObjects.Text} */
    dialogText;

    /**@type {Phaser.GameObjects.Sprite} */
    dialogNext;

    dialogPositionShow;
    dialogPositionHide;


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
        this.createMap();
        this.createLayers();

        this.createDialog();
        this.showDialog('Este é o texto que deve aparecer na caixa de dialogo, por favor coloquem um texto grande aqui para que ele use varias linhas.');
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


    createDialog() {
        this.dialog = this.add.container(0, 0).setDepth(10);

        const tile = CONFIG.TILE_SIZE;
        const widthDialog = CONFIG.GAME_WIDTH - (2 * tile);
        const heightDialog = 3 * tile;

        this.dialogPositionShow = CONFIG.GAME_HEIGHT - heightDialog - tile * 2;
        this.dialogPositionHide = CONFIG.GAME_HEIGHT + tile;



        this.dialog.add([
            this.add.image(0, 0, 'hud', 'dialog_topleft'),
            this.add.image(16, 0, 'hud', 'dialog_top').setDisplaySize(widthDialog, tile),
            this.add.image(widthDialog + tile, 0, 'hud', 'dialog_topright'),

            this.add.image(0, 16, 'hud', 'dialog_left').setDisplaySize(tile, heightDialog),
            this.add.image(16, 16, 'hud', 'dialog_center').setDisplaySize(widthDialog, heightDialog),
            this.add.image(widthDialog + tile, 16, 'hud', 'dialog_right').setDisplaySize(tile, heightDialog),

            this.add.image(0, heightDialog + tile, 'hud', 'dialog_bottomleft'),
            this.add.image(16, heightDialog + tile, 'hud', 'dialog_bottom').setDisplaySize(widthDialog, tile),
            this.add.image(widthDialog + tile, heightDialog + tile, 'hud', 'dialog_bottomright'),


        ]);

        this.dialog.setPosition(0, this.dialogPositionHide);


        const style = {
            fontFamily: 'Verdana',
            fontSize: 11,
            color: '#6b5052',
            maxLines: 3,
            wordWrap: { width: widthDialog }

        }

        this.dialogText = this.add.text(tile, tile, 'Meu texto', style);
        this.dialog.add(this.dialogText);
    }



    showDialog(text) {
        this.dialogText.text = '';

        //verifica se ele esta fora da tela
        if(this.dialog.y > this.dialogPositionShow){
            this.add.tween({
                targets: this.dialog,
                duration: 400,
                y: this.dialogPositionShow,
                ease: Phaser.Math.Easing.Back.Out,
                onComplete:()=>{
                    this.showText(text);
                }
            });
        }else{
            this.showText(text);
        }

    }


    showText(text){
        // this.dialogText.text = text;
        let i = 0;
        this.time.addEvent({
            repeat: text.length -1,
            delay: 32,
            callback: () =>{
                this.dialogText.text += text[i++]
            }
        })
    }

}