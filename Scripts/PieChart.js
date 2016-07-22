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
comments: [{"user":"wadem", "comment":"u a bitch", "time":"2:04 am"}, 
{"user":"sidm", "comment":"ur mom's a whore", "time":"2:05 am"},
{"user":"sidm", "comment":"ur mom's a whore slksjdfl sdl ksdlf ksd lk sdlfk sdlf sld flsdk flskd flks dfl ksdflkjsdlkf sdf lksdjf", "time":"2:05 am"},
{"user":"wadem", "comment":"ur mom's a whore slksjdfl sdl ksdlf ksd lk sdlfk sdlf sld flsdk flskd flks dfl ksdflkjsdlkf sdf lksdjf", "time":"2:05 am"},
],
description:"Bet between sid and wade for steelers v Patriots",
expDate:"7/28/2016"
}, 
{username:"wadem", challenge:"SuperBowl 2", opponent: "jacob", betVals:[{"label":"wadem", "value":30, charity:"Animal Society"}, {"label":"jacob", "value":30, charity:"Save Pandas"}], winCondition:"Steelers win", loseCondition:"Panthers win", comments: [{"user":"wadem", "comment":"u a bitch", "time":"2:04 am"}, {"user":"sidm", "comment":"ur mom's a whore", "time":"2:05 am"}], description:"Bet between jacob and wade for Panthers v steelers",
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
      .html("<strong>" + d.challenge + "</strong><br/><hr/>")
      .on("click", function() {
            var svgs = document.getElementsByTagName("svg");
            for (var p = 0; p < svgs.length; p++) {
              var tags = svgs[p].getElementsByTagName("strong");
              for (var i = 0; i < tags.length; i++) {

                if (tags[i].innerText == d.challenge) {
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
            return "red";

          } else {
            done = false;
            return "blue";

          }
        });


     g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radius - 30)
        .attr("fill", "white")

        .append("text")
        .attr("dx", function(d){return -20})
        .on("click", function() {

        })


      var label = g.append("text")
        .text(function(){
          return d.challenge;
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
    if (title == d.challenge) {
        updateTitleDesc(d);
        displayGraphInModal(d);
    }
  })
}

function updateTitleDesc(d){
  console.log(d);
  document.getElementById("challengeTitle").innerText = d.challenge;
  document.getElementById("descExp").innerHTML = "<h2 class=\"center\">" + d.description + "<br/><br/>" + d.expDate + "</h2>";
  document.getElementById("opponents").innerHTML = "<h2 class=\"center\">USER:" + d.username + "</h2><h2 class=\"center\">USER'S CHARITY:" + getCharity(d, d.username) + "</h2><br/><h2 class=\"center\">OPPONENT: " + d.opponent  + "</h2><h2 class=\"center\"> OPPONENT'S CHARITY: " + getCharity(d, d.opponent) + "</h2>";
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
        var ul = document.getElementById("commentsList");
        if (commentsList[c].user == d.username) {
          color = "lightgreen";
        } else {
          color = "lightgray";
        }
        var li = document.createElement("li");
        li.style.backgroundColor = color;
        li.appendChild(document.createTextNode(commentsList[c].comment));
        ul.appendChild(li);
   }
}

function displayGraphInModal(d) {
    var width = 1500;
    var height = 600;
    var tiles = d3.select("#modal-body");
    document.getElementById("titleField").innerHTML="";
    document.getElementById("commentsList").innerHTML="";
    tiles.select("svg").remove();
    loadComments(d);


     d3.select("#titleField")
     .append("foreignObject")
      .attr("width", "100%")
      .attr("text-align", "center")
      .attr("cy", "50")
      //.attr("transform", "translate(-145,-300)")
    .append("xhtml:div")
       .attr("text-align", "center")
      .attr("vertical-align", "text-top")
      .style("font", "40px 'Helvetica Neue'")
      .html("<strong>" + d.username + " v. " + d.opponent + "</strong>");

    var svg = tiles.append("svg")
        .attr("width", width/1.5)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(500," + height / 2 + ")");

   

    var g = svg.selectAll(".arc")
        .data(pie(d.betVals))
      .enter().append("g")
        .attr("class", "arc");



 
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
        .attr("r", radius - 30)
        .attr("fill", "white")

        .append("text")
        .attr("dx", function(d){return -20})
        .on("click", function() {
          
        })


      var label = g.append("text")
        .text(function(){
          return d.challenge;
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
}