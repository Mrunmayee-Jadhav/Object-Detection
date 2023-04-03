img='';
set_status='';
object='';

function preload() {
    img= loadImage('mobile.jpg');
}

function setup() {
    canvas= createCanvas(700,480);
    canvas.position(400,220);
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML='Status: Detecting Object';
}

function draw() {
    image(img,0,0,700,500);
    if(set_status==true){
        for (i = 0; i < object.length; i++) {
            document.getElementById('status').innerHTML='Object Detected';
            fill('white');
            percent=floor(object[i].confidence*100);
            text(object[i].label+' '+percent+"%",object[i].x+15, object[i].y+15);
            noFill();
            stroke('white');
            rect(object[i].x,object[i].y, object[i].width, object[i].height);
            document.getElementById('text').innerHTML='There are 2 objects but only '+object.length+" object is detected";
            
        }
    }
}

function modelLoaded() {
    console.log('Model Loaded');
    set_status= true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}

function back() {
    window.location='index.html';
}