window.addEventListener('load',bindEvents);
function bindEvents(){
    document.querySelector('#greet').addEventListener('click',greeting);
    document.querySelector('#clear').addEventListener('click',clearfields);
    document.querySelector('#lastname').addEventListener('keyup',executeGreet);
}
function assign(){
    document.getElementsById(this).innerText='X';
}
function executeGreet(event){
    let keyAscii = event.keyCode;
    if(keyAscii==13){
        greeting();
    }
}
//Event Binding
function initCap(name){
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
}
function clearfields(){
    document.getElementById('result').innerText='';
}
function greeting(){
    var fName=document.getElementById('firstname').value.split(" ");
    fName=fName[0];
    var lName=document.getElementById('lastname').value.split(" ");
    lName=lName[0];
    var msg="Welcome "+initCap(fName)+" "+initCap(lName);
    document.getElementById('result').innerText=msg;
}