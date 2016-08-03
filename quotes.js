var q1= "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. -Dr.Seuss"
var q2= "Success is the sum of small efforts repeated day in and day out."
var q3= "Education is our passport to the future, for tomorrow belongs to the people who prepare for it today. -Malcolm X"
var q4= "Education is the most powerful weapon, which you can use to change the world. -Nelson Mandela"
var q5= "In order to succeed we must first believe that we can."
var q6= "Success is not an accident. It is hard work, persevance, learning, studying, sacrifice and most of all love what you are doing. -Pele"

window.onload = function quotefun(){
	var quotes= [q1,q2,q3,q4,q5,q6];
	var randomnumber= Math.floor(Math.random() * quotes.length);
	document.getElementById("qotd").innerHTML =  quotes[randomnumber];
};