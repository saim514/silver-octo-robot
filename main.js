function setup()
{
    canvas = createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw()
{
    strokeWeight(7);
    stroke("grey");
    if(mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clearCanvas()
{
    background("white")
    console.log("Canvas is cleared")
}

function classifyCanvas()
{
 classifier.classify(canvas, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
     console.error(error);
    }
    console.log(results);
    document.getElementById('item').innerHTML = 'Item: ' + results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
    var utterthis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterthis);
}