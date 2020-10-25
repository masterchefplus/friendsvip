"use strict"; // Start of use strict

var old1;
var old2;

var oldtime;
var newtime;

function drawCharts(users, totaltrx) {
	var date = new Date();	
	if ($('#price-rate-chart').length) {

		var ctx = document.getElementById("price-rate-chart").getContext('2d');
		var LineChartDemo = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ["Aug 25","Nov 20","Jan 10","Sep "+date.getDate()], //"Aug 26","Aug 27",
				datasets: [{
					label: '',
					backgroundColor: "rgba(159,170,174,0)",
					borderColor: "#FAB915",
					pointColor: "#FAB915",
					data: [0,2000, 3000, users] //53,141
				}]
			},
			options: {
				steppedLine: 'after',
				legend: {
					display: false
				},
				scales: {
					xAxes: [{
						ticks: {
							fontColor: "white",
							fontSize: 16,
							fontFamily: 'Scada'
						}
					}],
					yAxes: [{
						ticks: {
							fontColor: "white",
							fontSize: 16,
							fontFamily: 'Scada',
							callback: function(value, index, values) {
								return '' + value;
							}
						}
					}]
				}

			}
		});
	}

	if ($('#hash-rate-chart').length) {

		var ctx = document.getElementById("hash-rate-chart").getContext('2d');
		var LineChartDemo = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ["Aug 25","Nov 20","Jan 10","Sep "+date.getDate()], //"Aug 26","Aug 27",
				datasets: [{
					label: '',
					backgroundColor: "rgba(159,170,174,0)",
					borderColor: "#FAB915",
					pointColor: "#FAB915",
					data: [0, 3353000, 5511000, totaltrx] //54800, 206000,
				}]
			},
			options: {
				steppedLine: 'before',
				legend: {
					display: false
				},
				scales: {
					xAxes: [{
						ticks: {
							fontColor: "white",
							fontSize: 16,
							fontFamily: 'Scada'
						}
					}],
					yAxes: [{
						ticks: {
							fontColor: "white",
							fontSize: 16,
							fontFamily: 'Scada',
							callback: function(value, index, values) {
								return value + ' TRX';
							}
						}
					}]
				}

			}
		});
	}

}

var statsInfo;
var iii;
var lastTime;
var statArr = [];

function stats() {
	iii=0;
	lastTime = 99573326135999;
	statsInfo = "";
	statsBody(0);
	//setTimeout(stats,60000);
}

function statsBody(j) {
	
	var url="";
	
	url="https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=50&start="+(j*50)+"&contract=TE1xyJa5R1exEEt8nrvvAy2MuD1uZgaWhR";
	//console.log(j,url);
	$.getJSON(url, function(data) {
		
		var key=0;
		var lvl ="";
		
		for (key in data.data) {
			if (iii>=10) {
				if (old1 != statsInfo && old2 != statsInfo && statsInfo != "") {
					$("#lastTransaction").html(statsInfo);
					old2 = old1;
					old1 = statsInfo;
				}	
				j = 100;
				
				break;
			} else if (data.data[key].contractRet == "SUCCESS") {
					
					
				if (data.data[key].value>0) {
					
					newtime = data.data[key].timestamp;
					//console.log(newtime,lastTime);
					if (newtime > lastTime) {
						j = 100;
						statsInfo = "";
						//console.log(statsInfo,"!!!");
						
					} else {
						lastTime = newtime;						
						if (data.data[key].value == "400"+"000000") lvl=1;
						if (data.data[key].value == "1200"+"000000") lvl=2;
						if (data.data[key].value == "3600"+"000000") lvl=3;
						if (data.data[key].value == "10800"+"000000") lvl=4;
						if (data.data[key].value == "32400"+"000000") lvl=5;
						if (data.data[key].value == "97200"+"000000") lvl=6;
						if (data.data[key].value == "291600"+"000000") lvl=7;
						if (data.data[key].value == "874800"+"000000") lvl=8;
						statsInfo +="<tr><td>"+parseUnixTimestamp(data.data[key].timestamp)+"</td><td>#"+lvl+"</td><td class='text-center'>"+(data.data[key].value/1000000)+" T&real;X</td><td class='text-right'>"+data.data[key].ownAddress+"</td></tr>";
						iii++;
					}
				}
				

			}
		}
		if (j<10) {
			statsBody(j+1);
		}		
	});




}



function parseUnixTimestamp(timeStamp) {
	var d = new Date(Number(timeStamp)*1);
	var day = d.getDate();
	var month = d.getMonth()+1;
	var year = d.getFullYear();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	
	if (day<10) day = "0"+day;
	if (month<10) month = "0"+month;
	if (hours<10) hours = "0"+hours;
	if (minutes<10) minutes = "0"+minutes;
	
	var timeStampCon = day + '/' + month + '/' + year + " " + hours + ':' + minutes;
	return timeStampCon;
}

