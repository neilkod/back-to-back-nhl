"use strict";
/* Back-to-Back: embedded dataset + pure algorithm functions.
   No DOM code here. Shared by index.html (app.js) and how.html, so the
   "How this works" worked example runs the exact same logic as the app. */

const DATA = {"teams":{"NYR":{"abbr":"NYR","name":"Rangers","fullName":"New York Rangers","arena":"Madison Square Garden","city":"New York, NY","color":"#0038A8","games":[{"date":"2026-10-01","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2026-10-04","opp":"Utah Mammoth","oppAbbr":"UTA","time":"6:00 PM","hour":18},{"date":"2026-10-06","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2026-10-11","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"6:00 PM","hour":18},{"date":"2026-10-13","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:15 PM","hour":19.25},{"date":"2026-10-19","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2026-10-26","opp":"Los Angeles Kings","oppAbbr":"LA","time":"7:00 PM","hour":19},{"date":"2026-11-01","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"6:00 PM","hour":18},{"date":"2026-11-03","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2026-11-05","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2026-11-16","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:30 PM","hour":19.5},{"date":"2026-11-22","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"1:00 PM","hour":13},{"date":"2026-11-28","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2026-11-30","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2026-12-03","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-12-05","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2026-12-07","opp":"New Jersey Devils","oppAbbr":"NJ","time":"7:00 PM","hour":19},{"date":"2026-12-13","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"6:00 PM","hour":18},{"date":"2026-12-18","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-12-22","opp":"New Jersey Devils","oppAbbr":"NJ","time":"7:00 PM","hour":19},{"date":"2026-12-29","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-01-03","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"6:00 PM","hour":18},{"date":"2027-01-07","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:00 PM","hour":19},{"date":"2027-01-16","opp":"Boston Bruins","oppAbbr":"BOS","time":"12:00 PM","hour":12},{"date":"2027-01-17","opp":"Dallas Stars","oppAbbr":"DAL","time":"6:00 PM","hour":18},{"date":"2027-01-19","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2027-01-25","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2027-01-27","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:30 PM","hour":19.5},{"date":"2027-02-03","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:30 PM","hour":19.5},{"date":"2027-02-12","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2027-02-15","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"3:00 PM","hour":15},{"date":"2027-02-26","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2027-03-03","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2027-03-07","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"6:00 PM","hour":18},{"date":"2027-03-16","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2027-03-18","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-03-20","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"8:00 PM","hour":20},{"date":"2027-03-21","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2027-03-29","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2027-04-03","opp":"Florida Panthers","oppAbbr":"FLA","time":"12:00 PM","hour":12},{"date":"2027-04-06","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:30 PM","hour":19.5},{"date":"2027-04-10","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19}]},"NYI":{"abbr":"NYI","name":"Islanders","fullName":"New York Islanders","arena":"UBS Arena","city":"Elmont, NY","color":"#00539B","games":[{"date":"2026-10-03","opp":"New Jersey Devils","oppAbbr":"NJ","time":"7:30 PM","hour":19.5},{"date":"2026-10-08","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:30 PM","hour":19.5},{"date":"2026-10-10","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:30 PM","hour":19.5},{"date":"2026-10-13","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"7:45 PM","hour":19.75},{"date":"2026-10-20","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2026-10-22","opp":"Los Angeles Kings","oppAbbr":"LA","time":"7:30 PM","hour":19.5},{"date":"2026-10-31","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"3:30 PM","hour":15.5},{"date":"2026-11-05","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2026-11-07","opp":"New Jersey Devils","oppAbbr":"NJ","time":"7:00 PM","hour":19},{"date":"2026-11-17","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2026-11-23","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:30 PM","hour":19.5},{"date":"2026-11-25","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2026-11-27","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:30 PM","hour":19.5},{"date":"2026-12-01","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2026-12-04","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-12-07","opp":"Colorado Avalanche","oppAbbr":"COL","time":"1:00 PM","hour":13},{"date":"2026-12-10","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2026-12-20","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2026-12-22","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2026-12-27","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2026-12-30","opp":"Washington Capitals","oppAbbr":"WSH","time":"4:00 PM","hour":16},{"date":"2027-01-13","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:30 PM","hour":19.5},{"date":"2027-01-15","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2027-01-18","opp":"Nashville Predators","oppAbbr":"NSH","time":"3:00 PM","hour":15},{"date":"2027-01-20","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2027-01-23","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:30 PM","hour":19.5},{"date":"2027-02-13","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2027-02-15","opp":"Utah Mammoth","oppAbbr":"UTA","time":"3:00 PM","hour":15},{"date":"2027-02-18","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2027-02-26","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2027-03-01","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2027-03-04","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2027-03-07","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"1:00 PM","hour":13},{"date":"2027-03-09","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2027-03-20","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"3:00 PM","hour":15},{"date":"2027-03-21","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"3:00 PM","hour":15},{"date":"2027-03-27","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:30 PM","hour":19.5},{"date":"2027-03-30","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-04-02","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2027-04-04","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:30 PM","hour":19.5},{"date":"2027-04-06","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:30 PM","hour":19.5},{"date":"2027-04-10","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"5:00 PM","hour":17}]},"NJ":{"abbr":"NJ","name":"Devils","fullName":"New Jersey Devils","arena":"Prudential Center","city":"Newark, NJ","color":"#CE1126","games":[{"date":"2026-10-01","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2026-10-06","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2026-10-10","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"3:30 PM","hour":15.5},{"date":"2026-10-12","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2026-10-15","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2026-10-20","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2026-10-22","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2026-10-24","opp":"Los Angeles Kings","oppAbbr":"LA","time":"3:30 PM","hour":15.5},{"date":"2026-11-03","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:00 PM","hour":19},{"date":"2026-11-05","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2026-11-12","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2026-11-18","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:30 PM","hour":19.5},{"date":"2026-11-23","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2026-11-27","opp":"Calgary Flames","oppAbbr":"CGY","time":"1:00 PM","hour":13},{"date":"2026-11-28","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:00 PM","hour":19},{"date":"2026-12-01","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-12-09","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:30 PM","hour":19.5},{"date":"2026-12-15","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2026-12-17","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2026-12-19","opp":"Boston Bruins","oppAbbr":"BOS","time":"12:00 PM","hour":12},{"date":"2026-12-20","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-12-27","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2027-01-07","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2027-01-09","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"12:00 PM","hour":12},{"date":"2027-01-16","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2027-01-19","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2027-01-21","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2027-01-24","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2027-01-26","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2027-02-20","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"3:00 PM","hour":15},{"date":"2027-02-23","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-03-02","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2027-03-05","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2027-03-18","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19},{"date":"2027-03-20","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-03-23","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2027-03-29","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-03-31","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:30 PM","hour":19.5},{"date":"2027-04-04","opp":"Florida Panthers","oppAbbr":"FLA","time":"4:30 PM","hour":16.5},{"date":"2027-04-06","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2027-04-08","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2027-04-10","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"6:00 PM","hour":18}]},"WSH":{"abbr":"WSH","name":"Capitals","fullName":"Washington Capitals","arena":"Capital One Arena","city":"Washington, DC","color":"#041E42","games":[{"date":"2026-10-07","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:30 PM","hour":19.5},{"date":"2026-10-09","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2026-10-11","opp":"Seattle Kraken","oppAbbr":"SEA","time":"5:00 PM","hour":17},{"date":"2026-10-14","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:30 PM","hour":19.5},{"date":"2026-10-17","opp":"New Jersey Devils","oppAbbr":"NJ","time":"1:00 PM","hour":13},{"date":"2026-10-20","opp":"Los Angeles Kings","oppAbbr":"LA","time":"7:00 PM","hour":19},{"date":"2026-10-24","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2026-10-28","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:30 PM","hour":19.5},{"date":"2026-11-01","opp":"Minnesota Wild","oppAbbr":"MIN","time":"3:30 PM","hour":15.5},{"date":"2026-11-03","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2026-11-07","opp":"Florida Panthers","oppAbbr":"FLA","time":"12:30 PM","hour":12.5},{"date":"2026-11-14","opp":"New Jersey Devils","oppAbbr":"NJ","time":"7:00 PM","hour":19},{"date":"2026-11-19","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2026-11-25","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2026-11-27","opp":"Florida Panthers","oppAbbr":"FLA","time":"3:00 PM","hour":15},{"date":"2026-12-01","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"7:00 PM","hour":19},{"date":"2026-12-17","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2026-12-19","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2026-12-26","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2026-12-28","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:00 PM","hour":19},{"date":"2027-01-02","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2027-01-04","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:30 PM","hour":19.5},{"date":"2027-01-12","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2027-01-14","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-01-16","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2027-01-19","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2027-01-22","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2027-02-02","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"6:00 PM","hour":18},{"date":"2027-02-14","opp":"Utah Mammoth","oppAbbr":"UTA","time":"1:00 PM","hour":13},{"date":"2027-02-16","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2027-02-19","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2027-02-21","opp":"Nashville Predators","oppAbbr":"NSH","time":"6:00 PM","hour":18},{"date":"2027-02-23","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2027-03-03","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-03-09","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2027-03-15","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"1:00 PM","hour":13},{"date":"2027-03-17","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2027-03-23","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-03-26","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2027-03-30","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:00 PM","hour":19},{"date":"2027-04-03","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"5:00 PM","hour":17},{"date":"2027-04-04","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19}]},"PHI":{"abbr":"PHI","name":"Flyers","fullName":"Philadelphia Flyers","arena":"Xfinity Mobile Arena","city":"Philadelphia, PA","color":"#F74902","games":[{"date":"2026-09-30","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:30 PM","hour":19.5},{"date":"2026-10-03","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2026-10-11","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2026-10-13","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2026-10-17","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2026-10-19","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2026-10-24","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"1:00 PM","hour":13},{"date":"2026-10-27","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2026-11-01","opp":"Utah Mammoth","oppAbbr":"UTA","time":"4:00 PM","hour":16},{"date":"2026-11-03","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2026-11-15","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:30 PM","hour":19.5},{"date":"2026-11-17","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2026-11-27","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"3:00 PM","hour":15},{"date":"2026-11-28","opp":"New York Islanders","oppAbbr":"NYI","time":"7:30 PM","hour":19.5},{"date":"2026-12-03","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2026-12-11","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2026-12-14","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2026-12-16","opp":"New York Rangers","oppAbbr":"NYR","time":"7:30 PM","hour":19.5},{"date":"2026-12-18","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2026-12-21","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2027-01-07","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-01-10","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:30 PM","hour":19.5},{"date":"2027-01-16","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2027-01-21","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2027-01-23","opp":"New Jersey Devils","oppAbbr":"NJ","time":"7:30 PM","hour":19.5},{"date":"2027-01-26","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2027-01-28","opp":"Los Angeles Kings","oppAbbr":"LA","time":"7:00 PM","hour":19},{"date":"2027-01-30","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"1:00 PM","hour":13},{"date":"2027-02-03","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:30 PM","hour":19.5},{"date":"2027-02-13","opp":"New Jersey Devils","oppAbbr":"NJ","time":"7:30 PM","hour":19.5},{"date":"2027-02-20","opp":"New York Rangers","oppAbbr":"NYR","time":"12:00 PM","hour":12},{"date":"2027-02-22","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"1:00 PM","hour":13},{"date":"2027-02-24","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2027-02-27","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2027-03-02","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2027-03-05","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2027-03-07","opp":"St. Louis Blues","oppAbbr":"STL","time":"1:00 PM","hour":13},{"date":"2027-03-16","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-03-18","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2027-03-30","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19},{"date":"2027-04-01","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2027-04-10","opp":"Washington Capitals","oppAbbr":"WSH","time":"12:00 PM","hour":12}]},"BOS":{"abbr":"BOS","name":"Bruins","fullName":"Boston Bruins","arena":"TD Garden","city":"Boston, MA","color":"#FFB81C","games":[{"date":"2026-09-29","opp":"New York Rangers","oppAbbr":"NYR","time":"8:00 PM","hour":20},{"date":"2026-10-05","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:30 PM","hour":19.5},{"date":"2026-10-08","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2026-10-10","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"1:00 PM","hour":13},{"date":"2026-10-22","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-10-24","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-10-31","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"1:00 PM","hour":13},{"date":"2026-11-02","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2026-11-08","opp":"Florida Panthers","oppAbbr":"FLA","time":"1:00 PM","hour":13},{"date":"2026-11-12","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2026-11-14","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2026-11-17","opp":"Los Angeles Kings","oppAbbr":"LA","time":"7:00 PM","hour":19},{"date":"2026-11-21","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2026-11-25","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:00 PM","hour":19},{"date":"2026-11-27","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"1:00 PM","hour":13},{"date":"2026-11-29","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"5:00 PM","hour":17},{"date":"2026-12-01","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:30 PM","hour":19.5},{"date":"2026-12-05","opp":"Detroit Red Wings","oppAbbr":"DET","time":"1:00 PM","hour":13},{"date":"2026-12-12","opp":"New Jersey Devils","oppAbbr":"NJ","time":"1:00 PM","hour":13},{"date":"2026-12-15","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2026-12-17","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2026-12-20","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"1:00 PM","hour":13},{"date":"2026-12-26","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2026-12-30","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:30 PM","hour":19.5},{"date":"2027-01-05","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:30 PM","hour":19.5},{"date":"2027-01-12","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-01-14","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2027-01-18","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"1:30 PM","hour":13.5},{"date":"2027-01-26","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2027-01-30","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-02-13","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2027-02-15","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"12:30 PM","hour":12.5},{"date":"2027-02-25","opp":"Washington Capitals","oppAbbr":"WSH","time":"8:00 PM","hour":20},{"date":"2027-02-27","opp":"Detroit Red Wings","oppAbbr":"DET","time":"12:00 PM","hour":12},{"date":"2027-03-06","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"12:00 PM","hour":12},{"date":"2027-03-08","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2027-03-13","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2027-03-15","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2027-03-23","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2027-03-25","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2027-03-30","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2027-04-03","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"3:00 PM","hour":15}]},"LA":{"abbr":"LA","name":"Kings","fullName":"Los Angeles Kings","arena":"Crypto.com Arena","city":"Los Angeles, CA","color":"#111111","games":[{"date":"2026-10-06","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:30 PM","hour":19.5},{"date":"2026-10-13","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:30 PM","hour":19.5},{"date":"2026-10-17","opp":"Boston Bruins","oppAbbr":"BOS","time":"6:00 PM","hour":18},{"date":"2026-10-29","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2026-10-31","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"1:00 PM","hour":13},{"date":"2026-11-04","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-11-07","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"6:00 PM","hour":18},{"date":"2026-11-10","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-11-12","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2026-11-14","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2026-11-28","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"6:00 PM","hour":18},{"date":"2026-12-01","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2026-12-03","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2026-12-05","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2026-12-09","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-12-12","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"7:00 PM","hour":19},{"date":"2026-12-26","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2026-12-30","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-01-02","opp":"New Jersey Devils","oppAbbr":"NJ","time":"6:00 PM","hour":18},{"date":"2027-01-04","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2027-01-06","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2027-01-09","opp":"Dallas Stars","oppAbbr":"DAL","time":"6:00 PM","hour":18},{"date":"2027-01-11","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2027-01-13","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2027-01-19","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2027-01-21","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:00 PM","hour":19},{"date":"2027-02-11","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-02-13","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"3:00 PM","hour":15},{"date":"2027-02-15","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2027-02-20","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:30 PM","hour":19.5},{"date":"2027-02-24","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2027-03-01","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2027-03-03","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2027-03-05","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2027-03-07","opp":"Colorado Avalanche","oppAbbr":"COL","time":"12:30 PM","hour":12.5},{"date":"2027-03-13","opp":"Dallas Stars","oppAbbr":"DAL","time":"6:00 PM","hour":18},{"date":"2027-03-16","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:00 PM","hour":19},{"date":"2027-03-18","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-03-29","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"6:30 PM","hour":18.5},{"date":"2027-03-31","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:00 PM","hour":19},{"date":"2027-04-03","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:30 PM","hour":19.5},{"date":"2027-04-08","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19}]},"ANA":{"abbr":"ANA","name":"Ducks","fullName":"Anaheim Ducks","arena":"Honda Center","city":"Anaheim, CA","color":"#F47A38","games":[{"date":"2026-10-04","opp":"Florida Panthers","oppAbbr":"FLA","time":"5:00 PM","hour":17},{"date":"2026-10-07","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:00 PM","hour":19},{"date":"2026-10-13","opp":"Calgary Flames","oppAbbr":"CGY","time":"6:45 PM","hour":18.75},{"date":"2026-10-16","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2026-10-27","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"7:00 PM","hour":19},{"date":"2026-10-29","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2026-11-01","opp":"Ottawa Senators","oppAbbr":"OTT","time":"5:00 PM","hour":17},{"date":"2026-11-08","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"5:00 PM","hour":17},{"date":"2026-11-11","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-11-14","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2026-11-15","opp":"Calgary Flames","oppAbbr":"CGY","time":"5:00 PM","hour":17},{"date":"2026-11-25","opp":"San Jose Sharks","oppAbbr":"SJS","time":"6:30 PM","hour":18.5},{"date":"2026-11-27","opp":"Los Angeles Kings","oppAbbr":"LA","time":"1:00 PM","hour":13},{"date":"2026-12-01","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2026-12-04","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2026-12-06","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"5:00 PM","hour":17},{"date":"2026-12-16","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"6:00 PM","hour":18},{"date":"2026-12-22","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2026-12-27","opp":"Colorado Avalanche","oppAbbr":"COL","time":"5:00 PM","hour":17},{"date":"2026-12-29","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-01-01","opp":"New Jersey Devils","oppAbbr":"NJ","time":"1:00 PM","hour":13},{"date":"2027-01-03","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"5:00 PM","hour":17},{"date":"2027-01-05","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2027-01-08","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2027-01-10","opp":"Washington Capitals","oppAbbr":"WSH","time":"5:00 PM","hour":17},{"date":"2027-01-12","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2027-01-14","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2027-01-28","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:00 PM","hour":19},{"date":"2027-01-30","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2027-02-09","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-02-11","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:00 PM","hour":19},{"date":"2027-02-24","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2027-02-27","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"4:00 PM","hour":16},{"date":"2027-03-05","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2027-03-07","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"5:00 PM","hour":17},{"date":"2027-03-16","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-03-18","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2027-03-20","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:30 PM","hour":19.5},{"date":"2027-03-22","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2027-03-30","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2027-04-03","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:00 PM","hour":19},{"date":"2027-04-06","opp":"Los Angeles Kings","oppAbbr":"LA","time":"7:00 PM","hour":19}]},"MTL":{"abbr":"MTL","name":"Canadiens","fullName":"Montreal Canadiens","arena":"Centre Bell","city":"Montreal, QC","color":"#AF1E2D","games":[{"date":"2026-10-06","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2026-10-08","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-10-10","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2026-10-13","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"6:30 PM","hour":18.5},{"date":"2026-10-17","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2026-10-20","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-10-31","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19},{"date":"2026-11-03","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:00 PM","hour":19},{"date":"2026-11-05","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2026-11-10","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2026-11-14","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2026-11-21","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2026-11-23","opp":"Los Angeles Kings","oppAbbr":"LAK","time":"7:30 PM","hour":19.5},{"date":"2026-12-02","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:30 PM","hour":19.5},{"date":"2026-12-05","opp":"Florida Panthers","oppAbbr":"FLA","time":"1:00 PM","hour":13},{"date":"2026-12-06","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2026-12-08","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2026-12-10","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2026-12-14","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:30 PM","hour":19.5},{"date":"2026-12-26","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2026-12-27","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2026-12-29","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2027-01-04","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:30 PM","hour":19.5},{"date":"2027-01-06","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:30 PM","hour":19.5},{"date":"2027-01-09","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19},{"date":"2027-01-13","opp":"New Jersey Devils","oppAbbr":"NJD","time":"7:00 PM","hour":19},{"date":"2027-01-21","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2027-01-23","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2027-01-26","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-02-13","opp":"Washington Capitals","oppAbbr":"WSH","time":"1:00 PM","hour":13},{"date":"2027-02-14","opp":"New York Rangers","oppAbbr":"NYR","time":"1:00 PM","hour":13},{"date":"2027-02-20","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2027-03-04","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2027-03-06","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"7:00 PM","hour":19},{"date":"2027-03-10","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:30 PM","hour":19.5},{"date":"2027-03-16","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2027-03-18","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2027-03-22","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:30 PM","hour":19.5},{"date":"2027-03-24","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:30 PM","hour":19.5},{"date":"2027-03-27","opp":"New Jersey Devils","oppAbbr":"NJD","time":"7:00 PM","hour":19},{"date":"2027-03-28","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-04-01","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19}]},"OTT":{"abbr":"OTT","name":"Senators","fullName":"Ottawa Senators","arena":"Canadian Tire Centre","city":"Ottawa, ON","color":"#000000","games":[{"date":"2026-10-08","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2026-10-10","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-10-13","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:30 PM","hour":19.5},{"date":"2026-10-15","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2026-10-21","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:30 PM","hour":19.5},{"date":"2026-10-22","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-10-24","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2026-11-07","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2026-11-10","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2026-11-12","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2026-11-19","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2026-11-21","opp":"Los Angeles Kings","oppAbbr":"LAK","time":"7:00 PM","hour":19},{"date":"2026-11-23","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:30 PM","hour":19.5},{"date":"2026-12-03","opp":"New Jersey Devils","oppAbbr":"NJD","time":"7:00 PM","hour":19},{"date":"2026-12-05","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2026-12-08","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2026-12-10","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2026-12-12","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:00 PM","hour":19},{"date":"2026-12-14","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"2:00 PM","hour":14},{"date":"2026-12-18","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:00 PM","hour":19},{"date":"2026-12-29","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2026-12-31","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"2:00 PM","hour":14},{"date":"2027-01-14","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:00 PM","hour":19},{"date":"2027-01-20","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:30 PM","hour":19.5},{"date":"2027-01-23","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"3:30 PM","hour":15.5},{"date":"2027-01-25","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:30 PM","hour":19.5},{"date":"2027-01-28","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2027-01-30","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2027-02-09","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2027-02-13","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-02-25","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-03-04","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2027-03-06","opp":"Seattle Kraken","oppAbbr":"SEA","time":"3:30 PM","hour":15.5},{"date":"2027-03-07","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"5:00 PM","hour":17},{"date":"2027-03-11","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2027-03-13","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2027-03-14","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"5:00 PM","hour":17},{"date":"2027-03-18","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2027-03-20","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2027-04-04","opp":"Detroit Red Wings","oppAbbr":"DET","time":"5:00 PM","hour":17},{"date":"2027-04-08","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2027-04-10","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19}]},"TOR":{"abbr":"TOR","name":"Maple Leafs","fullName":"Toronto Maple Leafs","arena":"Scotiabank Arena","city":"Toronto, ON","color":"#00205B","games":[{"date":"2026-09-29","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2026-09-30","opp":"New York Islanders","oppAbbr":"NYI","time":"7:30 PM","hour":19.5},{"date":"2026-10-03","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2026-10-06","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-10-15","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2026-10-17","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2026-10-19","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:30 PM","hour":19.5},{"date":"2026-10-22","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2026-11-03","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2026-11-07","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2026-11-08","opp":"New Jersey Devils","oppAbbr":"NJD","time":"7:00 PM","hour":19},{"date":"2026-11-10","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2026-11-12","opp":"Minnesota Wild","oppAbbr":"MIN","time":"7:00 PM","hour":19},{"date":"2026-11-14","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:00 PM","hour":19},{"date":"2026-11-19","opp":"Los Angeles Kings","oppAbbr":"LAK","time":"7:00 PM","hour":19},{"date":"2026-11-21","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2026-11-30","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:30 PM","hour":19.5},{"date":"2026-12-03","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2026-12-12","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2026-12-13","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2026-12-19","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2026-12-21","opp":"Washington Capitals","oppAbbr":"WSH","time":"1:00 PM","hour":13},{"date":"2027-01-09","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2027-01-11","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:30 PM","hour":19.5},{"date":"2027-01-14","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:00 PM","hour":19},{"date":"2027-01-16","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19},{"date":"2027-01-18","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:30 PM","hour":19.5},{"date":"2027-01-26","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2027-02-08","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:30 PM","hour":19.5},{"date":"2027-02-10","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:30 PM","hour":19.5},{"date":"2027-02-16","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-02-23","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-03-01","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-03-03","opp":"Seattle Kraken","oppAbbr":"SEA","time":"6:30 PM","hour":18.5},{"date":"2027-03-08","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:30 PM","hour":19.5},{"date":"2027-03-13","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"7:00 PM","hour":19},{"date":"2027-03-15","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:30 PM","hour":19.5},{"date":"2027-03-17","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:30 PM","hour":19.5},{"date":"2027-03-27","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2027-03-28","opp":"Washington Capitals","oppAbbr":"WSH","time":"6:00 PM","hour":18},{"date":"2027-04-03","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2027-04-05","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19}]},"DET":{"abbr":"DET","name":"Red Wings","fullName":"Detroit Red Wings","arena":"Little Caesars Arena","city":"Detroit, MI","color":"#CE1126","games":[{"date":"2026-10-02","opp":"New York Rangers","oppAbbr":"NYR","time":"6:30 PM","hour":18.5},{"date":"2026-10-04","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"1:00 PM","hour":13},{"date":"2026-10-06","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2026-10-09","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2026-10-13","opp":"New Jersey Devils","oppAbbr":"NJD","time":"6:00 PM","hour":18},{"date":"2026-10-15","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:00 PM","hour":19},{"date":"2026-10-17","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2026-10-29","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:00 PM","hour":19},{"date":"2026-10-31","opp":"St. Louis Blues","oppAbbr":"STL","time":"1:00 PM","hour":13},{"date":"2026-11-05","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"7:00 PM","hour":19},{"date":"2026-11-18","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:30 PM","hour":19.5},{"date":"2026-11-21","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2026-11-25","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"7:30 PM","hour":19.5},{"date":"2026-11-28","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2026-12-01","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2026-12-03","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2026-12-11","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2026-12-12","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2026-12-15","opp":"Los Angeles Kings","oppAbbr":"LAK","time":"7:00 PM","hour":19},{"date":"2026-12-20","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"5:00 PM","hour":17},{"date":"2026-12-22","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:30 PM","hour":19.5},{"date":"2026-12-31","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"2:00 PM","hour":14},{"date":"2027-01-02","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"1:00 PM","hour":13},{"date":"2027-01-07","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2027-01-09","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2027-01-17","opp":"Minnesota Wild","oppAbbr":"MIN","time":"5:00 PM","hour":17},{"date":"2027-01-19","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2027-01-23","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"1:00 PM","hour":13},{"date":"2027-01-25","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19},{"date":"2027-01-27","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:30 PM","hour":19.5},{"date":"2027-01-29","opp":"Florida Panthers","oppAbbr":"FLA","time":"7:00 PM","hour":19},{"date":"2027-02-18","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2027-02-21","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"3:30 PM","hour":15.5},{"date":"2027-03-04","opp":"New Jersey Devils","oppAbbr":"NJD","time":"7:00 PM","hour":19},{"date":"2027-03-06","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2027-03-12","opp":"Buffalo Sabres","oppAbbr":"BUF","time":"7:00 PM","hour":19},{"date":"2027-03-18","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2027-03-20","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"1:00 PM","hour":13},{"date":"2027-03-24","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:30 PM","hour":19.5},{"date":"2027-03-30","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:00 PM","hour":19},{"date":"2027-04-02","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-04-09","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19}]},"BUF":{"abbr":"BUF","name":"Sabres","fullName":"Buffalo Sabres","arena":"KeyBank Center","city":"Buffalo, NY","color":"#003087","games":[{"date":"2026-10-03","opp":"Chicago Blackhawks","oppAbbr":"CHI","time":"7:00 PM","hour":19},{"date":"2026-10-06","opp":"Minnesota Wild","oppAbbr":"MIN","time":"8:00 PM","hour":20},{"date":"2026-10-08","opp":"Dallas Stars","oppAbbr":"DAL","time":"7:00 PM","hour":19},{"date":"2026-10-10","opp":"Utah Mammoth","oppAbbr":"UTA","time":"7:00 PM","hour":19},{"date":"2026-10-12","opp":"Florida Panthers","oppAbbr":"FLA","time":"1:00 PM","hour":13},{"date":"2026-10-21","opp":"Philadelphia Flyers","oppAbbr":"PHI","time":"7:30 PM","hour":19.5},{"date":"2026-11-04","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:30 PM","hour":19.5},{"date":"2026-11-06","opp":"Columbus Blue Jackets","oppAbbr":"CBJ","time":"7:00 PM","hour":19},{"date":"2026-11-08","opp":"Vegas Golden Knights","oppAbbr":"VGK","time":"3:30 PM","hour":15.5},{"date":"2026-11-11","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:30 PM","hour":19.5},{"date":"2026-11-25","opp":"New York Rangers","oppAbbr":"NYR","time":"7:00 PM","hour":19},{"date":"2026-11-27","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"8:00 PM","hour":20},{"date":"2026-12-10","opp":"Edmonton Oilers","oppAbbr":"EDM","time":"7:00 PM","hour":19},{"date":"2026-12-12","opp":"Anaheim Ducks","oppAbbr":"ANA","time":"7:00 PM","hour":19},{"date":"2026-12-15","opp":"Calgary Flames","oppAbbr":"CGY","time":"7:00 PM","hour":19},{"date":"2026-12-18","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"7:00 PM","hour":19},{"date":"2026-12-20","opp":"Los Angeles Kings","oppAbbr":"LAK","time":"6:00 PM","hour":18},{"date":"2026-12-26","opp":"New Jersey Devils","oppAbbr":"NJD","time":"7:00 PM","hour":19},{"date":"2026-12-28","opp":"Detroit Red Wings","oppAbbr":"DET","time":"7:00 PM","hour":19},{"date":"2027-01-04","opp":"Winnipeg Jets","oppAbbr":"WPG","time":"7:30 PM","hour":19.5},{"date":"2027-01-09","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-01-12","opp":"New Jersey Devils","oppAbbr":"NJD","time":"7:00 PM","hour":19},{"date":"2027-01-14","opp":"Colorado Avalanche","oppAbbr":"COL","time":"7:00 PM","hour":19},{"date":"2027-01-16","opp":"Nashville Predators","oppAbbr":"NSH","time":"7:00 PM","hour":19},{"date":"2027-01-18","opp":"Montréal Canadiens","oppAbbr":"MTL","time":"1:00 PM","hour":13},{"date":"2027-01-21","opp":"Seattle Kraken","oppAbbr":"SEA","time":"7:00 PM","hour":19},{"date":"2027-02-03","opp":"New York Islanders","oppAbbr":"NYI","time":"7:00 PM","hour":19},{"date":"2027-02-18","opp":"Carolina Hurricanes","oppAbbr":"CAR","time":"7:00 PM","hour":19},{"date":"2027-02-26","opp":"Ottawa Senators","oppAbbr":"OTT","time":"7:30 PM","hour":19.5},{"date":"2027-02-27","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-03-02","opp":"Pittsburgh Penguins","oppAbbr":"PIT","time":"7:00 PM","hour":19},{"date":"2027-03-04","opp":"St. Louis Blues","oppAbbr":"STL","time":"7:00 PM","hour":19},{"date":"2027-03-06","opp":"New York Rangers","oppAbbr":"NYR","time":"3:00 PM","hour":15},{"date":"2027-03-09","opp":"Vancouver Canucks","oppAbbr":"VAN","time":"7:00 PM","hour":19},{"date":"2027-03-15","opp":"San Jose Sharks","oppAbbr":"SJS","time":"7:00 PM","hour":19},{"date":"2027-03-18","opp":"Washington Capitals","oppAbbr":"WSH","time":"7:00 PM","hour":19},{"date":"2027-03-20","opp":"Florida Panthers","oppAbbr":"FLA","time":"1:00 PM","hour":13},{"date":"2027-03-25","opp":"Toronto Maple Leafs","oppAbbr":"TOR","time":"7:00 PM","hour":19},{"date":"2027-04-01","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:30 PM","hour":19.5},{"date":"2027-04-05","opp":"Tampa Bay Lightning","oppAbbr":"TBL","time":"7:00 PM","hour":19},{"date":"2027-04-07","opp":"Boston Bruins","oppAbbr":"BOS","time":"7:00 PM","hour":19},{"date":"2027-04-10","opp":"Detroit Red Wings","oppAbbr":"DET","time":"6:00 PM","hour":18}]}},"travel":{"NYR-NYI":1,"NYR-NJ":0.6,"NYI-NJ":1.3,"NYR-PHI":1.6,"NYI-PHI":2.3,"NJ-PHI":1.3,"NYR-WSH":3,"NJ-WSH":2.7,"NYI-WSH":3.5,"PHI-WSH":1.7,"NYR-BOS":3.7,"NYI-BOS":3.9,"NJ-BOS":3.9,"PHI-BOS":5.3,"WSH-BOS":6.8,"LA-ANA":0.75,"MTL-OTT":2.1,"OTT-TOR":4.4,"TOR-DET":4,"TOR-BUF":1.9,"DET-BUF":4.3},"meta":{"season":"2026-27","generated":"validated against api-web.nhle.com regular-season schedule, 2026-07-17","note":"Home games only. Times are ET/PT local and subject to change; verify on NHL.com before purchasing tickets."}};

/* ---- config: slider stops (data-driven, don't hardcode count elsewhere) ---- */
const SLIDER_STOPS = [
  { hours: 0.75, label: "One city", helper: "Only games reachable within a single metro's core" },
  { hours: 1.5, label: "Same metro", helper: "Hop across a metro area (e.g. the NY-area arenas)" },
  { hours: 2.25, label: "Neighboring cities", helper: "Short intercity train (e.g. Philly ↔ Newark/NY)" },
  { hours: 3.0, label: "Full corridor", helper: "Longer Amtrak legs (e.g. NY ↔ DC). The whole Northeast chain connects" },
  { hours: 4.0, label: "Add Boston", helper: "Extends the Northeast corridor to Boston (BOS↔NY ≈ 3.7h)" },
  { hours: 4.5, label: "Great Lakes", helper: "Bridges Ottawa to Toronto (~4.4h) and Detroit to Buffalo (~4.3h), completing the Great Lakes chain" },
];

const DOUBLEHEADER_MIN_GAP = 4.5;

const TEAM_ORDER = Object.keys(DATA.teams);

/* ---- team logos, served from the NHL's own CDN. Two of our internal
   abbreviations (NJ, LA) are shortened for display and travel-matrix keys;
   the actual logo filenames use the NHL's official abbreviations. ---- */
const NHL_LOGO_ABBR = {
  NYR: "NYR", NYI: "NYI", NJ: "NJD", WSH: "WSH", PHI: "PHI", BOS: "BOS", LA: "LAK", ANA: "ANA",
  MTL: "MTL", OTT: "OTT", TOR: "TOR", DET: "DET", BUF: "BUF",
};
function teamLogoUrl(abbr) {
  return `https://assets.nhle.com/logos/nhl/svg/${NHL_LOGO_ABBR[abbr] || abbr}_light.svg`;
}

/* ---- travel lookups ---- */
function getTravelHours(a, b) {
  if (a === b) return 0;
  const t = DATA.travel;
  const k1 = a + "-" + b;
  const k2 = b + "-" + a;
  if (k1 in t) return t[k1];
  if (k2 in t) return t[k2];
  return null; // unreachable
}

function isLinkable(a, b, tolerance) {
  const h = getTravelHours(a, b);
  return h !== null && h <= tolerance;
}

/* ---- flatten schedules into date -> games-on-that-date ---- */
function buildDateMap(enabledAbbrs) {
  const map = Object.create(null);
  for (const abbr of TEAM_ORDER) {
    if (!enabledAbbrs.has(abbr)) continue;
    for (const g of DATA.teams[abbr].games) {
      (map[g.date] || (map[g.date] = [])).push({ abbr, ...g });
    }
  }
  const dates = Object.keys(map).sort();
  return { map, dates };
}

function addDaysISO(dateStr, n) {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function isNextCalendarDay(d1, d2) {
  return addDaysISO(d1, 1) === d2;
}

/* ---- the link test: do any two teams across these two nights connect? ---- */
function dayConnected(gamesA, gamesB, tolerance) {
  for (const a of gamesA) {
    for (const b of gamesB) {
      if (isLinkable(a.abbr, b.abbr, tolerance)) return true;
    }
  }
  return false;
}

/* ---- the streak sweep: single left-to-right pass, O(number of game-days).
   A day's games only count toward the streak if they're actually reachable
   from *the run's start* (its "frontier"). A bare pairwise link test between
   consecutive days isn't enough, because on a multi-team night the specific
   team your itinerary is riding might not be the team that supplies the link.
   Carrying the frontier forward catches that: a forced West Coast LA/ANA
   shuttle can't bridge to the Eastern corridor even if *some other* team
   happens to play a bridging game that same night. ---- */
function findRunDateGroups(dateMap, dates, tolerance) {
  const groups = [];
  let currentDates = null;
  let frontier = null;
  for (const date of dates) {
    const dayGames = dateMap[date];
    if (currentDates) {
      const prevDate = currentDates[currentDates.length - 1];
      if (isNextCalendarDay(prevDate, date)) {
        const nextFrontier = dayGames.filter((g) => frontier.some((h) => isLinkable(h.abbr, g.abbr, tolerance)));
        if (nextFrontier.length > 0) {
          currentDates.push(date);
          frontier = nextFrontier;
          continue;
        }
      }
      groups.push(currentDates);
    }
    currentDates = [date];
    frontier = dayGames;
  }
  if (currentDates) groups.push(currentDates);
  return groups.filter((g) => g.length >= 2);
}

/* ---- backward pass: which games can still complete the run from here on? ---- */
function computeViableGames(runDates, dateMap, tolerance) {
  const n = runDates.length;
  const viable = new Array(n);
  viable[n - 1] = dateMap[runDates[n - 1]].slice();
  for (let i = n - 2; i >= 0; i--) {
    const dayGames = dateMap[runDates[i]];
    const nextViable = viable[i + 1];
    viable[i] = dayGames.filter((g) => nextViable.some((h) => isLinkable(g.abbr, h.abbr, tolerance)));
  }
  return viable;
}

function pickMinTravel(options, fromAbbr) {
  let best = options[0];
  let bestHours = getTravelHours(fromAbbr, best.abbr);
  for (let i = 1; i < options.length; i++) {
    const h = getTravelHours(fromAbbr, options[i].abbr);
    if (h < bestHours) { best = options[i]; bestHours = h; }
  }
  return best;
}

function pickFirstNight(options, nextOptions) {
  if (options.length === 1) return options[0];
  let best = null, bestScore = Infinity;
  for (const g of options) {
    for (const h of nextOptions) {
      const t = getTravelHours(g.abbr, h.abbr);
      if (t !== null && t < bestScore) { bestScore = t; best = g; }
    }
  }
  return best || options[0];
}

/* ---- the subtle part: a second greedy pass turns "a hop exists" into an actual itinerary.
   `overrides` is a plain object of date -> chosen abbr, for user-swapped nights. ---- */
function buildNights(runDates, viable, tolerance, overrides) {
  const nights = [];
  let prevGame = null;
  for (let i = 0; i < runDates.length; i++) {
    const dayOptions = viable[i];
    let candidates = prevGame ? dayOptions.filter((g) => isLinkable(prevGame.abbr, g.abbr, tolerance)) : dayOptions;
    if (candidates.length === 0) candidates = dayOptions; // shouldn't happen given viability pass
    const overrideAbbr = overrides && overrides[runDates[i]];
    let chosen;
    if (overrideAbbr && candidates.some((g) => g.abbr === overrideAbbr)) {
      chosen = candidates.find((g) => g.abbr === overrideAbbr);
    } else if (i === 0) {
      chosen = pickFirstNight(candidates, viable[1] || candidates);
    } else {
      chosen = pickMinTravel(candidates, prevGame.abbr);
    }
    nights.push({
      date: runDates[i],
      game: chosen,
      alternatives: candidates,
      hopFromPrev: prevGame ? getTravelHours(prevGame.abbr, chosen.abbr) : null,
    });
    prevGame = chosen;
  }
  return nights;
}

/* ---- doubleheader check: same day, two teams, big enough gap, arenas linkable ---- */
function findDoubleheader(dayGames, tolerance) {
  if (!dayGames || dayGames.length < 2) return null;
  let best = null;
  for (let i = 0; i < dayGames.length; i++) {
    for (let j = i + 1; j < dayGames.length; j++) {
      const g1 = dayGames[i], g2 = dayGames[j];
      const gap = Math.abs(g1.hour - g2.hour);
      if (gap >= DOUBLEHEADER_MIN_GAP && isLinkable(g1.abbr, g2.abbr, tolerance)) {
        if (!best || gap > best.gap) {
          const [matinee, evening] = g1.hour <= g2.hour ? [g1, g2] : [g2, g1];
          best = { gap, matinee, evening };
        }
      }
    }
  }
  return best;
}

/* ---- structurally-independent clusters: teams that can never share a run,
   at any tolerance, because there's no travel-matrix entry connecting them
   even through intermediate teams. This isn't just an optimization: the
   frontier walk in findRunDateGroups tracks a single thread across every
   enabled team's games, so if two unrelated clusters both happen to have
   a home game on the same calendar date, a coincidental same-team
   back-to-back in one cluster can "steal" that date and orphan a genuine
   run-start in the other cluster. Running each cluster through its own
   date-walk avoids that entirely, since it matches reality: these regions
   never combine into one itinerary regardless of slider position. ---- */
function teamClusters() {
  const parent = Object.create(null);
  const find = (a) => (parent[a] === a ? a : (parent[a] = find(parent[a])));
  const union = (a, b) => { parent[find(a)] = find(b); };
  for (const abbr of TEAM_ORDER) parent[abbr] = abbr;
  for (const key of Object.keys(DATA.travel)) {
    const [a, b] = key.split("-");
    union(a, b);
  }
  const groups = new Map();
  for (const abbr of TEAM_ORDER) {
    const root = find(abbr);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(abbr);
  }
  return [...groups.values()];
}

/* ---- full pipeline: enabled teams + tolerance -> range groups, longest-first ---- */
function computeTrips(enabledAbbrs, tolerance, overridesByRunKey) {
  const groups = [];
  for (const cluster of teamClusters()) {
    const clusterAbbrs = new Set(cluster.filter((a) => enabledAbbrs.has(a)));
    if (clusterAbbrs.size === 0) continue;
    const { map: dateMap, dates } = buildDateMap(clusterAbbrs);
    for (const runDates of findRunDateGroups(dateMap, dates, tolerance)) {
      groups.push({ runDates, dateMap, clusterTag: cluster[0] });
    }
  }

  const runs = groups.map(({ runDates, dateMap, clusterTag }) => {
    const key = clusterTag + ":" + runDates[0] + "_" + runDates[runDates.length - 1];
    const viable = computeViableGames(runDates, dateMap, tolerance);
    const overrides = (overridesByRunKey && overridesByRunKey[key]) || {};
    const nights = buildNights(runDates, viable, tolerance, overrides);
    let games = nights.length;
    for (const night of nights) {
      night.doubleheader = findDoubleheader(dateMap[night.date], tolerance);
      if (night.doubleheader) games++;
    }
    return {
      key,
      startDate: runDates[0],
      endDate: runDates[runDates.length - 1],
      range: runDates.length,
      nights,
      games,
    };
  });

  runs.sort((a, b) => (a.startDate < b.startDate ? -1 : 1));

  const byRange = new Map();
  for (const run of runs) {
    if (!byRange.has(run.range)) byRange.set(run.range, []);
    byRange.get(run.range).push(run);
  }
  const rangeGroups = Array.from(byRange.entries())
    .map(([range, runsInRange]) => ({ range, runs: runsInRange }))
    .sort((a, b) => b.range - a.range);

  return { rangeGroups, totalRuns: runs.length, maxRange: rangeGroups[0] ? rangeGroups[0].range : 0 };
}

/* ---- misc display helpers shared by app.js and how.html ---- */
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDateShort(dateStr) {
  const d = new Date(dateStr + "T00:00:00Z");
  return `${WEEKDAY_NAMES[d.getUTCDay()]} ${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

function formatDateFull(dateStr) {
  const d = new Date(dateStr + "T00:00:00Z");
  return `${WEEKDAY_NAMES[d.getUTCDay()]} ${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/* ==================== dev checks ====================
   Sanity-check the algorithm's invariants against this dataset. Logged to
   console, never blocking.

   Two corrections are baked into this design, both worth recording:

   1. The design brief's own smoke-test list names a "21-night run, Jan
      8-28" at the 4.0h stop. That span isn't actually travelable as one
      continuous itinerary. It only looks connected under a naive "some
      pair of teams links these two nights" test. The specific team your
      itinerary would be riding (forced through the LA/ANA shuttle, since
      that's the only linkable pair across Jan 8-14) can never reach the
      Jan 15 Islanders game (ANA-NYI has no travel entry at all).
      findRunDateGroups() carries a reachability "frontier" forward instead
      of testing pairs in isolation, which splits it into a 7-night West
      Coast run (Jan 8-14) and a 14-night corridor run (Jan 15-28).

   2. A second, subtler bug: that same frontier is a single thread walked
      across every enabled team's games together. When two structurally
      unrelated clusters of teams (say, the Northeast corridor and the
      LA/ANA shuttle, or now the Great Lakes teams) both have a home game
      on the same calendar date, a coincidental same-team back-to-back in
      one cluster could "steal" that date in the frontier walk and orphan
      a genuine run-start in the other cluster, silently truncating or
      splitting a real run even though the two clusters were never
      actually linkable to begin with. This one had been live since the
      original 8-team dataset: the "4.0h true longest run is 14 nights"
      claim asserted here for a while was itself wrong, an artifact of
      LA/ANA's mere presence in the enabled set corrupting the Northeast
      frontier, and the true answer was already 17 nights (Jan 12-28)
      before Montreal/Ottawa/Toronto/Detroit/Buffalo were ever added.
      teamClusters() fixes this by running each structurally-independent
      cluster through its own date-walk. */
(function devChecks() {
  const ALL = new Set(TEAM_ORDER);
  const results = SLIDER_STOPS.map((s) => ({ stop: s, data: computeTrips(ALL, s.hours, {}) }));

  const assert = (cond, msg) => {
    console.assert(cond, "[dev check failed] " + msg);
  };

  // every run length >= 2, every hop <= tolerance in the *selected* itinerary
  for (const { stop, data } of results) {
    for (const rg of data.rangeGroups) {
      for (const run of rg.runs) {
        assert(run.range >= 2, `run ${run.key} at ${stop.hours}h has range < 2`);
        for (const n of run.nights) {
          assert(n.hopFromPrev === null || n.hopFromPrev <= stop.hours, `hop ${n.hopFromPrev}h exceeds ${stop.hours}h tolerance in run ${run.key}`);
        }
      }
    }
  }

  // at the tightest stop (0.75h / "One city"), no selected itinerary ever
  // rides both a California team and an Eastern team (guaranteed structurally:
  // the travel matrix has no LA/ANA <-> Eastern entry at any tolerance).
  const tightest = results[0].data;
  const CA = new Set(["LA", "ANA"]);
  for (const rg of tightest.rangeGroups) {
    for (const run of rg.runs) {
      const abbrs = new Set(run.nights.map((n) => n.game.abbr));
      const hasCA = [...abbrs].some((a) => CA.has(a));
      const hasEast = [...abbrs].some((a) => !CA.has(a));
      assert(!(hasCA && hasEast), `run ${run.key} at 0.75h mixes a California team with an Eastern team`);
    }
  }

  // Boston never appears in a *selected* itinerary below the 4.0h "Add Boston" stop
  for (const { stop, data } of results) {
    if (stop.hours >= 4.0) continue;
    for (const rg of data.rangeGroups) {
      for (const run of rg.runs) {
        assert(!run.nights.some((n) => n.game.abbr === "BOS"), `BOS appears in a run at ${stop.hours}h, below the 4.0h stop`);
      }
    }
  }

  // Great Lakes teams never mix with Northeast/Boston or California teams in
  // a selected itinerary, at any tolerance (structurally guaranteed: no
  // travel-matrix entry connects those clusters, even through intermediates).
  const GREAT_LAKES = new Set(["MTL", "OTT", "TOR", "DET", "BUF"]);
  for (const { stop, data } of results) {
    for (const rg of data.rangeGroups) {
      for (const run of rg.runs) {
        const abbrs = new Set(run.nights.map((n) => n.game.abbr));
        const hasGL = [...abbrs].some((a) => GREAT_LAKES.has(a));
        const hasOther = [...abbrs].some((a) => !GREAT_LAKES.has(a));
        assert(!(hasGL && hasOther), `run ${run.key} at ${stop.hours}h mixes a Great Lakes team with a non-Great-Lakes team`);
      }
    }
  }

  // named smoke-test spans (see notes above re: the two corrections)
  const findRun = (data, start, end) => data.rangeGroups.flatMap((rg) => rg.runs).find((r) => r.startDate === start && r.endDate === end);
  assert(!!findRun(results[3].data, "2027-01-15", "2027-01-28") && findRun(results[3].data, "2027-01-15", "2027-01-28").range === 14, "3.0h stop missing the 14-night Jan15-28 run");
  assert(!!findRun(results[3].data, "2026-12-13", "2026-12-22") && findRun(results[3].data, "2026-12-13", "2026-12-22").range === 10, "3.0h stop missing the 10-night Dec13-22 run");
  assert(results[4].data.maxRange === 17, "4.0h stop's true longest run should be 17 nights (Jan12-28)");
  assert(!!findRun(results[4].data, "2027-01-12", "2027-01-28") && findRun(results[4].data, "2027-01-12", "2027-01-28").range === 17, "4.0h stop missing the 17-night Jan12-28 run");
  assert(!!findRun(results[4].data, "2026-10-03", "2026-10-15") && findRun(results[4].data, "2026-10-03", "2026-10-15").range === 13, "4.0h stop missing the 13-night Oct3-15 run");

  console.info(`[dev checks] done. Run counts by stop: ${results.map((r) => `${r.stop.hours}h=${r.data.totalRuns}`).join(", ")}`);
})();
