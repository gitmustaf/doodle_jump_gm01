document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    const leftButton = document.createElement('button');
    const rightButton = document.createElement('button');
    const restartButton = document.createElement('button');

    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let platformCount = 5;
    let platformHeight = 600;
    let isGameOver = false;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let score = 0;

    function craeteDooler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }

    function careteButtons(){
        grid.appendChild(leftButton);
        leftButton.classList.add('button');
        leftButton.innerHTML = "Go Left";
        leftButton.style.left = '20px';
        leftButton.style.top = '610px';
        leftButton.onclick = () => moveLeft();

        grid.appendChild(rightButton);
        rightButton.classList.add('button');
        rightButton.innerHTML = "Go Right";
        rightButton.style.left = '320px';
        rightButton.style.top = '610px';
        rightButton.onclick = () => moveRight();
    }

    class Platform {
        constructor(newPlatformBottom){
            this.bottom = newPlatformBottom;
            this.left = Math.random()*315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);

        }
    }

    function createPlatforms(){
        for(let i=0; i<platformCount; i++){
            let platformGap = platformHeight / platformCount;
            let newPlatformBottom = 100 + i * platformGap;
            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
            // console.log("inside the create platform loop" + i)
        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace > 200){
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

                if(platform.bottom < 10){
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    platforms.shift();
                    score++;
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump(){
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(() =>{
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace > startPoint + 200){
                fall();
            }
        },30)
    }

    function fall(){
        clearInterval(upTimerId)
        isJumping = false;
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace <= 0){
                gameOver();
            }
            platforms.forEach(platform => {
                if(
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log("landed");
                    startPoint = doodlerBottomSpace;
                    jump();
                }
            })
        }, 30)
    }

    function gameOver(){
        console.log("Game Over");
        isGameOver = true;
        while(grid.firstChild){
            grid.removeChild(grid.firstChild);
        }
        grid.innerHTML = score;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);

        grid.appendChild(restartButton);
        restartButton.classList.add('button');
        restartButton.innerHTML = "Play Again";
        restartButton.style.left = '150px';
        restartButton.style.top = '310px';
        restartButton.onclick = () => {
            alert("Work in progress, Please refresh to play again");
            // grid.removeChild(grid.);
            // isGameOver = false;
            // startGame();

        }
    }

    function control(e) {
        if(e.key === "ArrowLeft"){
            moveLeft();
        } else if(e.key === "ArrowRight"){
            moveRight();
        } else if(e.key === "ArrowUp"){
            moveStraight();
        }
    }

    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(() => {
            if(doodlerLeftSpace >= 0){
                doodlerLeftSpace -= 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            } else moveRight();
        },20);
    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimerId)
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(() => {
            if(doodlerLeftSpace <= 340){
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            } else moveLeft();
        },20);
    }

    function moveStraight(){
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }

    function startGame(){
        if(!isGameOver){
            createPlatforms();
            craeteDooler();
            careteButtons();
            setInterval(movePlatforms, 30);
            jump();
            document.addEventListener('keyup',control);
        }
    }
    //attach start to a button
    startGame();
});