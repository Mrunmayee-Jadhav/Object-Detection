img='';
set_status="";
object=[];

function preload() {
    img=loadImage('cupboard.jpg');
}

function setup() {
    canvas= createCanvas(500,500);
    canvas.position(500,220);
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML= 'Status: Detecting Object';
}

function draw() {
    image(img,0,0,500,500);
    if(set_status==true) {
        for ( i = 0; i < object.length; i++) {
            document.getElementById('status').innerHTML='Object Detected';
            fill('white');
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y-280);
            noFill();
            stroke('white');
            rect(object[i].x,object[i].y-300,object[i].width,object[i].height);
            document.getElementById('text').innerHTML='There are 3 objects in the image but only '+object.length+' is detected';
        }
    }
}

function modelLoaded() {
    console.log('Model Loaded');
    set_status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results) {
    if (error) {
        console.error(error);
    } 
    else {
        console.log(results); 
        object=results; 
    }
} 

function back() {
    window.location='index.html';
}