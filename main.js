status = "";
objects = [];
var object_name = "";

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    objectDetector  = ml5.objectDetector('cocossde', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = object_name + " Found";

                var synth = window.speechSynthesis;
                speak_data = object_name;

                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = object_name + "  Not Found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

