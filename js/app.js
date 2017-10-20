'strict mode'
// 工具库对象
var util = {
    // 随机生成敌人参数
    randomEnemyParm: function() {
        var numForY,
            numForSpeed,
            // y轴固定位置
            yLoc = [230, 145, 60];
        // 随机y轴
        numForY = Math.floor(Math.random() * 3);
        // 随机速度
        numForSpeed = Math.floor(Math.random() * 3 + 1) * 100;
        return [yLoc[numForY], numForSpeed];
    }
}
var test1 = 1; //just want test arc
var test1 = 1; //just want test arc

//常量
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    // 敌人移动速度
    this.speed = speed;

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + this.speed * dt;
    // 敌人超出屏幕
    if (this.x >= 606) {
        // 重置敌人
        this.x = -TILE_WIDTH;
        var array = util.randomEnemyParm();
        this.y = array[0];
        this.speed = array[1];
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
var Player = function(x, y) {
    // 继承Enemy类
    Enemy.call(this, x, y);
    this.sprite = 'images/char-boy.png';
}

// 继承Enemy原型方法
Player.prototype = Object.create(Enemy.prototype);

// 构造器指向Player类
Player.constructor = Player;

// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.update = function() {
    // 不需要更新
};

Player.prototype.handleInput = function(direction) {
    // 移动玩家角色
    switch(direction) {
        case 'left':
            if (this.x - TILE_WIDTH >= 0) {
                this.x -= TILE_WIDTH;
            }
            break;
        case 'up':
            if (this.y - TILE_HEIGHT >= 0) {
                this.y -= TILE_HEIGHT;
            } else {
                // 赢得游戏，重置位置
                ctx.font = '30px Courier New';
                ctx.fillStyle = 'red';
                ctx.fillText('YOU WIN!', 190, 30);
                setTimeout(function() {
                    ctx.clearRect(190,0,150,35);
                }, 2000)
                this.x = 202;
                this.y = 390;
            }
            break;
        case 'right':
            if (this.x + TILE_WIDTH <= 404) {
                this.x += TILE_WIDTH;
            }
            break;
        case 'down':
            if (this.y + TILE_HEIGHT <= 390) {
                this.y += TILE_HEIGHT;
            }
            break;
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    var array = util.randomEnemyParm();
    allEnemies.push(new Enemy(-TILE_WIDTH, array[0], array[1]));
}

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(202,390);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
