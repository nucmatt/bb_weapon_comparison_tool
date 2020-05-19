# Project Name
Battle Brothers Weapon Comparison Tool

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [FAQs](#faqs)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
This is a little programming project created to aid in comparing different weapons in the game Battle Brothers by Overhype Studios. I started this primarily as a way to improve my programming skills as I am working to become a front end developer and ultimately a full stack developer. With the continued popularity of Battle Brothers and the upcoming DLC, I thought I would try releasing this to the public, both for feedback on my programming and to help others enjoy what is a truly fantastic game.

## Technologies
This project is built using HTML5, CSS3, JavaScript, and JSON.

For those interested or experienced in programming I'll describe a few things I liked/enjoyed learning for this project.

* I've used SCSS to compile my CSS in my past several projects and really like the SASS/SCSS combination. The coolest part for me is that the output is in plain CSS.

* Using the combination of JSON for the data and JavaScript template literals, most of the HTML is built using JavaScript. Only, the header, footer, section headings, and the famed weapon input form are in the index file.

* Famed weapon storage uses the browser's localStorage API. When I decided to publish this project to internet I wanted a way for each person that uses the tool to be able to return to the page and still have their famed weapons displayed. The localStorage API was the answer and was fun to learn!

* To aid in comparing weapons I implemented a crude version of HTML5's drag and drop API. This was very educational in learning more about DOM events. 

## Setup
The easiest way to interact with the project is to visit the web address. The url is strange because I published it using GitHubs Pages, a free service.

For those who would prefer an offline solution you can download the project from GitHub. Simply create a shortcut on your desktop to the index.html file and open with your preferred browser (this will work offline since the necessary files are on your computer).

#Don't want to use localStorage?
If you would prefer not to use localStorage on your browser for the famed weapons and/or want to permanently reorder the weapons you'll have to download the project files and manipulate the weapons.json file found in the Data folder. Here is how to do this:

* On the main GitHub page, found [here](https://github.com/nucmatt/bb_weapon_comparison_tool), click the green 'Clone or download' button on the right and download the zip file. You can unzip this file anywhere you like.
* 


## Features
List of features ready and TODOs for future development
* Awesome feature 1
* Awesome feature 2
* Awesome feature 3

To-do list:
* Wow improvement to be done 1
* Wow improvement to be done 2

## FAQs
* Why did you do _X_ instead of _Y_? OR Hey knucklehead, _Z_ doesn't work properly!
The answer is most likely either "That's the only way I know how." or "I'm still learning and didn't know you could do that!". I am always open to productive feedback on my code and of course I want to fix any bugs I missed. Please submit any feedback or bug reports to the GitHub issues page [here](https://github.com/nucmatt/bb_weapon_comparison_tool/issues) or via the contact form on my website (link in [Contact](#contact) section below).

* Why does this project use the browser's localStorage API?
Using the localStorage API allowed me to provide a way for each person to have their own unique famed items that persist each time you visit the website, without a server and without requiring any login information.

* What is the localStorage API?
The localStorage API is similar to cookies in that it allows a website to store data directly in your browser for future use, by that website ONLY. It DOES NOT allow for any tracking or spying on you or your online activities. For more information, take a look at the Web storage Wikipedia page [here](https://en.wikipedia.org/wiki/Web_storage).

* I'm getting an error about localStorage when I try to save a famed weapon!
All modern browsers support the localStorage API so most likely the problem is with a browser setting you have. Since you probably don't want to change your security/privacy settings just for this project there is a way to get around this, though it requires some work and you still have to download to your computer. Please see the [Setup](#setup) section for how to do this.

* What if I just don't want you saving stuff to my browser?
If you'd prefer nothing be saved to your browser don't use the famed weapon input form. See the [Setup](#setup) section for how to download the code for this project and manipulate the weapon data yourself in the weapons.json file in the data folder.

* How can I see what you are storing on my computer with this localStorage mumbo-jumbo?
Excellent question! You can view all sorts of interesting bits of every website by using your browser's developer tools. For Chrome users go [here](https://developers.google.com/web/tools/chrome-devtools/storage/localstorage) and for Firefox go [here](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector).

* I don't like the order of the weapons/weapon categories as you have them set up. What can I do?
For the order of the weapons themselves you'll have to download the code yourself and play with the weapons.json file in the data folder. As for categorization of the weapons, that is currently hard-coded and can't easily be changed. I do have plans to make the categorization manipulatable as well but that code isn't ready yet.


## Status
Project is: _in progress_, _finished_, _no longer continue_ and why?

## Inspiration
This project is based on the game [Battle Brothers](http://battlebrothersgame.com/) by Overhype Studios.

The inspiriation for this project came from the Twitch streamer FilthyRobot and is based off of a spreadsheet he created to compare various weapons in the game. You can find his website [here](https://www.filthyrobot.tv/).

## Contact
Created by [Matthew Wessel](https://matthew-a-wessel.dev/) - feel free to contact me! If submitting feedback or a bug report please include "BB Comparison Tool" in the subject. Thanks!
