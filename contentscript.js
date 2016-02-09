/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
 
var jsInitChecktimer;
var msg = null;
window.addEventListener ("load", waitForPageLoad, false);

function waitForPageLoad (evt)
{
  //jsInitChecktimer = setInterval (findVideoLink, 2000);
  findVideoLink();
}

function findVideoLink () 
{
  var regex = /'file': '(.+?)'/;
  var url = document.URL;
  var ein = /einthusan/;
  var allmyv = /allmyvideos/;
  var vidto = /vidto/;
  var playedto = /played/;
  var megafiles = /megafiles/;
  var bestreams = /bestreams/;
  var gorillavid = /gorillavid/;
  var vodmine = /vodmine/;
  var ishared = /ishared/;
  var thevideo = /thevideo/;
  var vidzi = /vidzi/;
  msg = null;
  
  if(allmyv.test(url))
      regex = /"file" : "(.+?)"/;
  else if(vidto.test(url) || megafiles.test(url))
      regex = /file_link = '(.+?)'/;
  else if(playedto.test(url) || bestreams.test(url) || gorillavid.test(url))
      regex = /file: "(.+?)"/;
  else if(vodmine.test(url))
      regex = /<source src="(.+?\.mp4)"/;
  else if(ishared.test(url))
      regex = /path:"(.+?)"/;
  else if(vidzi.test(url))
      regex = /file: "(.+?\.mp4)"/; 
  else if(thevideo.test(url)) {
      regex = /sources: (\[.+?\])/;
      var links = regex.exec(document.body.innerHTML);
      regexl = /file: '(.+?)'/g;
      while((myArray = regexl.exec(links)) !== null) { 
        msg = myArray;
      }
  }
  // Test the text of the body element against our regular expression.
  if (regex.test(document.body.innerHTML)) {
    if(!msg)
      msg = regex.exec(document.body.innerHTML);
    // The regular expression produced a match, so notify the background page.
      chrome.extension.sendRequest({msg:msg, url:url, title:""}, function(response) {});
  } else {
    // No match was found.
  }
}
