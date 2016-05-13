/* **********************

CODED BY DAVID LUX (twitter: itsdavelux)


*/


//********** VARIABLES
var html = '';
var xhr = new XMLHttpRequest();
var streamInfo;
var game;
var status;
var finalList;
var onlineStreamer = [];
var onlineNames = [];
var offlineStreamer = [];
var offlineNames = [];
var streamerList = document.getElementsByClassName('streamer-list')[0];
var streamer = ["freecodecamp", "gronkh", "OgamingSC2", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "brunofin"];


//********** FUNCTIONS
//********** Make streamer html for the streamer list
var makeStreamer = function(name, status, game) {

	var game = game || '';

	html += '<div class="streamer">';
	html += '<div class="status ' + status + '"></div>';
	html += '<h3 class="name">' + name + '</h3>';
	html += '<p class="playing">' + game + '</p>';
	html += '<a class="link" target="_blank" href="https://www.twitch.tv/' + name + '">WATCH NOW</a>';
	html += '</div>';

	return html;

};


//********** Get stream objects and save them in online/offline arrays
var getStreamer = function() {

	for (var i = 0; i < streamer.length; i++) {

		xhr.open("GET", "https://api.twitch.tv/kraken/streams/" + streamer[i], false);
		xhr.send();
		streamInfo = JSON.parse(xhr.responseText);


		if (streamInfo.stream) {
			onlineStreamer.push(streamInfo);
			onlineNames.push(streamer[i]);
		} else {
			offlineStreamer.push(streamInfo);
			offlineNames.push(streamer[i]);
		}

	}

}


//********** Make list of all streamers who are offline
var makeOnlineList = function() {

	for (var j = 0; j < onlineStreamer.length; j++) {

		onlineStreamer[j].stream ? (game = onlineStreamer[j].stream.game, status = "online") : (game = '', status = '');
		finalList = makeStreamer(onlineNames[j], status, game);

	}

	streamerList.innerHTML = finalList;

}


//********** Make list of all streamers who are
var makeOfflineList = function() {

	for (var k = 0; k < offlineStreamer.length; k++) {

		offlineStreamer[k].stream ? (game = offlineStreamer[k].stream.game, status = "online") : (game = 'offline', status = '');
		if (offlineStreamer[k].error) game = "Account closed";
		finalList = makeStreamer(offlineNames[k], status, game);

	}

	streamerList.innerHTML = finalList;

}


//********** Make site on load
getStreamer();
makeOnlineList();
makeOfflineList();


//********** Click event handler for the selection
$('#online').on('click', function() {
	$('#all').removeClass('active-control');
	$('#offline').removeClass('active-control');
	$('#online').addClass('active-control');
	html = '';
	makeOnlineList();
});

$('#offline').on('click', function() {
	$('#all').removeClass('active-control');
	$('#online').removeClass('active-control');
	$('#offline').addClass('active-control');
	html = '';
	makeOfflineList();
});

$('#all').on('click', function() {
	$('#online').removeClass('active-control');
	$('#offline').removeClass('active-control');
	$('#all').addClass('active-control');
	html = '';
	makeOnlineList();
	makeOfflineList();
});
