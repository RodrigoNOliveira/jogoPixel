

export default class Player extends Phaser.Physics.Arcade.Sprite{
    /**@type {Phaser.Type.Input.Keyboard.CursorKeys} */
    cursors;


    constructor(scene, x, y){
        super(scene, x, y, 'player');

        scene.add.existing(this);               //criando a img que o jogador ve
        scene.physics.add.existing(this);       //criando o body da fisica



        this.init();
    }

    init(){
        this.setFrame(3);
        this.speed =120;
        this.frameRate = 8;
        this.direction = 'down';
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.initAnimations();


        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

        //this.play('idle-right');
        //this.play('idle-up');
        //this.play('idle-left');
        //this.play('idle-down');
        //this.play('walk-right');
        //this.play('walk-up');
        //this.play('walk-left');
        //this.play('walk-down');

    }

    update(){
        const { left, right, down, up} = this.cursors;

        if (left.isDown){
            this.direction ='left';
            this.setVelocityX(-this.speed);
        } else if (right.isDown){
            this.direction ='right';
            this.setVelocityX(this.speed);
        } else{
            this.setVelocityX(0);
        }

        if (down.isDown){
            this.direction ='down';
            this.setVelocityY(this.speed);
        } else if (up.isDown){
            this.direction ='up';
            this.setVelocityY(-this.speed);
        } else{
            this.setVelocityY(0);
        }


        if(this.body.velocity.x ===0 && this.body.velocity.y ===0){
            this.play('idle-' + this.direction, true);
        } else{
            this.play('walk-' + this.direction, true);
        }


    }

    initAnimations(){
        //idle
        this.anims.create({
            key: 'idle-right',
            frames: this.anims.generateFrameNumbers('player', {start: 4,end:9 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'idle-up',
            frames: this.anims.generateFrameNumbers('player', {start: 10,end:15 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'idle-left',
            frames: this.anims.generateFrameNumbers('player', {start: 16,end:21 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'idle-down',
            frames: this.anims.generateFrameNumbers('player', {start: 22,end:27 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });



        //WALK
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('player', {start: 28,end:33 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });

        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('player', {start: 34,end:39 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('player', {start: 40,end:45 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('player', {start: 46,end:51 }),
            frameRate: this
            .frameRate,
            repeat: -1
        });

    }

}
