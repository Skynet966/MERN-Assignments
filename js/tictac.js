window.addEventListener('load',init);
var playerX,playerO,sign,steps,msg;
var matrix=[[],[],[]];
var x,table;
function init(){
    x=document.querySelectorAll('td');
    table=document.querySelector('table')
    for(let i=0;i<x.length;i++){
        x[i].addEventListener('click',assign);
    }
    //init variables
    playerX=0;
    playerO=0;
    sign='X';
    steps=0;
    msg="";
}
function assign(){
    let val=this.innerHTML;
    console.log(val);
    if(val==''){
        let n=parseInt(this.id[0]);
        let m=parseInt(this.id[1]);
        matrix[n][m]=sign;
        this.innerHTML=sign;
        if(steps>3&&patternMatch(n,m)){
            win(sign);
            msg="Winner "+sign;
            setTimeout(function(){reset(x)},500);
        }else{
            flipval();
            steps++;
        }
    }
    document.getElementById('msg').innerHTML=msg;
}
function flipval(){
    if(steps==8){
        msg="no one wins!"
        sign="both";
        reset(x);
    }
    else if(sign=='X'){
        sign='O';
        msg=sign+" turn";
    }
    else{
        sign='X';
        msg=sign+" turn";
    }
}
function win(winner){
    if(winner=='X'){
        playerX++;
        document.getElementById('playerX').innerHTML=playerX;
    }else{
        playerO++;
        document.getElementById('playerO').innerHTML=playerO;
    }
}
function patternMatch(r,c){
    if(matrix[0][c]==matrix[1][c]&&matrix[1][c]==matrix[2][c]){
        for(let i=c;i<9;i=i+3){
            x[i].classList.add('active');
        }
        return true;
    }else if(matrix[r][0]==matrix[r][1]&&matrix[r][1]==matrix[r][2]){
        if(r==1){
            r=3;
        }else if(r==2){
            r=6
        }
        for(let i=r;i<r+3;i++){
            x[i].classList.add('active');
        }
        return true;
    }else if(r==c||r+c==2){
        if(matrix[0][0]==matrix[1][1]&&matrix[1][1]==matrix[2][2]){
            for(let i=0;i<9;i+=4){
                x[i].classList.add('active');
            }
            return true;
        }else if(matrix[0][2]==matrix[1][1]&&matrix[1][1]==matrix[2][0]){
            for(let i=2;i<7;i+=2){
                x[i].classList.add('active');
            }
            return true;
        }
    }else{
        return false;
    }
}
function reset(x){
    matrix=[[],[],[]];
    table.insertAdjacentHTML("afterbegin","<div class='board'>"+sign+" is Winner</div>");
    document.querySelector('.board').addEventListener('click',function(){
        this.remove();
        x.forEach(e => {e.innerHTML='';})
        document.querySelectorAll('td.active').forEach(e => { e.classList.remove('active'); })
        steps=0;
        sign='X';
        document.getElementById('msg').innerHTML=sign+" turn";
    });
}