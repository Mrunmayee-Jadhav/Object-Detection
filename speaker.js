img='';
set_status='';
object=[];

function preload() {
    img= loadImage('speaker.jpg');
}

function setup() {
    canvas= createCanvas(400,450);
    canvas.position(550,220);
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML='Status: Detecting Object';
}

function modelLoaded() {
    console.log('Model Loaded');
    set_status= true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}

function draw() {
    image(img,0,0,400,450);
    if(set_status==true) {
        for (i = 0; i < object.length; i++) {
            document.getElementById('status').innerHTML='Object Detected';
            fill('black');
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+'%',object[i].x-480,object[i].y-980);
            noFill();
            stroke('black');
            rect(object[i].x-500,object[i].y-1000,object[i].width,object[i].height);
            document.getElementById('text').innerHTML=object.length+' object is detected';
            
        }
    }
}

function back() {
    window.location='index.html';
}