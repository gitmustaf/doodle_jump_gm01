document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let platformCount = 5;
    let platformHeight = 600;
    let isGameOver = false;
    let platforms = [];
    let upTimerId;
    let downTimerId;

    function craeteDooler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }
    craeteDooler();

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
            })
        }
    }

    function jump(){
        clearInterval(downTimerId);
        upTimerId = setInterval(() =>{
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace > 350){
                fall();
            }
        },30)
    }

    function fall(){
        clearInterval(upTimerId)
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace <= 0){
                gameOver();
            }
        }, 30)
    }

    function gameOver(){
        console.log("Game Over");
        isGameOver = true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
    }

    function startGame(){
        if(!isGameOver){
            craeteDooler();
            createPlatforms();
            setInterval(movePlatforms, 30);
            jump();
        }
    }
    //attach start to a button
    startGame();
});