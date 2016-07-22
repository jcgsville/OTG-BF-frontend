var width = 1250,
    height = 800,
    radius = Math.min(width/3, height/1.5) / 2;

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { console.log(d); return d.value; });

var done = false;


var data = [
{username:"wadem",
challenge:"SuperBowl", 
opponent: "sidm", 
betVals: [{"label":"wadem", "value":20, charity:"Cancer Society"}, {"label":"sidm", "value":50, charity:"Cancer Foundation"}], 
winCondition:"Steelers win", 
loseCondition:"Patriots win", 
comments: [{"user":"wadem", "comment":"you're the reason they put instructions on shampoo!", "time":"2:04 am"}, 
{"user":"sidm", "comment":"...well its not intuitive", "time":"2:05 am"},
{"user":"wadem", "comment":"thats why you work at fairchild", "time":"2:05 am"},
{"user":"sidm", "comment":"ha", "time":"2:05 am"},
],
description:"Bet between sid and wade for steelers v Patriots",
expDate:"7/28/2016"
}, 
{username:"wadem", challenge:"SuperBowl 2", opponent: "jacob", betVals:[{"label":"wadem", "value":30, charity:"Animal Society"}, {"label":"jacob", "value":30, charity:"Save Pandas"}], winCondition:"Steelers win", loseCondition:"Panthers win", comments: [{"user":"wadem", "comment":"you're going down!", "time":"2:04 am"}, {"user":"sidm", "comment":"yeah right!", "time":"2:05 am"}], description:"Bet between jacob and wade for Panthers v steelers",
expDate:"7/29/2016"}];

  data.forEach(function(d) {
    var tiles = d3.selectAll("#graph-container");

    var svg = tiles.append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(d.betVals))
      .enter().append("g")
        .attr("class", "arc");

    g.append("foreignObject")
      .attr("width", "100%")
      .attr("height", 50)
      .attr("transform", "translate(-375,-300)")
    .append("xhtml:g")
      .style("font", "20px 'Helvetica Neue'")
      .style("text-align", "left")
      .html("<strong>" + d.username + " vs " + d.opponent + "</strong><br/><p>"+d.description+"</p><hr/>")
      .on("click", function() {
            var svgs = document.getElementsByTagName("svg");
            for (var p = 0; p < svgs.length; p++) {
              var tags = svgs[p].getElementsByTagName("strong");
              for (var i = 0; i < tags.length; i++) {
                var name =  d.username + " vs " + d.opponent;
                if (tags[i].innerText == name) {
                  if (svgs[p].style.visibility == "visible") {
                      console.log(svgs[p]);
                      svgs[p].style.visibility = "hidden";
                      tags[i].style.visibility = "visible";
                  } else {
                      svgs[p].style.visibility = "visible";
                  }
                }
              }
            }
      });


    var path = g.append("path")
        .attr("d", arc)
        .style("fill",  function(d) {
          if (done == false) {
            done = true;
            return "#00994d";

          } else {
            done = false;
            return "00004d";

          }
        });


     g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radius - 50)
        .attr("fill", "white")

        .append("text")
        .attr("dx", function(d){return -20})
        .on("click", function() {

        })


      var label = g.append("text")
        .text(function(){
          var name =  d.username + " vs " + d.opponent;
          return name;
        })
        .attr({
          "alignment-baseline": "middle",
          "text-anchor": "middle"
        })

        path.append("foreignObject")
          .attr("width", 200)
          .attr("height", 50)
          .attr("transform", "translate(250,0)")
        .append("xhtml:g")
          .style("font", "20px 'Helvetica Neue'")
          .style("text-align", "center")
          .html(function(d) {
            console.log(d.data);
            return "<strong>" + d.data.label + "<br/>" + "wins if " + d.data.charity + "</strong>";
          });

        path.append("foreignObject")
          .attr("width", 200)
          .attr("height", 50)
          .attr("transform", "translate(-400, 0)")
          .append("xhtml:g")
            .style("font", "20px 'Helvetica Neue'")
            .style("text-align", "center")
            .html(function(d) {
              return "<strong>" + d.data.label + "<br/>" + "wins if " + d.data.charity + "</strong>";
            });


  g.append("foreignObject")
      .attr("width", 200)
      .style("text-align", "center")
      .attr("height", 50)
      .attr("transform", function(d) { var c = arc.centroid(d);
        return "translate(" + (c[0]*3 -100)+"," + c[1]*2.5 + ")";
      })
    .append("xhtml:g")
      .style("font", "20px 'Helvetica Neue'")
      .style("text-align", "center")
      .html(function(d) { return "<strong>$" + d.data.value + "<br/>" + d.data.charity + "</strong>";});

})

function type(d) {
  d.data.betVals.value = +d.data.betVals.value;
  return d;
}

function displayInModal(title) {
  data.forEach(function(d) {
    console.log(d);
    var name =  d.username + " vs " + d.opponent;
    if (title == name) {
        updateTitleDesc(d);
        displayGraphInModal(d);
    }
  })
}

function updateTitleDesc(d){
  console.log(d);
  document.getElementById("challengeTitle").innerText = d.username + " vs " + d.opponent;
  document.getElementById("desc").innerHTML = "<h4 class=\"center descriptionC\">" + d.description + "<h4/>";
<<<<<<< HEAD
  document.getElementById("exp").innerHTML = "<h4 class=\"center\">" + "This bet expires on " + d.expDate + ". Your money will be donated to the winner's charity on that date.<h4/>";
=======
  document.getElementById("exp").innerHTML = "<h4 class=\"center\">" + "This bet expires on " + d.expDate + ". Your money will be donated to the charity of your choice on that date.<h4/>";
>>>>>>> 7c4f367650ac61e76cc9fc890f6a55831ee08189
  document.getElementById("user").innerHTML = "<h1 class=\"userStyle\">" + d.username + "</h1><h2 class=\"charityName\"><span class=\"charityNameHeader\">Charity:</span><br/>" + getCharity(d, d.username) + "</h2><h2 class=\"charityName\"> <span class=\"charityNameHeader\">Condition:</span><br/>" + d.winCondition +" </h2>";
  document.getElementById("opponents").innerHTML = "<h1 class=\"userStyle\">" + d.opponent  + "</h1><h2 class=\"charityName\"><span class=\"charityNameHeader\">Charity:</span><br/>" + getCharity(d, d.opponent) + "</h2><h2 class=\"charityName\"><span class=\"charityNameHeader\">Condition:</span><br/>" + d.loseCondition +"</h2>";
}

function getCharity(data, name) {
    var bets = data.betVals;
    for (var b = 0; b < bets.length; b++) {
       if (bets[b].label == name) {
          return bets[b].charity;
       }
    }
}

function loadComments(d) {
  var commentsList = d.comments;
  for (var c = 0; c < commentsList.length; c++) {
      addComment(commentsList[c].comment, commentsList[c].user, d);
   }
}

function addComment(comment, user, d) {
        var div = document.getElementById("commentsList");
        var msg = document.createElement("div");

        var clear = document.createElement("div");
        if (user == d.username) {
          msg.className = "from-me";
          
        } else {
           msg.className = "from-them";
        }
        clear.className = "clear";
        var text = document.createElement("p");
        var node = document.createTextNode(comment);

        var br = document.createElement("br");
        text.appendChild(node);

        clear.appendChild(br);
        clear.style.lineHeight = "50%";
        msg.appendChild(text);
        div.appendChild(msg);
        div.appendChild(clear);
}

function displayGraphInModal(d) {

    var tiles = d3.select("#graph");
    //document.getElementById("titleField").innerHTML="";
    document.getElementById("commentsList").innerHTML="";
    tiles.select("svg").remove();
    loadComments(d);



    var svg = tiles.append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "center")
      .append("g")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("transform", "translate(" + width/3 + "," + height / 2 + ")");

   

    var g = svg.selectAll(".arc")
        .data(pie(d.betVals))
      .enter().append("g")
        .attr("class", "arc")
        .attr("width", "80%")
        .attr("height", "100%");



 
    var path = g.append("path")
        .attr("d", arc)
        .attr("transform", "translate(" + width/10 + ",0)")
        .attr("position", "relative")
        .style("fill",  function(d) {
          if (done == false) {
            done = true;
            return "#00994d";

          } else {
            done = false;
            return "00004d";

          }
        });


     g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("transform", "translate(" + width/10 + ",0)")
        .attr("r", radius - 40)
        .attr("fill", "white")

        .append("text")
        .attr("dx", function(d){return -20})
        .on("click", function() {
          
        })




        path.append("foreignObject")
          .attr("width", "30%")
          .attr("height", "10%")
          .attr("transform", "translate(250,0)")
        .append("xhtml:g")
          .style("font", "20px 'Helvetica Neue'")
          .style("text-align", "center")
          .html(function(d) {
            console.log(d.data);
            return "<strong>" + d.data.label + "<br/>" + "wins if " + d.data.charity + "</strong>";
          });

        path.append("foreignObject")
          .attr("width", "40%")
          .attr("height", "10%")
          //.attr("transform", "translate(-400, 0)")
          .append("xhtml:g")
            .style("font", "20px 'Helvetica Neue'")
            .style("text-align", "center")
            .html(function(d) {
              return "<strong>" + d.data.label + "<br/>" + "wins if " + d.data.charity + "</strong>";
            });


  g.append("foreignObject")
      .attr("width", "40%")
      .style("text-align", "center")
      .attr("height", "10%")
      .attr("transform", function(d) { var c = arc.centroid(d);
        return "translate(" + (c[0]*3)+"," + c[1]*3 + ")";
      })
    .append("xhtml:g")
      .style("font", "20px 'Helvetica Neue'")
      .style("text-align", "center")
      .html(function(d) { return "<strong>$" + d.data.value + "<br/>" + d.data.charity + "</strong>";});
}