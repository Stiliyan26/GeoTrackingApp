# Geo Tracking Application Documentation 
<pre>
  This project involves developing a web application that allows users to view a map,create, edit,delete, and save points of interest,
  all while offering features like a login page for user authentication and a menu for easy navigation.
</pre>

##Demo
Demo: https://main--radiant-klepon-d29a89.netlify.app/

## Why i chosed leaflet
<pre>
    I chosed leaflet instead of google maps because it offers you full 
    control over map styling, markers, popups, and interactions, 
    while google maps have limitations in terms of styling and 
    branding, as it's designed to maintain a consistent Google Maps look.
</pre>

## How to start the project

<pre>
    The application can be started simply by running the command `npm start`.
</pre>

# Product Documentation
### Application Flow

<pre>
    When the user starts the app he's redirected to the home page.
</pre>

<p>
    <img height="300em" src="https://imageupload.io/ib/mh09BMjW0KnNfCn_1693566321.png" alt="homepage.png"/>
</p>

<pre>
    The login form requests the user's email and password. 
    There is validation for incorrect input fields.
</pre>

<p>
    <img height="300em" src="https://imageupload.io/ib/NijMsSWcGfgKmcX_1693565990.png" alt="login.png"/>
</p>

<pre>
    After a successful login, the user is redirected to the map page
    with an updated navigation bar, and their current location is centered on the map.
</pre>

<p>
    <img height="300em" src="https://imageupload.io/ib/2bypHssLGmy6pY2_1693566841.png" alt="map.png"/>
</p>

<pre>
    When the user clicks on the map, a create form appears, allowing the user to enter
    information and create a point of interest.
</pre>

<p>
    <img  src="https://imageupload.io/ib/mIERFLvXlTh4doa_1693567428.png" alt="createpoint.png"/>
</p>

<pre>
    After successfully creating a point of interest, the new location is 
    added to the list view. When you click on the location on the map, a popup appears.
</pre>

<p>
    <img  src="https://imageupload.io/ib/ZVgclgpXEivwEd3_1693567739.png" alt="listview.png"/>
</p>

<pre>
    The list view of the points can be sorted by category and name. 
    Additionally, users can search for points by category.
</pre>

<p>
    <img  src="https://imageupload.io/ib/Lq9UD4I586GGIza_1693568129.jpg" alt="sorrt.jpg"/>
    <img  src="https://imageupload.io/ib/Iq0A8WlQ65aKGjZ_1693568157.png" alt="filter.png"/>
</p>

<pre>
    If the user clicks the 'Locate' button for a point in the 
    list view, it centers the selected point on the map.
</pre>

<p>
    <img  src="https://imageupload.io/ib/2OnuG2RIgKvWGxK_1693568378.png" alt="locate.png"/>
<p>

<pre>
    If the user clicks the 'Locate my position' button, it centers the map on 
    the user's current position.
</pre>

<p>
    <img  src="https://imageupload.io/ib/xmZggui69okhI7s_1693568562.png" alt="locateMyPosition.png"/>
</p>

<pre>
    If the user clicks the 'Edit' button, an edit form 
    will appear on the screen, allowing you to modify the information of the point.
</pre>

<p>
    <img  src="https://imageupload.io/ib/Ylf2edThMeCG3EY_1693568837.png" alt="edited.png"/>
    <img  src="https://imageupload.io/ib/MzUXhH5pIvBFeqF_1693568944.png" alt="editedPoint.png"/>
</p>

<pre>
    If the user clicks the 'Delete' button, a delete confirmation dialog will appear
    on the screen, asking the user to confirm whether they want to delete the point.
</pre>

<p>
 <img  src="https://imageupload.io/ib/1wLgz9qQw0n42IR_1693569103.png" alt="delete.png"/>
    <img  src="https://imageupload.io/ib/cvSkkOKirMpfWtB_1693569180.png" alt="deletes.png"/>
</p>

<pre>
    When user zooms out, points that are close to each other form a marker
    cluster that displays the exact number of locations that are in close proximity.
</pre>
<p>
    <img  src="https://imageupload.io/ib/uWWI7uLG9FXWXbU_1693651787.jpg" alt="pointsNumber.jpg"/>
</p>

## Tech Stack:
### Front-End
<p></p>
<ul>
  <li>React</li>
  <li>HTML</li>
  <li>CSS</li>
</ul>

### Map 
<ul>
  <li>Leaflet</li>
</ul>

### Git tools
<p></p>
<ul>
  <li>GitHub</li>
  <li>GitHub Desktop</li>
</ul>
