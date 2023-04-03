img='';
set_status='';
object=[];

function preload() {
    img= loadImage('bottla.jpg');
}

function setup() {
    canvas= createCanvas(440,500);
    canvas.position(530,220);
    objectDetector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML='Status: Detecting Object';
}

function draw() {
    image(img,0,0,440,500);
    if(set_status == true){
        for(i=0; i<object.length; i++) {
            document.getElementById('status').innerHTML='Status: Object Detected';
            fill('white');
            percent=floor(object[i].confidence*100);
            text(object[i].label+' '+percent+'%',object[i].x+15, object[i].y+15);
            noFill();
            stroke('white');
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            document.getElementById('text').innerHTML='There are three objects in the image and '+object.length+' are detected';
            if(object[i].label=='bottle'){
                rect(object[i].x-1200, object[i].y-1400, object[i].width, object[i].height);
                text(object[i].label+' '+percent+'%',object[i].x-1180, object[i].y-1380);
            }
            if(object[i].label=='laptop'){
                rect(object[i].x, object[i].y-1700, object[i].width, object[i].height);
                text(object[i].label+' '+percent+'%',object[i].x+15, object[i].y-1680);
            }
        }

    }

}

function modelLoaded() {
    console.log('Model Loaded');
    set_status=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}

function back() {
    window.location= 'index.html';
}