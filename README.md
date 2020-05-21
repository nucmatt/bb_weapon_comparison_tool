# Project Name
Battle Brothers Weapon Comparison Tool

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Axes](#axes)
* [FAQs](#faqs)
* [Status](#status)
* [ToDo list](#todo-list)
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

## Axes

There are some things to note about the way axes and critical hits work in this game and how I calculated them for this project. Both one-handed axes and great axes are covered below.

### One-hand Axes

One handed axes do additional critical hit (i.e. head hit) damage above the normal critical bonus. This bonus is 200% of damage versus 150% for all other weapons. This bonus applies ONLY to the HP portion of damage dealt, not armor damage. This information can be found on the Battle Brother's wiki [here](https://battlebrothers.fandom.com/wiki/Axes) and has been confirmed in my play testing.

### Great Axes

Great axes, on a successful hit, do damage to both the head and body. Which part is hit first is rolled normally, 75% body/25% head, and then the second part receives 50% of the damage roll as additional damage. Criticals are only counted when the initial hit is to the head, and again only apply to the HP portion of the damage dealt to the head. See the Battle Brothers wiki [here](https://battlebrothers.fandom.com/wiki/Combat_Mechanics#.22Split_Man.22_damage_mechanics:). The explanation is under the damage section.

This presented a problem in how to calculate damage for great axes. My answer was to increase the base damage of all two-hand, non-reach axes by 50% and reduce the critical modifier to 1.333. Here is how the math works where x = Great Axe average damage.

Game's Math:
Body hit = x + x(0.5) = 90 + 90(0.5) = 90 + 45 = 135 damage
Head hit = x(1.5) + x(0.5) = 90(1.5) + 90(0.5) = 135 + 45 = 180 damage

My Math:
Body hit = x = 135 damage
Head hit = x(1.333) = 135(1.333) = 180 damage.

As you can see, the totals work out. Since this project is only for average damage compariso and not outright combat simulation, adjusting some of the math does not affect the utility of the comparisons.

## FAQs
* Why did you do _X_ instead of _Y_? OR Hey knucklehead, _Z_ doesn't work properly!

The answer is most likely either "That's the only way I know how." or "I'm still learning and didn't know you could do that!". I am always open to productive feedback on my code and of course I want to fix any bugs I missed. Please submit any feedback or bug reports to the project's GitHub issues page [here](https://github.com/nucmatt/bb_weapon_comparison_tool/issues) or via the contact form on my website (link in [Contact](#contact) section below).

* Why does this project use the browser's localStorage API?

Using the localStorage API allowed me to provide a way for each person to have their own unique famed items that persist each time you visit the website, without a server and without requiring any login information.

* What is the localStorage API?

The localStorage API is similar to cookies in that it allows a website to store data directly in your browser for future use, by that website ONLY. It DOES NOT allow for any tracking or spying on you or your online activities. For more information, take a look at the Web storage Wikipedia page [here](https://en.wikipedia.org/wiki/Web_storage).

* I'm getting an error about localStorage when I try to save a famed weapon!

All modern browsers support the localStorage API so most likely the problem is with a browser setting you have. I am currently investigating an offline solution but that is not ready as of the project going live.

* What if I just don't want you saving stuff to my browser?

I am currently investigating an offline solution but it is not ready as of the project going live. 

* How can I see what you are storing on my computer with this localStorage mumbo-jumbo?

Excellent question! You can view all sorts of interesting bits of every website by using your browser's developer tools. For Chrome users go [here](https://developers.google.com/web/tools/chrome-devtools/storage/localstorage) and for Firefox go [here](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector).

* I don't like the order of the weapons/weapon categories as you have them set up. What can I do?

I have drag and drop functionality for the weapons. Unfortunately the reordering is not permanent. I am currently investigating an offline solution but it is not ready as of the project going live.

## Status
Project is: _in progress_.
See my to do list below.

## ToDo list
* Improve the drag and drop functionality for the page. Currently it swaps the weapon positions which I don't think is ideal.

* Create an offline solution for people who prefer to game offline or want more control over the weapon order or just don't trust the localStorage solution I currently have implemented.

* Update the weapon list once the new Blazing Deserts DLC comes out!

## Inspiration
This project is based on the game [Battle Brothers](http://battlebrothersgame.com/) by Overhype Studios.

The inspiration for this project came from the Twitch streamer FilthyRobot and is based off of a spreadsheet he created to compare various weapons in the game. You can find his website [here](https://www.filthyrobot.tv/).

## Contact
Created by [Matthew Wessel](https://matthew-a-wessel.dev/) - feel free to contact me! If submitting feedback or a bug report please include "BB Comparison Tool" in the subject. Thanks!
