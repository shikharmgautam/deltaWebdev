var offsetX = 0;
var offsetY = 0;
for (i=0 ; i<8; i++){
    for (j=0;j<8;j++){
        var tile = document.createElement('img');
        tile.src = 'webdevSprites/8k7ot3de.png';
        tile.width = 50;
        tile.height = 50;
        offsetX = i*50 + 400;
        offsetY = j*50 + 70;
        tile.style.top = offsetY+'px';
        tile.style.left = offsetX+'px';
        document.getElementById('board').appendChild(tile);
    }
}

var titan = document.createElement('img');
titan.col = 5; titan.row = 0;
titan.src= 'webdevSprites/titan.png';
titan.width = 50;
titan.height = 50;
titan.offsetX = titan.col*50 + 400;
titan.offsetY = titan.row*50 + 70;
titan.style.top = titan.offsetY+'px';
titan.style.left = titan.offsetX+'px';
document.getElementById("titan").appendChild(titan);
titan.top = titan.offsetX+'px';
titan.left = titan.offsetY+'px';

var tank = document.createElement('img');
tank.col = 1; tank.row = 4;
tank.src= 'webdevSprites/tank.png';
tank.width = 50;
tank.height = 50;
tank.offsetX = tank.col*50 + 400;
tank.offsetY = tank.row*50 + 70;
tank.style.top = tank.offsetY+'px';
tank.style.left = tank.offsetX+'px';
document.getElementById("tank").appendChild(tank);

var ricochet = document.createElement('img');
var ricoState = '1'
if (ricoState == '1')
    ricochet.src= 'webdevSprites/ricochet1.png';
else
    ricochet.src= 'webdevSprites/ricochet2.png';
    ricochet.col = 5; ricochet.row = 4;
ricochet.width = 50;
ricochet.height = 50;
ricochet.offsetX = ricochet.col*50 + 400;
ricochet.offsetY = ricochet.row*50 + 70;
ricochet.style.top = ricochet.offsetY+'px';
ricochet.style.left = ricochet.offsetX+'px';
document.getElementById("ricochet").appendChild(ricochet);

var semiricochet = document.createElement('img');
var semiricoState = '4'
if (semiricoState == '1')
    semiricochet.src= 'webdevSprites/semiricochet_.png';
else if (semiricoState == '2')
    semiricochet.src= 'webdevSprites/semiricochet_2.png';
else if (semiricoState == '3')
    semiricochet.src= 'webdevSprites/semiricochet_3.png';
else
    semiricochet.src= 'webdevSprites/semiricochet_4.png';
    semiricochet.col = 4; semiricochet.row = 4;
//semiricochet.src= 'webdevSprites/semiricochet_.png';
semiricochet.width = 50;
semiricochet.height = 50;
semiricochet.offsetX = semiricochet.col*50 + 400;
semiricochet.offsetY = semiricochet.row*50 + 70;
semiricochet.style.top = semiricochet.offsetY+'px';
semiricochet.style.left = semiricochet.offsetX+'px';
document.getElementById("semiricochet").appendChild(semiricochet);

var canon = document.createElement('img');
canon.col = 4; canon.row = 0;
canon.src= 'webdevSprites/canon.png';
canon.width = 50;
canon.height = 50;
canon.offsetX = canon.col*50 + 400;
canon.offsetY =canon.row*50 + 70;
canon.style.top = canon.offsetY+'px';
canon.style.left = canon.offsetX+'px';
document.getElementById("canon").appendChild(canon);


var canonball = document.createElement('img');
canonball.isCreated = false;
document.getElementById("canon").onclick = function() {fire22(canonball)};


function fire22(canonball){
    if (canonball.isCreated == false ){
        canonball.isCreated = true;
    canonball.direction = 's';
    canonball.col = canon.col; canonball.row = canon.row;
    canonball.tileOffsetX = 25; canonball.tileOffsetY = 49;
    canonball.src = 'webdevSprites/canonball.png';
    canonball.width= 50;
    canonball.height = 50;
    canonball.offsetX = canonball.col*50 + 400;
    canonball.offsetY = canonball.row*50 + 90;
    canonball.style.top = canonball.offsetY+'px';
    canonball.style.left = canonball.offsetX+'px';
    document.getElementById('canonball').appendChild(canonball);
 
    
    setInterval(updateTitan, 20, titan);
    setInterval( updateCanonball , 20, canonball);
    setInterval( changeCanonballDirection , 20, canonball);
    }
}


function updateCanonball(canonball) {
    if (canonball.direction == 's'){
        canonball.tileOffsetY++;
        canonball.offsetY++;
        canonball.style.top = canonball.offsetY+'px';
    }
    else if (canonball.direction == 'e'){
        canonball.tileOffsetX++;
        canonball.offsetX++;
        canonball.style.left = canonball.offsetX+'px';
    }
    else if(canonball.direction == 'w'){
        canonball.tileOffsetX--;
        canonball.offsetX--;
        canonball.style.left = canonball.offsetX+'px';
    }
    else if(canonball.direction == 'n'){
        canonball.tileOffsetY--;
        canonball.offsetY--;
        canonball.style.top = canonball.offsetY+'px';
    }
    if (canonball.offsetY>800 || canonball.offsetX > 800 || canonball.offsetX < 400 || canonball.offsetY < 0 || isCollided(tank) ){
        destroyCanonball(canonball);
    }
    if(canonball.tileOffsetX > 50){
        canonball.tileOffsetX =1;
        canonball.col++;
    }
    if(canonball.tileOffsetY > 50){
        canonball.tileOffsetY =1;
        canonball.row++;
    }
    if(canonball.tileOffsetX < 0){
        canonball.tileOffsetX =49;
        canonball.col--;
    }
    if(canonball.tileOffsetY < 0){
        canonball.tileOffsetY =49;
        canonball.row--;
    }
}

function changeCanonballDirection(canonball){
    if(canonball.direction == 's'){
        if (isCollided(ricochet) ){
            if(ricoState == '1')
            canonball.direction = 'w';
            else 
            canonball.direction = 'e';
        }
        else if(isCollided(semiricochet)) {
            if(semiricoState == '1')
            canonball.direction = 'w';
            else if(semiricoState == '2')
            destroyCanonball(canonball);
            else if(semiricoState == '3')
            destroyCanonball(canonball);
            else
            canonball.direction = 'e';
        }
    }
    else if (canonball.direction == 'n'){   
        if (isCollided(ricochet) ){
        if(ricoState == '1')
        canonball.direction = 'e';
        else 
        canonball.direction = 'w';
        }
    
        else if(isCollided(semiricochet)) {
        if(semiricoState == '1')
        destroyCanonball(canonball);
        else if(semiricoState == '2')
        canonball.direction = 'w'
        else if(semiricoState == '3')
        canonball.direction = 'e';
        else
        destroyCanonball(canonball);
        }
    }
    else if (canonball.direction == 'e'){   
        if (isCollided(ricochet) ){
        if(ricoState == '1')
        canonball.direction = 'n';
        else 
        canonball.direction = 's';
        }
    
        else if(isCollided(semiricochet)) {
        if(semiricoState == '1')
        destroyCanonball(canonball);
        else if(semiricoState == '2')
        canonball.direction = 'w'
        else if(semiricoState == '3')
        canonball.direction = 'e';
        else
        destroyCanonball(canonball);
        }
    }
    else if (canonball.direction == 'n'){   
        if (isCollided(ricochet) ){
        if(ricoState == '1')
        canonball.direction = 'e';
        else 
        canonball.direction = 'w';
        }
    
        else if(isCollided(semiricochet)) {
        if(semiricoState == '1')
        destroyCanonball(canonball);
        else if(semiricoState == '2')
        canonball.direction = 'w'
        else if(semiricoState == '3')
        canonball.direction = 'e';
        else
        destroyCanonball(canonball);
        }
    }
}


function destroyCanonball(canonball){
    if(canonball.isCreated){
        canonball.isCreated = false;
        document.getElementById('canonball').removeChild(canonball);
    }
}

function isCollided(object){

    if(((canonball.offsetY == object.offsetY ) && (canonball.col == object.col))
         || ((canonball.offsetX== object.offsetX) && (canonball.row == object.row))){
             canonball.offsetX++; canonball.offsetY++;
            return true;
    }
    else 
        return false;
}

function updateTitan(titan){
    if (isCollided(titan)){
        destroyCanonball(canonball);
        console.log("over");
        titan.src = 'webdevSprites/titanDestroyed.png';
    }
}

function moveLeft(object){
    if(object.col > 0){
        object.col--;
    }
}

function moveRight(object){
    if(object.col<7){
        object.col++;
    }
}

function moveDown(object){
    if (object.row < 7){
        object.row++;
    }
}

function moveUp(object){
    if(object.row > 0){
        object.row--;
    }
}
