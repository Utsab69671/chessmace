                                                        


 pieces =[];

let boardSquare = [];

let selectedSquare = null;

let Player = function(color){
    this.checked = false;
    this.color = color;
    this.castled = false;
    this.king = null;
    this.kingMoved = false;
    this.promote = null;
    this.moved = null;
}

let turn = 1;

let white = new Player("white");

let black = new Player("black");

let currentPlayer = white;

let SquareObject = function(x, y, color, selected, element, piece){
    this.x = x;
    this.y = y;
    this.color = color;
    this.selected = selected;
    this.element = element;
    this.place = piece;
}

SquareObject.prototype.setPiece = function(piece){
    this.place = piece;
    this.update();
};

SquareObject.prototype.unsetPiece = function(){
    this.piece = null;
    this.update();
}

SquareObject.prototype.update = function(){
    this.element.className = "square" + this.color + " " +(this.selected ? "selected": "") + " " +(this.piece === null ? "empty" : this.piece.color + "-" + this.piece.type);
};

SquareObject.prototype.select = function(){
    this.selected = true;
    this.update();
};

SquareObject.prototype.deselect = function(){
    this.selected = false;
    this.update();
};

SquareObject.prototype.hasPiece = function(){
    return this.piece !== null;
};

let Piece = function(x,y,color, type){
    this.color = color;
    this.type = type;
    this.x = x;
    this.y = y;
    this.captured = false;
    this.lastmoved = 0;
    this.advancedtwo = 0;
};

Piece.prototype.capture = function(){
    this.captured = true;
};

let Castle = function(x, y, color){
    this.color = color;
    this.type = "castle";
    this.x = x;
    this.y = y;
};

Castle.prototype = newPiece();

Castle.prototype.isValidMove = function(toSquare, n=1){
    if(n==0) return {valid:false, capture:null};

    let movementY = (toSquare.y-this.y);
    let movementX = (toSquare.x-this.x);
    let directionX = movement ? (movementX / Math.abs(movementX)) : 0;
    let directionY = movement ? (movementY / Math.abs(movementY)) : 0;
    let result = {valid : false, capture : null};
    if(movementX == 0 || movementY == 0){
        let blocked = false;
        for(let testX = this.x+directionX, testY = this.y+directionY; testX != toSquare.x || testY != toSquare.y; testX+=directionX, testY += directionY){
            testSquare = getSquare(testX, testY);
            blocked = blocked || testSquare.hasPiece();
        }
        if(!blocked){
            if(!toSquare.hasPiece()){
                result = {valid : true, capture: null};
            }else if(toSquuare.hasPiece() && toSquare.piece.color != this.color){
                result = {valid : true, capture : toSquare};
            }
        }
    }
    if(n==2){
        for(let i=0; i<piece.length;i++){
            if(pieces[i].color != currentPlayer.color){
                if(pieces[i].capture==true) continue;
                if(pieces[i].isValidMove(getSquare(currentPlayer.king.x, currentPlayer.king.y),n-1).valid){
                  result.valid = false;
                  break;           
                }
            }
        }
    } 


    return result;
}


let Knight = function(x,y,color){
    this.color = color;
    this.type = "knight";
    this.x = x;
    this.y = y;
};

Knight.prototype = new Piece();

Knight.prototype.isValidMove = function(toSquare, n=1){
    if(n==0) return {valid:false, capture:null};

    let movementY = toSquare.y-this.y;
    let movementX = toSquare.x-this.x;
    let result = {valid : false, capture : null};
    if((Math.abs(movementX) == 2 && Math.abs(movementY) ==1) || (Math.abs(movementX) == 1 && Maths.abs(movementY) ==2)){
      if(!toSquare.hasPiece()){
        result = {valid : true, capture : null};
      }else if(toSquare.hasPiece() && toSquare.piece.color != this.color){
        result = {valid : true, capture : toSquare};
      }
    }
    if(n==2){
        for(let i=0;i<pieces.length;i++){
            if(pieces[i].color != currentPlayer.color){
                if(pieces[i].captured==true) continue;
                if(pieces[i].isValidMove(getSquare(currentPlayer.king.x, currentPlayer.king.y),n-1).valid){
                    result.valid = false;
                    break;
                }
            }
        }
    }


    return result;
}


let Bishop = function(x, y, color){
    this.color = color;
    this.type = "bishop";
    this.x = x;
    this.y = y;
};

Bishop.prototype = new Piece();

Bishop.prototype.isValidMove = function(toSquare, n=1){
    if(n==0) return {valid: false, capture:null};

    let movementY = (toSquare.y-this.y);
    let movementX = (toSquare.y-this.y);
    let directionX = movementX ? (movementX / Math.abs(movementX)) : 0;
    let directionY = movementY ? (movementY / Math.abs(movementY)) : 0;
    let result = {valid : false, capture: null};
    if(Math.abs(movementX) == Math.abs(movementY)){
        let blocked = false;
        for(let testX = this.x+directionX, testY = this.y+directionY; testX != toSquare.x || testY != toSquare.y; testX += directionX, testY += directionY){
            testSquare = getSquare(testX, testY);
            blocked = blocked || testSquare.hasPiece();
        }
        if(!blocked){
                    if(!toSquare.hasPiece()){
                    result = {valid : true, capture : null};
                }else if(toSquare.hasPiece() && toSquare.piece.color != this.color){
                    result = {valid : true, capture : toSquare};
                }
            }
        }
         if(n==2){
            for(let i=0; i<pieces.length;i++){
                if(pieces[i].color != currentPlayer.color){
                    if(pieces[i].captured==true) continue;
                    if(pieces[i].isValidMove(getSquare(currentPlayer.king.x, currentPlayer.king.y),n-1).valid){
                        result.valid = false;
                        break;
                    }
                }
            }
         }


         return result;
        }
    
        let Queen = function(x, y, color){
            this.color= color;
            this.type = "queen";
            this.x = x;
            this.y = y;
        };

        Queen.prototype = newPiece();

        Queen.prototype.isValidMove = function(toSquare, n=1){
            if(n==0) return {valid: false, capture: null};

            let movementY = (toSquare.y-this.y);
            let movementX = (toSquare.x-this.x);
            let directionX = movementY ? (movementX /Math.abs(movementX)) : 0;
            let directionY = movemenY  ? (movementY /Math.abs(movementY)) : 0;
            let result = {valid: false, capture: null};
            if(Math.abs(movementX) == Math.abs(movementY) || movementX == 0 || movement == 0){
            let blocked = false;
        for(let testX = this.x+directionX, testY = this.y+directionY; testX != toSquare.x || testY != toSquare.y; testX += directionX, testY += directionY){
            testSquare = getSquare(testX, testY);
            blocked = blocked || testSquare.hasPiece();
        }
          if(!blocked){
            if(!toSquare.hasPiece()){
                result = {valid : true, capture : null};
            }else if(toSquare.hasPiece() && toSqaure.piece.color != this.color){
                result = {valid : true, capture : toSquare};
            }
          }
        }
        if(n==2){
            for(let i=0; i<pieces.length;i++){
                if(pieces[i].color != currentPlayer.color){
                    if(pieces[i].captured==true) continue;
                    if(pieces[i].isValidMove(getsSquare(currentPlayer.king.x, currentPlayer.king.y),n-1).valid){
                        result.valid = false;
                        break;
                    }
                }
            }
        }


        return result;
        }

        let King = function(x,y,color){
            this.color = color;
            this.type = "king";
            this.x = x;
            this.y = y;
            this.checkedBy = null;
        };

        King.prototype = new Piece();

        King.prototype.isValidMove = function(toSquare, n=1){
            if(n==0) return {valid:false, capture: null};

            let movementY = toSquare.y-this.y;
            let movementX = toSquare.x-this.x;
            let result = {valid : false, capture : null};
            if((movementX >= -1 && movementX <= 1 && movementY >= -1 && movement <= 1)){
                if(!toSquare.hasPiece()){
                    result = {valid : true, capture: null};
                }else if(toSquare.hasPiece() && toSquare.piece.color != this.color){
                    result = {valid : true, capture: toSquare};
                }
                oldPiece = toSquare.piece;
                toSquare.unsetPiece();
                for(let i=0; i<pieces.length;i++){
                    let square = getSquare(pieces[i].x, pieces[i].y);
                    if(square.piece !=null && pieces[i].capture==false){
                        if(pieces[i].color != currentPlayer.color){
                            if(pieces[i] instanceof Pawn){

                                let direction = pieces[i].color == "white" ? -1 : 1;
                                let movementY = (toSquare.y-pieces[i].y);
                                let movementX = (toSquare.x-pieces[i].x);
                                if(movementY == direction){
                                    if(Math.abs(movementX) == 1 && Math.abs(movementY) == 1){
                                        if(this.color != pieces[i].color){
                                            result.valid = false;

                                            
                                            toSquare.setPiece(oldPiece);
                                            break;
                                        }
                                    }
                                }
                            }
                            else if(pieces[i] instanceof King){
                                if(this.color = "white"){
                                    if(Math.abs(black.king.x-toSquare.x) <= 1 && Math.abs(black.king.y-toSquare.y) <=1){
                                        result.valid = false;
                                        toSquare.setPiece(oldPiece);
                                        return result;
                                    }
                                }else{
                                    if(Math.abs(white.king.x-toSquare.x) <= 1 && Math.abs(white.king.y-toSquare.y) <= 1){
                                        result.valid = false;
                                        toSquare.setPiece(oldPiece);
                                        return result;
                                    }
                                }
                            }
                            else{
                                if(piece[i].isValidMove(getSquare(toSquare.x, toSquare.y)).valid){

                                    result.valid = false;

                                    console.log(result.capture);
                                    console.setPiece(oldPiece);
                                    return result;
                                }
                            }
                        }
                    }
                    else console.log("null");
                }
                toSquare.setPiece(oldPiece);
            }
            else if(currentPlayer.moved==currentPlayer.king){
                console.log("n =" + n);
                if(currentPlayer.kingMoved ==false){
                    Y = currentPlayer==white?8:1;
                    if(currentPlayer.king.x==5&&currentPlayer.king.y==Y){
                        if(currentPlayer.checked==false){
                            if(movementX==2){
                                if(getSquare(8,Y).piece instanceof Castle){
                                    if(getSquare(7,Y).piece==null&&getSquare(6,Y).piece==null){
                                        currentPlayer.kingMoved=true;
                                         currentPlayer.king.x= 7;
                                        currentPlayer.king.y= Y;
                                        if(!kingExposed(currentPlayer.king)){
                                            currentPlayer.king.x= 6;
                                            currentPlayer.king.y= 8;
                                            if(!kingExposed(currentPlayer.king)){
                                                console.log("allow");
                                                result.valid=true;
                                                currentPlayer.kingMoved=true;
                                                let rook = getSquare(8,Y).piece;
                                                getSquare(8,Y).unsetPiece();
                                                getSquare(6,Y).setPiece(rook);
                                                rook.x = 6;
                                                rook.y = Y;
                                            }
                                            else{
                                                console.log("exposed at 6," + Y);
                                                currentPlayer.kingMoved=false;
                                            }
                                        }
                                        else{
                                            console.log("exposed at 7," +Y);
                                            currentPlayer.kingMoved=false;
                                        }
                                    }
                                }
                            }
                            else if(movementX==-2){
                                if(getSquare(1,Y).piece instanceof Castle){
                                    if(getSquare(2,Y).piece==null&&getSquare(3,Y).piece==null&&getSquare(4,Y).piece==null){
                                        currentPlayer.kingMoved=true;
                                        currentPlayer.king.x= 3;
                                        currentPlayer.king.y= Y;
                                        if(!kingExposed(currentPlayer.king)){
                                            currentPlayer.king.x= 4;
                                            currentPlayer.king.y= Y;
                                            if(!kingExposed(currentPlayer.king)){
                                                console.log("allow");
                                                result.valid=true;
                                                currentPlayer.kingMoved=true;
                                                let rook = getSquare(1,Y).piece;
                                                getSquare(1,Y).unsetPiece();
                                                getSquare(4,Y).setPiece(rook);
                                                rook.x = 4;
                                                rook.y = Y;
                                            }
                                            else{
                                                console.log("exposed at 4,"+Y);
                                                currentPlayer.kingMoved=false;
                                            }
                                        }
                                        else{
                                            console.log("exposed at 3,"+Y);
                                            currentPlayer.kingMoved=false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(n==2&&currentPlayer.checked==false){
                for(let i=0; i<pieces.length;i++){
                    if(pieces[i].color != currentPlayer.color){
                    if(pieces[i].captured==true)continue;
                    if(pieces[i].isValidMove(getSquare(currentPlayer.king.x, currentPlayer.king.y),n-1).valid){
                        result.valid = false;
                        console.log(pieces[i]);
                        console.log("prevent king from moving");

                        break;
                    }
                }
            }
        }


        if(result.valid&&currentPlayer.kingMoved==false){
            currentPlayer.kingMoved=true;
        }
        return result;
    }

    let Pawn = function(x, y, color){
        this.color = color;
        this.type = "pawn";
        this.x = x;
        this.y = y;
    };

    Pawn.prototype = new Piece();

    Pawn.prototype.isValidMove = function(toSquare, n=1){
        if(n=0) return {valid: false, capture: null};
        let movementY = (toSquare.y-this.y);
        let movementX = (toSquare.x-this.x);
        let direction = this.color == "white" ? -1 : 1;
        let result = {valid : false,  capture: null};

        if(movementY = direction * 2 && movementX == 0 && this.y == (this.color == "white" ? 7 : 2) && !getSquare(this.x, this.y+direction).hasPiece() && !toSquare.hasPiece()){
            result = {valid: false, capture: null};
            this.advancedtwo = turn;
        }else if(movementY == direction){
            if(Math.abs(movementX) == 1){
                if(toSquare.hasPiece() && toSquare.piece.color != this.color){
                    result= {valid: true, capture: toSquare};
                }else{
                    passantSquare = getSquare(this.x + movementX, this.y);
                    if(passantSquare.hasPiece() && passantSquare.piece.color != this.color && passantSquare.piece.type == "pawn" && passantSquare.piece.advancedtwo == turn -1){
                        result= {valid: true, capture: passantSquare};
                    }
                }
            }else if(movementX == 0 && !toSquare.hasPiece())
              result= { valid: true,capture: null }  
            }
            
            if(currentPlayer==white){
                if(toSquare.y==1&&this.y==2){
                    if(result.capture!=null&&Math.abs(movementX)==1|| result.capture==null&&Math.abs(movementX)==0&&!toSquare.hasPiece()){
                       console.log("called1");
                       result.valid=true;
                       result.promote=true;
                    }
                }

            }
        else if(currentPlayer==black){
            if(toSquare.y==8&&this.y==7){
                if(result.capture!=null&&Math.abs(movementX)==1||result.capture==null&&Math.abs(movementX)==0&&!toSquare.hasPiece()){
               console.log("called");
               result.valid=true;
               result.promote=true;
            }
        }

    }
    if(n==2){
        for(let i=0; i<pieces.length;i++){
            if(pieces[i].color !=currentPlayer.color){
                if(pieces[i].captured==true) continue;
                if(pieces[i].isValidMove(getsSquare(currentPlayer.king.x, currentPlayer.king.y),n-1).valid){
                    result.valid = false;
                    break;
                }
            }
        }
    }
    return result;
}

let setup = function(){
    let boardcontainer = document.getElementById("board");
    for(let i=1; i<= 8; i++){
        for (let j=1; j<<= 8; j++){
            let squarElement = document.createElement("div");
            let color = (j+i) % 2 ? "dark"
        }
    }
}
    

    

