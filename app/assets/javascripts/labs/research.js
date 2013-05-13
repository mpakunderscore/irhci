// Normalize getUserMedia and URL
// https://gist.github.com/f2ac64ed7fc467ccdfe3

//normalize window.URL
window.URL || (window.URL = window.webkitURL || window.msURL || window.oURL);

//normalize navigator.getUserMedia
navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

window.mode = '';

var localStream;

function stop() {
	window.mode = '';
}

function clean() {
	
	var canvas = document.querySelector('canvas');
	var	context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);	
	
	var time = document.getElementById("time");
	time.innerHTML = ("");
	
	localStream.stop()
}

function background() {
		
    (function() {	
		
		stop();
		window.mode = 'color'
		
        var video = document.createElement('video'),
            canvas = document.querySelector('canvas'),
            context = canvas.getContext('2d'),
            originalFace,
            gUMOptions = {video: true, toString: function(){ return "video"; }};

		var colors = new Array(canvas.width * canvas.height * 3);
		var colorsArray = new Array(canvas.width * canvas.height * 3, 10);
		
		video.setAttribute('autoplay', true);

        context.fillStyle = "rgba(0, 0, 200, 0.5)";
        navigator.getUserMedia(gUMOptions, handleWebcamStream, errorStartingStream);

        function handleWebcamStream(stream) {

			localStream = stream;
            video.src = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(stream) : stream;
            processWebcamVideo();
        }

        function errorStartingStream() {
            alert('Uh-oh, the webcam didn\'t start. Do you have a webcam? Did you give it permission? Refresh to try again.');
        }

        function processWebcamVideo() {

            var startTime = +new Date(),
                changed = false,
                scaleFactor = 1,
                faces;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
			var imgd = context.getImageData(0, 0, canvas.width, canvas.height);
			var pix = imgd.data;

			var k = 25, a = 0, j = 0;

			for (var i = 0, n = pix.length; i < n; i += 4) {
				
				if (!checkColor(i, pix)) {
					pix[i] = 255;
					pix[i+1] = 0;
					pix[i+2] = 0;
					
					a++;					
					if (a == k && j == 0) j = i - k * 3;
					
				} else a = 0;					
			}
			
			if (j != 0) for (var i = j; i < j + k * 3; i++) pix[i] = 255;			
			
			var x = Math.floor(Math.floor(j/3)%canvas.height);
			var y = Math.floor(Math.floor(j/3)/canvas.height);
			// console.log(j+"/"+x+"/"+y)
			
			context.putImageData(imgd, 0, 0);
			
			// context.fillRect(x, y, 5, 5);
			
			var time = document.getElementById("time");
			time.innerHTML = (+new Date() - startTime);
			

            // And repeat.
			if (window.mode == 'color') setTimeout(processWebcamVideo, 50);
			else clean();
        }
		
		function checkColor(i, pix) {
			
			var r = true;
			if (!hardCheck(i+0, pix)) r = false;
			if (!hardCheck(i+1, pix)) r = false;
			if (!hardCheck(i+2, pix)) r = false;
			
			return r;
		}
		
		function hardCheck(i, pix) {
			
			var map = [];
			if (colorsArray[i] == null) colorsArray[i] = [];
			var summ = 0;
			
			for (var j = 0; j < colorsArray[i].length; j++) {

				summ += colorsArray[i][j];
			}
			
			var average = summ / colorsArray[i].length;
			
			if (i == 58845) console.log(average);
			
			if (colorsArray[i].length < 2) colorsArray[i].push(pix[i]);			
			if (colorsArray[i].length == 2) {
				colorsArray[i].splice(0, 1);
				colorsArray[i].push(pix[i]);
			}
				
			var a = colorsArray[i]; 
			
			if (pix[i] < average - 30 || pix[i] > average + 30) {
					
				return false;
			}
			
			return true;
		}
		
		function getSortedKeys(obj) {
		    var keys = []; for(var key in obj) keys.push(key);
		    return keys.sort(function(a,b){return obj[a]-obj[b]});
		}
		
		

    })();
}