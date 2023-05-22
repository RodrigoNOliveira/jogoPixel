import { CONFIG } from "../config";


export default class Player extends Phaser.Physics.Arcade.Sprite{
    /**@type {Phaser.Type.Input.Keyboard.CursorKeys} */
    cursors;


    isAction = false;

    constructor(scene, x, y, touch){
        super(scene, x, y, 'lixeira');


        scene.add.existing(this);               //criando a img que o jogador ve
        scene.physics.add.existing(this);       //criando o body da fisica


        this.init();
    }


    init(){
        this.setFrame(3);

        this.initAnimations();
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);



    }

    update(){
        const {space} = this.cursors;


       
        if(space.isDown){
            this.isAction = true;
        }
        else{
            this.isAction = false;
        }



    }

    initAnimations(){
        //abertaAzul
        this.anims.create({
            key: 'abertaAzul',
            frames: this.anims.generateFrameNumbers('lixeira', 4),
            frameRate: this
            .frameRate,
            repeat: -1
        });

        //abertaAmarela
        this.anims.create({
            key: 'abertaAmarela',
            frames: this.anims.generateFrameNumbers('lixeira', 1),
            frameRate: this
            .frameRate,
            repeat: -1
        });
         //cheiaAzul
         this.anims.create({
            key: 'cheiaAzul',
            frames: this.anims.generateFrameNumbers('lixeira', 5),
            frameRate: this
            .frameRate,
            repeat: -1
        });

        //cheiaAmarela
        this.anims.create({
            key: 'cheiaAmarela',
            frames: this.anims.generateFrameNumbers('lixeira', 2),
            frameRate: this
            .frameRate,
            repeat: -1
        });

         //fechadaAzul
         this.anims.create({
            key: 'fechadaAzul',
            frames: this.anims.generateFrameNumbers('lixeira', 5),
            frameRate: this
            .frameRate,
            repeat: -1
        });

        //fechadaAmarela
        this.anims.create({
            key: 'fechadaAmarela',
            frames: this.anims.generateFrameNumbers('lixeira', 2),
            frameRate: this
            .frameRate,
            repeat: -1
        });


    }

}
