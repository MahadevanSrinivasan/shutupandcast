// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when a message is passed.  We assume that the content script
// wants to show the page action.
var videoLink;
var pageurl;
var title;
function onRequest(request, sender, sendResponse) {
  // Show the page action for the tab that the sender (content script)
  // was on.
  chrome.pageAction.show(sender.tab.id);
  videoLink = request.msg[1];
  pageurl = request.url;
  console.log(pageurl, videoLink);
  title = request.title;
}

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);

chrome.pageAction.onClicked.addListener(function postData() {
  url = "http://theshybulb.com/justcast.html?";
  var params = [];
  params.push(encodeURIComponent("videoLink") + "=" + encodeURIComponent(videoLink));
  url = url + params.join("&");
  console.log(url);
  chrome.tabs.create(
    { url: url }
  );
});
