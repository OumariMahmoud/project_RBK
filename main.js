for (var i = 0; i < 51; i++) {
    var star = document.createElement("div");
    star.innerText = "\u2606";
    star.style.position = "absolute";
    star.style.right = Math.random() * 100 + "vw";
    star.style.bottom = Math.random() * 100 + "vh";
    star.style.fontSize = Math.random() * 14 + 10 + "px";
    star.style.opacity = Math.random();
    star.style.color = "white";
    document.body.appendChild(star);
}
// this is project player of star
for (var i = 0; i < 7; i++) {
    var cloud = document.createElement("div");
    cloud.innerText = "\u2601\uFE0F";
    cloud.style.position = "fixed";
    cloud.style.left = Math.random() * 70 + "vw";
    cloud.style.bottom ="80vh";
    cloud.style.fontSize = Math.random() * 14 + 80 + "px";
    cloud.style.color = "white";
    document.body.appendChild(cloud);
}
function Hard(core) {
    var hardcore = core;
    obj = {}
    obj["hardcore"] = hardcore;
    obj["mil"] = () =>{
        hardcore = hardcore-1;
        document.getElementById("hard").innerHTML = "";
        for (var i = 0; i < hardcore; i++) {
            var create = document.createElement("div");
            create.innerText = "❤️";
            create.style.position = "absolute";
            create.style.left = (100/hardcore)*(i) + "%";
            create.style.fontSize ="50px";
            create.style.color = "white";
            document.getElementById("hard").appendChild(create);
        }
    }
    obj['core'] = shawCore
    return obj;
}
var shawCore = function() {
    for (var i = 0; i < this.hardcore; i++) {
        var create = document.createElement("div");
        create.innerText = "❤️";
        create.style.position = "absolute";
        create.style.left = (100/5)*(i) + "%";
        create.style.fontSize ="50px";
        create.style.color = "white";
        document.getElementById("hard").appendChild(create);
    }
}
function Fire(Level) {
    var timeloop = 8-0.5*Level
    obj = {}
    function fireBool() {
        var create = document.createElement("div");
        var ArrLOrR = ["Left","right","Left","right"]
        var random = Math.floor(Math.random() * ArrLOrR.length)
        create.innerText = "🔥";
        create.style.position = "absolute";
        if (ArrLOrR[random] == "Left") {
            create.style.left = "5%";
        }else{
            create.style.right = "5%";
        }
        create.style.bottom = Math.random()*15 + "vh"
        create.style.transform = "scale(" + (Math.random() * 0.5 + 0.5) + ")";
        create.className = "fireAnim" + ArrLOrR[random];
        create.classList.add("fireAnim");
        create.style.fontSize ="50px";
        create.style.color = "darkred";
        document.body.appendChild(create);
    }
    function gofire(){
        document.querySelectorAll(".fireAnimLeft").forEach((e)=>{
            var i = parseFloat(e.style.left)
            i++
            e.style.left = i+"%"
        })
        document.querySelectorAll(".fireAnimright").forEach((e)=>{
            var j =  parseFloat(e.style.right)
            j++
            e.style.right = j+"%"
        })
    }
    function startFire() {
        setInterval(stopFire, 1000);
        setInterval(gofire,70);
        setInterval(fireBool, timeloop * 850);
    }
    function stopFire() {
        document.querySelectorAll(".fireAnimLeft, .fireAnimright").forEach((e) => {
            if (parseFloat(e.style.left) > 100 || parseFloat(e.style.right) > 100) {
                e.remove();
            }
        });
    }
    obj['start'] = startFire
    obj['fire'] = fireBool
    obj['stop'] = stopFire
    obj['goFire'] = gofire
    return obj
}
function starPoint() {
    function createStar() {
        var star = document.createElement("div");
        star.innerText = "🌟";
        star.style.position = "fixed";
        star.className= "starScore"
        star.style.right = Math.random() * 100 + "vw";
        star.style.bottom = "95vh";
        star.style.fontSize = "50px";
        star.style.color = "white";
        star.style.zIndex="9999"
        document.body.appendChild(star);
    }
    function downStar() {
        document.querySelectorAll("div").forEach((star) => {
            if(star.innerText=="🌟"){
                star.style.bottom = parseFloat(star.style.bottom) - 1 + "vh";
            }
        });
    }
    function clearSStars() {
        document.querySelectorAll("div").forEach((star) => {
            if (parseFloat(star.style.bottom) < -5) {
                star.remove();
            }
        });
    }
    function startStarFall() {
        setInterval(downStar, 100);
        setInterval(clearSStars, 1000);
        setInterval(createStar, 4000);
    }
    return {
        start: startStarFall
    }
}
function pleyer() {
    var obj = {}
    var score = 0
    function createPleyer(){
        var pleyer = document.createElement("div")
        pleyer.id="player"
        pleyer.innerText="👨"
        pleyer.style.position = "fixed";
        pleyer.style.right = "50vw";
        pleyer.style.bottom = "5vh";
        pleyer.style.width = "45px";
        pleyer.style.height="50px"
        pleyer.style.float= "right";
        pleyer.style.margin="0"
        pleyer.style.padding="0"
        pleyer.style.userSelect = "none";
        pleyer.style.fontSize = "40px";
        pleyer.style.zIndex="9999"
        document.body.appendChild(pleyer);
    }
    function createPlayerController() {
        var player = document.getElementById("player");
        var posY = 5; 
        var posX = 50;  
        var velocityY = 0;
        var gravity = -0.09;
        var isJumping = false;
        var originalHeight = 100;
        document.addEventListener("keydown", function(event) {
            if ((event.code === "Space" || event.key === "ArrowUp") && !isJumping) {
                velocityY = 2;
                isJumping = true;
            }
            else if (event.key === "ArrowLeft") {
                if (posX > 0) posX -= 2;
            }
            else if (event.key === "ArrowRight") {
                if (posX < 95) posX += 2;
            }
            else if (event.key === "Shift" || event.key === "ArrowDown") {
                velocityY = 0;
            } 
        });

        function gameLoop() {
            velocityY += gravity;
            posY += velocityY;
            if (posY < 5) {
                posY = 5;
                velocityY = 0;
                isJumping = false;
            }
            if (posY > 40) {
                posY = 40;
                velocityY = -1;
                isJumping = false;
            }
            player.style.bottom = posY + "vh";
            player.style.left = posX + "vw";
            

            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }
    function damage() {
        var player = document.getElementById("player");
        var playerRect = player.getBoundingClientRect();

        Array.from(document.getElementsByClassName("fireAnim")).forEach((fire) => {
            var fireRect = fire.getBoundingClientRect();
            
            if (!(
                playerRect.right < fireRect.left ||
                playerRect.left > fireRect.right || 
                playerRect.bottom < fireRect.top ||
                playerRect.top > fireRect.bottom
            )) {
                HardCore.hardcore = HardCore.hardcore-1
                if (HardCore.hardcore <= 0) {
                    alert("Game Over! Your Score: " + score);
                    window.location.reload();
                }
                HardCore.mil();
                fire.remove();
                var flashElem = document.getElementsByClassName('flash')[0];
                flashElem.style.animation = 'none'; 
                void flashElem.offsetWidth;             
                flashElem.style.animation = 'flashRed 2s ease-in-out';
            }
        });
    }
    function Score() {
        var player = document.getElementById("player");
        var playerRect = player.getBoundingClientRect();

        Array.from(document.getElementsByClassName("starScore")).forEach((star) => {
            var starRect = star.getBoundingClientRect();
            
            if (!(
                playerRect.right < starRect.left ||
                playerRect.left > starRect.right || 
                playerRect.bottom < starRect.top ||
                playerRect.top > starRect.bottom
            )) {
                score++;
                var starAN = document.getElementsByClassName('effectStar')[0];
                star.remove();
                starAN.style.animation = 'none';     
                void starAN.offsetWidth;
                starAN.style.animation = 'twinkle 2s infinite ease-in-out';
                document.getElementById('score').innerText = score;
            }
        });
    }
    obj["player"]=createPleyer
    obj['jump']=createPlayerController
    obj['damage']=damage
    obj['score']=Score
    return obj
}
var HardCore = Hard(5)
function number(){
    num = 0
    var number = document.getElementById("number");
    function  inner() {
        if (num == 3) {
            number.innerHTML = "<h1>Let's Go!</h1>";
            setTimeout(function() {
                number.style.display = "none";
            }, 1000);

        }else{
            number.innerHTML = "<h1>" + (num + 1) + "</h1>";
            num++
        }
    }
    return inner
}
var numbergo = number()
function startgame() {
    var level = document.getElementById("Level")
    if (level.value < 1 || level.value > 8) {
        alert("Please enter a valid level between 1 and 8.");
        return;
    }
    setTimeout(function() {
        document.getElementById("gameArea").style.display = "none";
    }, 100);
    for (var i = 0; i < 4; i++) {
        setTimeout(function() {
            numbergo()
        }, (i+1)*1000);
    }
    HardCore.core()
    var fireBool = Fire(level.value)
    fireBool.start()
    setInterval(starPoint, 2000)
    starPoint().start()
    var player = pleyer()
    player.player()
    player.jump()
    setInterval(player.damage,200);
    setInterval(player.score,200);
}