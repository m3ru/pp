		var d0 = new Date("May 30, 2024 8:00:00");
		var d1 = new Date("May 31, 2024 15:30:00");
		var begin = d0.getTime();
		var end = d1.getTime();
		var cur = Date.now();
		var diff = begin - cur;
		var left = end - cur;
		if(left < -1000*7200) {
			begin += 1000 * 60 * 60 * 24 * 365;
			end += 1000 * 60 * 60 * 24 * 365;
			diff = begin - cur;
			left = end - cur;
		}
		var format = false;
		var t, m, sub;
		
		var s = false;
	
		function chook(){};
		function hhook(){};
		function bhook(){};
		window.onload = function() {
			m = document.getElementById("mills");
			t = document.getElementById("tagline");
			sub = document.getElementById("sub");
			text_color = "#4f6bad";
			
			function chook() {
				cur = Date.now();
				left = end - cur;
				if(left < 0) left = 0;
				if(format) {
					var days = (left / (24 * 60 * 60 * 1000) ) | 0;
					var hours = (left / (60 * 60 * 1000) )%24 | 0;
					var minutes = (left / (60 * 1000) )%60 | 0;
					var seconds = (left / (1000) )%60 | 0;
					
					m.innerHTML = days + "d " + hours + "h " + minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s";
				}
				else m.innerHTML = left;
				if(left > 0) window.setTimeout(chook, 1000/120);
				else {
					begin += 1000 * 60 * 60 * 24 * 365;
					end += 1000 * 60 * 60 * 24 * 365;
					window.setTimeout(bhook, 1000*7200);
				}
			}
			
			function start() {
				toggle();
				toggle();
				sub.innerHTML = "(stay hyped)";
				document.body.style.color = text_color;
				document.body.style.background = "white";
				document.title = "Palooza Time!";
				window.setTimeout(chook, 1000/120);
			}
			
			function hhook() {
				cur = Date.now();
				diff = begin - cur;
				
				if(s) {
					s = false;
					document.body.style.color = "white";
					document.body.style.background = text_color;
				}
				else {
					s = true;
					document.body.style.color = text_color;
					document.body.style.background = "white";
				}
				
				if(diff > -15000) window.setTimeout(hhook, 250);
				else {
					document.body.style.color = "white";
					document.body.style.background = text_color;
					t.innerHTML = "";
					sub.innerHTML = "";
					
					m.innerHTML = "GO!";
					window.setTimeout(start, 5000);
				}
			}
			
			function bhook() {
				cur = Date.now();
				diff = begin - cur;
				if(diff < 0) diff = 0;
				if(format) {
					var days = (diff / (24 * 60 * 60 * 1000) ) | 0;
					var hours = (diff / (60 * 60 * 1000) )%24 | 0;
					var minutes = (diff / (60 * 1000) )%60 | 0;
					var seconds = (diff / (1000) )%60 | 0;
					
					m.innerHTML = days + "d " + hours + "h " + minutes + "m " + (seconds < 10 ? "0" : "") + seconds + "s";
				}
				else m.innerHTML = diff;
				if(diff > 0) window.setTimeout(bhook, 1000/120);
				else {
					sub.innerHTML = "(be hyped)";
					window.setTimeout(hhook, 100); 
				}
			}
			

			if(diff > -15000) bhook();
			else start();
		}
		
		function toggle() {
			if(format) {
				format = false;
				t.innerHTML = "milliseconds " + (diff > -15000 ? "until" : "left in") + " <a href=\"http://puzzlepalooza.mbhs.edu\" style=\"font-size: 12vmin;\">PuzzlePalooza</a>";
				if(diff > -15000) document.title = "Milliseconds 'till Palooza";
			}
			else {
				format = true;
				t.innerHTML = (diff > -15000 ? "until" : "left in") + " <a href=\"http://puzzlepalooza.mbhs.edu\" style=\"font-size: 12vmin;\">PuzzlePalooza</a>";
				if(diff > -15000) document.title = "Time 'till Palooza";
			}
		}
