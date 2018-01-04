//定义每一格的固定长度宽度的全局变量
var width = 101;
var length = 83;

// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y, isBefore) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.isBefore = isBefore;
    this.speed = 50 + Math.random()*100;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt,x) {

    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    if(this.x >= width*5){
        this.x = -30;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';

};

//初始化
var count = 0;
var score = 0;
var blood = 5;

//检测碰撞函数。处理血量，修改提示信息，处理提示窗口，重置玩家位置
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
        if((Math.abs(this.y - allEnemies[i].y))<50){
            if((Math.abs(this.x - allEnemies[i].x))<61){
                document.getElementById("note").innerHTML = "啊哦！捉住了～🌝";
                blood = blood - 1;
                var s = "";
                if(blood > 0){
                    for(var i=0;i<blood;i++){
                        s += "︎♥";
                    }
                    document.getElementById("blood").innerHTML = s;
                }else{
                    s = "";
                    document.getElementById("blood").innerHTML = s;
                    document.getElementById("note").innerHTML = "没命了！";
                    document.getElementById("bingo").style.display = "block";
                }

                this.x =width*2;
                this.y =length*5;
            }
        }
    }
};

//更新玩家位置。检测碰撞，处理提示窗口，处理分数
Player.prototype.update = function (dt) {
    this.checkCollisions();
    if(this.y === 0){
        count++;
        //经过测试，经过3ms后，就可以实现到达河岸，并网页输出胜利指示，确定后，即可回到原位。
        if(count%3 === 2){
            document.getElementById("note").innerHTML = "不错。得分！😄";
            score = score + 200;
            document.getElementById("score").innerHTML = score;
            this.x = width*2;
            this.y = length*5;
        }
    }
};

//在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//处理键盘输入
Player.prototype.handleInput = function(movement){
    e = document.getElementById("bingo").style.display;
    switch (movement){
        case 'left':
            if (this.x > 0) {
                this.x -= width;
            } break;
        case 'right':
            if (this.x < width*4) {//404
                this.x += width;
            } break;
        case 'up':
            if (this.y > 0) {//55
                this.y -= length;
            } break;
        case 'down':
            if (this.y < width*4) {//606
                this.y += length;
            } break;
        case 'return':
            if(e == "block"){
                restart();
            }break;
    }

};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies=[];
for(var i=0;i<3;i++){
    var bug = new Enemy(-60,length*(i+1), true);
    var bugs = new Enemy(-120,length*(i+1), false);
    allEnemies.push(bug);
    allEnemies.push(bugs);
}

var player = new Player(width*2,length*5);

//主菜单及角色菜单的显示隐藏控制
function menu_list_over() {
    document.getElementById("menu_list").style.display = "block";
}
function menu_list_out() {
    document.getElementById("menu_list").style.display = "none";
}

function instruction_over() {
    document.getElementById("instruction").style.display = "block";
}
function instruction_out() {
    document.getElementById("instruction").style.display = "none";
}

function menu_role_over() {
    document.getElementById("menu_role").style.display = "block";
}
function menu_role_out() {
    document.getElementById("menu_role").style.display = "none";
}

//控制玩家角色的改变
function change_roles(role){
    for(i=1;i < 6;i++){
        var role_x = "btn-role"+i;
        var r = document.getElementById(role_x);
        if(role == i){
            r.style.backgroundColor = "#104008";
        }else {
            r.style.backgroundColor = "#206331";
        }
    }
    switch (role){
        case 1:
            player.sprite = 'images/char-boy.png';
            break;
        case 2:
            player.sprite = 'images/char-cat-girl.png';
            break;
        case 3:
            player.sprite = 'images/char-horn-girl.png';
            break;
        case 4:
            player.sprite = 'images/char-pink-girl.png';
            break;
        case 5:
            player.sprite = 'images/char-princess-girl.png';
            break;
    }
}

//游戏重置
function restart() {
    blood = 5;
    score = 0;
    count = 0;
    var s = "";
    for(var i=0;i<blood;i++){
        s += "︎♥";
    }
    document.getElementById("blood").innerHTML = s;
    document.getElementById("bingo").style.display = "none";
    document.getElementById("score").innerHTML = score;
    document.getElementById("note").innerHTML = "再来一次！😏";
    player.x = width*2;
    player.y = length*5;
    for(var i = 0; i < allEnemies.length; i++){
        var en = allEnemies[i];
        en.speed = 50 + Math.random()*100;
        en.x = en.isBefore ? -60:-120;
    }
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'return',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});