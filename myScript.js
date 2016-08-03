	var allTasks = [[],[],[],[],[]];
	var hoursLeft = 23;
	var sleepHrs = 0;
	var schoolHrs = 0;
	var start = 11;
	var startM = "PM";
	var endM = "PM";
	var sleepArray = [];
	var schoolArray = [];
	var getReady = 1;
	var bedTime = 11;
	var schoolTime = 8;
	var sleepEnabled = true;
	var taskEnabled = true;
	var schoolEnabled = true;
		
		function bubbleSort(a)
		{
			var swapped;
			do {
				swapped = false;
				for (var i=0; i < a.length-1; i++) {
					if (a[i][1] > a[i+1][1]) {
						var temp = a[i];
						a[i] = a[i+1];
						a[i+1] = temp;
						swapped = true;
					}
				}
			} while (swapped);
		}
		function hide(){
			document.getElementById("add1").style.visibility="hidden";
		}
		function openSleep(){
			document.getElementById("SleepForm").style.display = "block";
			
			if (document.getElementById("School").disabled == true){
				schoolEnabled = false;
				document.getElementById("School").disabled = true;
			}else {
			schoolEnabled = true;
			document.getElementById("School").disabled = true;
			}

			if (document.getElementById("Task").disabled == true){
				taskEnabled = false;
				document.getElementById("Task").disabled = true;
			}else {
			taskEnabled = true;
			document.getElementById("Task").disabled = true;
			}
		}
		function sleepFunc() {
			sleepHrs = document.getElementById("sleepAmt");
			sleepHrs = sleepHrs.value;
			bedTime = document.getElementById("bed");
			bedTime = bedTime.value;
			startM = document.getElementById("AMorPM");
			startM = startM.value;
			sleepArray = ["Sleep",sleepHrs];
			document.getElementById("Sleep").disabled = true;
			document.getElementById("SleepForm").style.display = "none";
			if (schoolEnabled == true){
				document.getElementById("School").disabled = false;
			}else{document.getElementById("School").disabled = true;}
			if (taskEnabled == true){
				document.getElementById("Task").disabled = false;
			}else{document.getElementById("Task").disabled = true;}
		}
		function openSchool(){
			document.getElementById("SchoolForm").style.display = "block";
			if (document.getElementById("Sleep").disabled == true){
				sleepEnabled = false;
				document.getElementById("Sleep").disabled = true;
			}else {
				sleepEnabled = true;
				document.getElementById("Sleep").disabled = true;
			}
			if (document.getElementById("Task").disabled == true){
				taskEnabled = false;
				document.getElementById("Task").disabled = true;
			}else {
			taskEnabled = true;
			document.getElementById("Task").disabled = true;
			}
		}
		function schoolFunc(){
			schoolHrs = document.getElementById("schoolAmt");
			schoolHrs = schoolHrs.value;
			schoolTime = document.getElementById("work");
			schoolTime = schoolTime.value;
			schoolArray = ["School", schoolHrs];
			document.getElementById("School").disabled = true;
			document.getElementById("SchoolForm").style.display = "none";
			if (sleepEnabled == true){
				document.getElementById("Sleep").disabled = false;
			}else{document.getElementById("Sleep").disabled = true;}
			if (taskEnabled == true){
				document.getElementById("Task").disabled = false;
			}else{document.getElementById("Task").disabled = true;}
		}
		
		function taskFunc(){	
			document.getElementById("add1").style.visibility="visible";
			var description  = document.getElementById("desc");
			var duration = document.getElementById("dur");
			var priority = document.getElementById("pri");
			var task = [description.value.toString(),duration.value.toString(),priority.value.toString()];
			allTasks[parseInt(priority.value.toString()) - 1].push(task);			
		}
		function openTask(){
			document.getElementById('TaskForm').style.display = "block";
			document.getElementById("Sleep").disabled = true;
			document.getElementById("School").disabled = true;
			}
		
		function plan(){
			document.getElementById("add1").style.visibility="hidden";
			document.getElementById('TaskForm').style.visibility = "hidden";
			document.getElementById('Task').style.visibility = "hidden";
			document.getElementById('Plan').style.visibility = "hidden";
			
			//calculating time left in the day
			hoursLeft = 23 - parseInt(sleepHrs) - parseInt(schoolHrs);
			for (i=0; i<allTasks.length; i++){
				for(j=0; j<allTasks[i].length; j++){
					var currentDuration = parseInt(allTasks[i][j][1]);
					hoursLeft = hoursLeft - currentDuration;	
				}			
			}		
			
			//sorting by duration
			for (i=0; i<allTasks.length; i++){
				bubbleSort(allTasks[i]);
			}
			
			if (hoursLeft < 0){
				/* button will show up that asks to remove the task for the lowest priority
				it will find the item in the allTasks that has the highest value for priority, and delete that item. If hoursLeft is still less than 0,
				then it will delete the item with the next highest value for priority*/
				document.getElementById('RemovePriority').style.visibility = "visible";
			}
			else{
				makeCal();
			}
		}
		function remPri(){
			document.getElementById('RemovePriority').style.visibility = "hidden";
			var removed = false;
			for(i=allTasks.length-1;i>=0;i--){
				for(j=allTasks[i].length-1;j>=0;j--){
					if (removed == false){
						allTasks[i].splice(j, 1);
						removed = true;
					}
				}
			}
			plan();
			}
		
		function makeCal(){
			document.getElementById('Table').style.visibility = "visible";
			document.getElementById('School').style.visibility = "hidden";
			document.getElementById('Sleep').style.visibility = "hidden";
			var table = document.getElementById("Table");
			
			//sleep
			start = parseInt(bedTime)%12;
			var row = table.insertRow();
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			end = (start%12 + parseInt(sleepHrs));
			if(end >= 12){
				if(startM == "AM"){
					endM = "PM";
				}else{
				endM = "AM";
				}
			}else{
				if(startM =="AM"){
					endM="AM";
							
				}else{
					endM="PM";
				}
						
			}
			end = end % 12;
			
			if(end == 0){
				end = 12;
			}
			if (start == 0){
				start = 12;
				}
			cell1.innerHTML = start.toString() + startM + " - " + end.toString() + endM;
			cell2.innerHTML = sleepArray[0];
			cell3.innerHTML = sleepArray[1] + " hr(s)";
			start = end;
			startM = endM;
			
			//school
			
			if (parseInt(schoolArray[1]) > 0){
				getReady = schoolTime - start;
				start = start + getReady;
				var row2 = table.insertRow();
				var cell1= row2.insertCell(0);
				var cell2 = row2.insertCell(1);
				var cell3 = row2.insertCell(2);
				end = (start%12 + schoolHrs);
				startM = "AM";
				
				if(end >= 12){
					if(startM == "AM"){
						endM = "PM";
					}else{
						endM = "AM";
						}
				}else{
					endM = startM;
				}
				end = end % 12;
				
				if(end == 0){
					end = 12;
				}
		
				if (start == 0){
					start = 12;
				}
				
				cell1.innerHTML = start.toString() + startM + " - " + end.toString() + endM;
				cell2.innerHTML = schoolArray[0];
				cell3.innerHTML = schoolArray[1] + " hr(s)";
				start = end;
				startM = endM;
			}else{
				end = end +1;
				start = end;
				startM = "AM";
				if(end >= 12){
					if(startM == "AM"){
						endM = "PM";
					}else{
						endM = "AM";
						}
				}else{
					endM = startM;
				}
				end = end % 12;
				
				if(end == 0){
					end = 12;
				}
		
				if (start == 0){
					start = 12;
				}
			}
			
			//tasks
			for (i=0; i<allTasks.length; i++){
				for (j=0; j<allTasks[i].length; j++){
					var row3 = table.insertRow();
					var cell1 = row3.insertCell(0);
					var cell2 = row3.insertCell(1);
					var cell3 = row3.insertCell(2);
					var end = (start%12 + parseInt(allTasks[i][j][1]));
					
					if(end >= 12){
						if(startM == "AM"){
							endM = "PM";
						}else{
							endM = "AM";
						}
					}
					end = end % 12;
					if(end == 0){
						end = 12;
					}
	
					if (start == 0){
						start = 12;
					}
					cell1.innerHTML = start.toString()+ startM + " - " + end.toString() + endM;
					cell2.innerHTML = allTasks[i][j][0];
					cell3.innerHTML = allTasks[i][j][1] + " hr(s)";
					start = end;
					startM = endM;
					}
			}
		}
