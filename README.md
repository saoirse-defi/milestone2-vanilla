# Against All Odds Milestone Project

## Introduction

This repository represents my milestone project 2 for Code Institute. For this milestone project, I have created a 2D spaceship survival game built using JavaScript and HTML Canvas. Developed using vanilla JavaScript, no additional libraries were used. 
I have taken inspiration from a childhood video game called Geometry Wars, specifically a game mode called Pacifism.
As a child, I spend countless hours on this mode trying to beat my friend's high scores. The concept is simple, you don't have any projectiles so the only way to survive is to pass through gates in order to destroy nearby ships and to thin the ever increasing hoarde.
The goal is to survive for as long as possible. Similarly to other arcade games, there is no possible way to beat the game. You must simply try and survive for as long as you can.
Enemy speed increases when your score passes certain increments. This will be outlined to the user using custom sound effects.
Cusomisation has been implemented in this application, the user has the ability to change the background and game difficulty at the start screen. Local storage is then used to track user customisation in between sessions.

## UX

### Project Goals

My main goal for this Code Institute milestone project was to authentically emulate a video game from my childhood (Geometry Wars 2: Pacifism) within the browser using vanilla JavaScript.
Another goal of mine was to successfully capture the gameplay feeling from the original.

#### Player Goals

The target audience for this game is users of any age.

The player's goals are:

* That the game is fun to play & keeps me coming back to beat my high score.
* Controls that are intuitive & easy to learn.
* Sprite & Background designs that inspire emotion.
* Audio cues that outline specific game events.

Against All Odds has achieved these player needs by:

* Controls were designed with simplicity in mind while retaining the original game's gameplay feeling.
* The amount of buttons within the application have been kept to a minimum.
* Controlling the player sprite is done by simply moving the cursor to where you would like the user to travel (for mobile devices, this will be accomplished by dragging your finger across the screen).
* The user is notified of significant game events using audio cues.
* These audio cues occur at game start, game end & whenever a user successfully clears a gate.
* Making it easy to restart the game loop with minimal downtime by the click of a single button.


#### Developer & Business Goals

* The main developer goal for this project is to learn as much as possible about JavaScript & HTML5 canvas.
* Adding another project that the developer is passionate about to their portfolio.
* To create a well-designed application that is free of any bugs which would cause the user stop playing prematurely.
* To design a satisfying game loop that is fair to the player.

### User stories

1. As a user of this web application I want:

    - A satisfying game loop that keeps me coming back in order beat my high score.
    - Sound effects to let me know when important game events take place.
    - Sound design that doesn't get boring to listen to over time.
    - Consistent frame rate.
    - The ability to change the difficulty if needed.

2. As a games platform looking to add this application to their library I would want:

    - A great game loop that will keep our users hooked.
    - Sound design that doesn't get boring/annoying to the user over time.
    - Sprite designs that capture the user's imagination and generate an emotional response.

3. As a parent of a child user I would like:

    - A game free from gratuitous violence & profanity.
    - Sprites design that doesn't make the children scared.


#### Sprites

When designing UX for a game, selecting the correct sprite image is essential as it can dramatically change the appearance & feel of your finished application.
I decided to browse several game development marketplaces to see which sprite images were available for free.

###### Player Sprite (Human Mining Station)

![Player Sprite](sprites/spacestation.png)

As mentioned above, the point and click method was chosen as user input. This introduced a UX issue that would look disconcerting to the end user. 
Depending on where the user clicked, the sprite would appear either upside down or at the incorrect angle. Due to this, circular sprite was chosen for the player.
This allows the sprite to appear the same, no matter the angle or direction of user input.

###### Enemy Sprite (Alien Drone Ship)

![Enemy Sprite](sprites/enemy.png)

When choosing the enemy sprite, I wanted the design to give the user a sense of mortality and dread. The ship had to look like it belonged to a terrifying alien race hellbent on conquering human civilisation.

###### Gate Sprite (Used to thin Alien horde)

![Gate Sprite](sprites/gate5.png)

This sprite was designed and created by myself using Microsoft Paint. 
The 2 orange circles at the edge of the sprite are deadly mines which end the game if touched. The user must pass through the center of the gate in order to clear the surrounding area of enemy sprites.

#### Background

In 2D game development, backdrops are often used to add depth & context the canvas & individual game elements.

###### Default Background

As the default background, I have chosen an image of a horizon in the depth of outer space. It contains no planets or nebula, further emphasising the cold darkness of the battlefield that the user finds themselves in.

###### Background Array

This array is responsible for storing background image file names as strings. This array will later be used to implement user customisation.

## Sound

Custom sound effects were recorded for this project by DJ green. 

#### Bandcamp Player (Soundtrack)

At the start screen, the user is able to choose their soundtrack from an embedded Bandcamp playlist. 
All backing tracks have been produced by DJ Green. Expressed permission has been given for the use of all audio used in this project.

#### Gate Destruction Effect

This sound effect was custom-made to provide the user with aural feedback whenever a gate is successfully destroyed. 

#### Bandcamp Embedded Player

This element is only visible on the start screen and disappears once playing the game. It allows the user to choose from several tracks, adding another level of user customisation.


### Implementation

This section will outline the technologies and processes used in the design of this application.

#### HTML Canvas

The Canvas is an HTML element used to draw graphics via scripting. In this case, our scripting language will be JavaScript.

#### Animation Loop

This refers to the function which is repeatedly called using recursion. Each time the function is called, a single frame is printed on screen.

### User Customisation

For this milestone project, I have implemented 2 separate elements of customisation for the user. The user is able to apply different backdrops to the canvas, and they also have the ability to increase or decrease the game's difficulty.
The state of these customisable elements is then saved for later sessions using local storage.

#### Background

A collection of backdrops have been prepared and their file locations stored within the array. At the start screen, this array is used during user customisation to change backdrops.


#### Difficulty

At the start screen, a slider is provided to the user to allow for some further customisation. The difficulty variable is linked to the enemy speed. The user has the ability to choose from 5 different difficulty levels.
In order to prevent users selecting the lowest difficulty in order to get a high score, points generated from each game event are directly corelated to the difficulty variable.


### Design Choices

#### Physics Engine Choices

Originally I had chosen to create this application using the PixiJS library but after seeking advice from my mentor, he stated that using vanilla JavaScript would be a better as a learning exercise.
Looking back on this decision, I believe it was a great choice. It has allowed me to better study the intricacies of the JavaScript call stack & the HTML5 Canvas.

#### Hit box (Hit marker) Detection

#### 

#### User Input Choices

##### Desktop Input

Due to the nature of JavaScript's event listening system, a choice between 2 player input methods on desktop had to be made. 
The decision was between the traditional WASD directional input or using the mouse click to move to position. Between these two, the 'point and click' was chosen due to its ease of use.
Unfortunately after user testing, it was found that this directional input from the user didn't have the correct gameplay feel due to the lack of accuracy & predictability.
In the final implementation, the JavaScript event listener 'movemove' was used. This directional input allows for greater control as the player sprite smoothly follows the cursor of the mouse.

##### Mobile/Tablet Input

#### Start Menu Design

#### Game Over Modal Design

#### Fonts

Two fonts were chosen for this project; hero font & secondary font. Both of these fonts look very different but were chosen for their science fiction design attributes.

##### Hero Title Font

Orbitron

##### Secondary Font

Dot Gothic 16

The font was designed to be pixelated in order to emulate how text used to look on older CRT monitors

#### Icons

##### Tutorial Icon

#### Colours

##### HSL Colour Change Effect

#### Styling



## Existing Features


## Performance

#### Image Resizing & Compression

#### Autoprefixing

## Technologies Used


## Against All Odds - Testing details

### Testing

#### Validation

* [W3C HTML Validation](https://validator.w3.org/)
* [W3C CSS Validation](https://jigsaw.w3.org/css-validator/)
* [JavaScript Validation](https://jshint.com/)

The developer used W3C HTML, W3C CSS & JSHint validation services in order to check the validity of their code.

#### Performance Testing


  
#### Common paths though the website

##### Start Screen > Game > Start Screen

* A back button represented by a white leftwards arrow was added to each product page to ensure that site visitors can easily return to the shop page. A link in the navbar also has this functionality, the second button was added as it follows modern online shopping conventions.

#### Testing client's stories outlined in the UX section:




## Bugs Discovered:

##### Overlap detection for swarm behavior

At the start of the project when designing sprite behavior, I wanted to implement overlap detection. Each enemy sprite in the swarm would calculate the distance to the enemy closest to them.
This distance would be used to move the 2 enemy sprites apart preventing any sprite overlap from happening. This feature was removed from the final implementation as it put too much strain on the call stack per animation frame.
Enemy sprite movement looked jittery and frame rate would drop significantly as the amount of enemies on the screen increased.

##### Hit box not following gate rotation 

When implementing rotational movement for gate sprites, I noticed that the position of certain hit markers were mistranslated. Using some simple trigonometry, I was able to calculate the positioning needed. 

##### Gate detection not consistent

In initial development only 1 hit marker was used to clear the gate, its location was at the dead center of the sprite. This caused some inconsistencies during gameplay as the user would sometimes not pass through the gate precisely enough and the gate sprite would remain on screen.
A second hit marker was added to make it easier for the user to clear the gates. This was a crucial implementation as it significantly helped the gameplay feeling and made gates more consistent. 

##### Frame rate slowing down

Animation in JavaScript uses a function called requestAnimationFrame in combination with a process called recursion to generate each frame seen on screen.
Due to this, too much complex logic required within each frame will cause the frame rate to drop. The JavaScript call stack can only handle so many calls per frame.
When designing the main game loop, it is essential to reduce nesting as much as is practical. In the early development stages, this application suffered significantly from this issue.
The code was then streamlined to remove any unnecessary nesting and a significant increase in frame rate was observed.

##### Not all gates are being drawn, leading to random deaths



##### Gates not rotating after timer was added

##### Memory Leaks

#### Solved bugs

## Deployment

This project was developed using Gitpod, committed to git and pushed to Github using the built-in function with Gitpod.

To deploy this page from Github pages from its Github repository, the following steps were taken.

1. Log into Github.
2. From the list of repositories on the screen, select saoirse-defi/milestone1-bad-arts-1.0.
3. From the menu items near the top of the page, select Settings.
4. Scroll down to the Github Pages section.
5. Under source click the drop-down menu labelled None and select Master Branch.
6. On selecting Master Branch, the page is automatically refreshed, the website is now deployed.
   
At the moment of submitting this milestone project, the default branch is version1.2 which is the latest version.

#### How to run this project locally:

To clone this project into Gitpod you will need:
1. A Github account
2. Use the Chrome browser

Then follow these steps:
1. Install the Gitpod browser extensions for Chrome
2. After installation, restart the browser
3. Log into Gitpod with your Gitpod account
4. Navigate to the Github project repository
5. Click the green 'Gitpod' button in the top right corner of the repository
6. This will trigger a new Gitpod workspace to be created from the code in Github where you can work locally


To work on the code within a local IDE such as VScode:
1. Follow this link to the Github repository
2. Under the repository name, click 'clone' or 'download'
3. In the clone with the https section, copy the clone URL for the repository
4. In your local IDE, open the terminal
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type 'git clone', and then paste the URL copied in step 3

git clone https://www.Github.com/USERNAME/REPOSITORY

7. Press enter. Your local clone will be created.

Further reading and troubleshooting on cloning a repository can be found here [Github](https://docs.Github.com/en/free-pro-team@latest/Github/creating-cloning-and-archiving-repositories/cloning-a-repository).



## Credit

### Media


## Wireframes

### Start Screen

##### Desktop

![Desktop Start Screen](wireframes/StartDesktopWireframe.png)

##### Tablet

![Tablet Start Screen](wireframes/StartTabletWireframe.png)

##### Mobile

![Mobile Start Screen](wireframes/StartMobileWireframe.png)

### Game Screen

##### Desktop

![Desktop Game Screen](wireframes/GameDesktopWireframe.png)

##### Tablet

![Tablet Game Screen](wireframes/GameTabletWireframe.png)

##### Mobile

![Mobile Game Screen](wireframes/GameMobileWireframe.png)

### Game Over Modal

##### Desktop

![Desktop Game Over Modal](wireframes/ModalDesktopWireframe.png)

##### Tablet

![Tablet Game Over Modal](wireframes/ModalTabletWireframe.png)

##### Mobile

![Mobile Game Over Modal](wireframes/ModalMobileWireframe.png)