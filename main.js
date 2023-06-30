song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is initialised');
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX =" + rightWristX + "RightWristY =" + rightWristY);
    }
}

function draw()
{
    image(video,0,0,600,500);

    fill("#FF00AA");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    
   
   if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 125)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        else if (rightWristY > 125 && rightWristY <= 250)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }

         else if(rightWristY > 250 && rightWristY <= 375)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
    }
   
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

