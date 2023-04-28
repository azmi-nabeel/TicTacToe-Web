const cellId=["c1","c2","c3","c4","c5","c6","c7","c8","c9"]; //id values of each table cell
const tableVal=[];
const signs=["❌","⭕"]; 
let randSign;
let playerNo;
let playedCells,player1Score=0,player2Score=0;
function resetScore(){
    //resets the scores and starts a fresh round
    player1Score=player2Score=0;
    resetTable();
}
function resetTable(){
    //Begins Each Round Of Play with empty table and table val sets to BLANK; also randomly assigns a sign to players;
    for (let i = 0; i < 9; i++) {
        tableVal[i]=" ";
        document.getElementById(cellId[i]).value=tableVal[i];
    }
    randSign=Math.floor(Math.random()*2);                  //generates 1 or 0 to decide sign for player1 (head or tails)
    playerNo=1;                                            //playerNo to determine current turn
    playedCells=0;
    document.getElementById("Result").innerHTML="";
    document.getElementById("p1s").innerHTML="SCORE: "+player1Score;
    document.getElementById("p2s").innerHTML="SCORE: "+player2Score;
    document.getElementById("Status").innerHTML="TURN: Player 1 "+signs[randSign];
    document.getElementById("p1").innerHTML=signs[randSign];
    document.getElementById("p2").innerHTML=signs[Number(!randSign)];
    document.getElementById("Table").style.display="flex";
    document.getElementById("message").style.display="none";
}
function game(a){
    if(playerNo==1){
        if(document.getElementById(cellId[a-1]).value==" "){
            document.getElementById(cellId[a-1]).value=tableVal[a-1]=signs[randSign];
            playerNo=2;
            document.getElementById("Status").innerHTML="TURN: Player 2 "+signs[Number(!randSign)];
            playedCells++;
            result();
        }
    }
    else {
        if(document.getElementById(cellId[a-1]).value==" "){
            document.getElementById(cellId[a-1]).value=tableVal[a-1]=signs[Number(!randSign)];
            playerNo=1;
            document.getElementById("Status").innerHTML="TURN: Player 1 "+signs[randSign];
            playedCells++;
            result();
        }
    }
}
function horizontalCheck(i,j){
    if((signs[i]==tableVal[(j*3)])&&(signs[i]==tableVal[(j*3)+1])&&(signs[i]==tableVal[(j*3)+2]))return true;
    return false;
}
function verticalCheck(i,j){
    if((signs[i]==tableVal[j])&&(signs[i]==tableVal[j+3])&&(signs[i]==tableVal[j+6]))return true;
    return false;
}
function showResult(i){
    if(i==randSign){
        document.getElementById("Status").innerHTML="PLAYER 1 WINS "+signs[randSign];
        player1Score++;
    }
    else {
        document.getElementById("Status").innerHTML="PLAYER 2 WINS "+signs[Number(!randSign)];
        player2Score++;
    }
    document.getElementById("p1s").innerHTML="SCORE: "+player1Score;
    document.getElementById("p2s").innerHTML="SCORE: "+player2Score;
}
function result(){
    for(let i=0;i<=1;i++){
        for(let j=0;j<3;j++){
            if(horizontalCheck(i,j)||verticalCheck(i,j)){
                showResult(i);
                document.getElementById("Table").style.display="none";
                document.getElementById("message").style.display="flex";
                return;
            }
        }
        if((signs[i]==tableVal[0])&&(signs[i]==tableVal[4])&&(signs[i]==tableVal[8])){showResult(i);
            document.getElementById("Table").style.display="none";
            document.getElementById("message").style.display="flex";

            return;}
        if((signs[i]==tableVal[2])&&(signs[i]==tableVal[4])&&(signs[i]==tableVal[6])){showResult(i);
            document.getElementById("Table").style.display="none";
            document.getElementById("message").style.display="flex";

            return;}
    }
    if(playedCells==9){
        document.getElementById("Status").innerHTML=signs[randSign]+" TIE "+signs[Number(!randSign)];
        document.getElementById("Table").style.display="none";
        document.getElementById("message").style.display="flex";
    }
}