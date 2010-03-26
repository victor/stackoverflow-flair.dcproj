/* 
 This file was generated by Dashcode.  
 You may edit this file to customize your widget or web page 
 according to the license.txt file included in the project.
 */
// Properties set by attributes panel
var updateInterval;
var lastUpdated = (new Date()).getTime();
//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    dashcode.setupParts();
    if(window.widget) {
        userId = widget.preferenceForKey("userId");
        var dataSource = dashcode.getDataSource("flair");
        dataSource.url = "http://stackoverflow.com/users/flair/"+userId+".json";
    }
    
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
    var dataSource = dashcode.getDataSource("flair");
    // Refresh 60 minutes have passed since the last update
    var now = (new Date).getTime();
    if ((now - lastUpdated) > 60*60 * 1000) {
        refresh(dataSource);
        lastUpdated = now;
    }
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
   updateSource(event);
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}


function updateSource(event)
{
 var dataSource = dashcode.getDataSource("flair");
 var userId = document.getElementById("userId").value;
 //dataSource.setValueForKey("http://stackoverflow.com/users/flair/"+userId+".json","url");
 dataSource.url="http://stackoverflow.com/users/flair/"+userId+".json";
 //dataSource.updateSource();
 if(window.widget)
{
 widget.setPreferenceForKey(userId, "userId");
 }
}
function refresh(dataSource)
{
    dataSource.method = "POST";
    dataSource.method = "GET"
}
