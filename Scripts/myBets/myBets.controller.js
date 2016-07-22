(function () {
    "use strict";



  angular.module('betterBets.myBets', [])
    .controller('myBetsController', ['$scope', function($scope) {
      $scope.records = [{username:"wadem",challenge:"SuperBowl", opponent: "sidm", betVal:50, charity:"Cancer Society", winCondition:"Steelers win", loseCondition:"Patriots win"}, 
      {username:"wadem", challenge:"SuperBowl 2", opponent: "jacob", betVal:20, charity:"Cancer Foundation", winCondition:"Steelers win", loseCondition:"Panthers win"}];
    }]);
}());

window.onload = function() {
    var tiles = document.getElementsByClassName("toggle-tile");

    var svgs = document.getElementsByTagName("svg");

    for (var p = 0; p < svgs.length; p++) {
    	var paths = svgs[p].getElementsByTagName("path");
    	var circles = svgs[p].getElementsByTagName("circle");
    	for (var path = 0; path< paths.length; path++) {
    		paths[path].addEventListener('click', function() {
    			openModal(this);
    		})
    	}
    	for (var c = 0; c< circles.length; c++) {
    		circles[c].addEventListener('click', function() {
    			openModal(this);
    		})
    	}
    	
    }

	for (var i = 0; i < tiles.length; i++) {
		var c = tiles[i].childNodes;
		for (var p = 0; p < c.length; p++){
			if (c[p].className && c[p].className.includes("challengeTitle")) {
			    c[p].addEventListener('click', function() {
			    	toggleTile(this);
			    });
			}

		}
	}

	var span = document.getElementsByClassName("close")[0];
	var modal = document.getElementById('modal-fullscreen');
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.visibility = "hidden";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.visibility = "hidden";
	    }
	}
}

function toggleTile(tile) {
	var c = tile.parentElement.childNodes;
	for (var i = 0; i < c.length; i ++){
		if (c[i].className && c[i].className.includes("betData")) {
				if (isHidden(c[i])) {
					c[i].style.visibility = "visible";
				} else {
					c[i].style.visibility = "hidden";
				}
		}
	}
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.visibility == 'hidden')
}



function openModal(g) {
	g = g.parentElement;
	var modal = document.getElementById('modal-fullscreen');
	modal.style.visibility = "visible";
	var tags = g.getElementsByTagName("strong");
	displayInModal(tags[0].innerText);
}

function postComment() {
	alert("comment posted");
}