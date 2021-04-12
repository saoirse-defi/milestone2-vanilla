# Against All Odds Milestone Project

## Introduction

This repository represents my milstone project 2 for Code Institute. For this milestone project, I have created a 2D spaceship survival game built using Javascript and HTML Canvas. Developed using vanilla Javascript, no additional libraries were used. 
I have taken inspritation from a childhood video game called Geometery Wars, specifically a game mode called Pacifism.
As a child, I spend countless hours on this mode trying to beat my friend's high scores. The concept is simple, you don't have any projectiles so the only way to survive is to pass through gates in order to destroy nearby ships and to thin the ever increasing hoarde.
The goal is to survive for as long as possible. Similarly to other arcade games, there is no possible way to beat the game. You must simply try and survive for as long as you can.
Enemy speed increases when your score passes certain increments. This will be outlined to the user using custom sound effects.
Cusomisation has been implemented in this application, the user has the ability to change the background and game difficulty at the start screen. Local storage is then used to track user customisation in between sessions.

## UX

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

###### Gate Sprite (Used to thin Alien hoarde)

![Gate Sprite](sprites/gate5.png)

#### Background

In 2D game development, backdrops are often used to add depth & context the canvas & individual game elements.

###### Default Background

As the default background, I have chosen an image of a horizon in the depth of outer space. It contains no planets or nebula, further emphasising the cold darkness of the battlefield that the user finds themselves in.

###### Background Array

This array is responsible for storing background image file names as strings. This array will later be used to implement user customisation.

## Sound

Custom sound effects were recorded for this project.

#### Gate Destruction Effect

This sound effect was custom made to provide the user with aural feedback whenever a gate is successfully destroyed. 

#### Bandcamp Embedded Player

This element is only visible on the start screen and dissapears once playing the game. It allows the user to choose from several different tracks, adding another level of user customisation.

#### Game Soundtrack

#### Enemy Spawn Noise

### Implementation

This section will outline the technologies and processes used in the design of this application.

#### HTML Canvas

The Canvas is a HTML element used to draw graphics via scripting. In this case, our scripting language will be Javascript.

#### Animation Loop

This refers to the function which is repeatedly called using recursion. Each time the function is called, a single frame is printed on screen.

### User Cusomisation

For this milestone project, I have implemented 2 separate elements of customisation for the user. The user is able to apply different backdrops to the canvas and they also have the ability to increase or decrease the game's difficulty.
The state of these customisable elements is then saved for later sessions using local storage.

#### Background

#### Difficulty

At the start screen, a difficutly slider is provided to allow for some user customisation. The difficulty variable is linked to the enemy speed. The user has the ability to choose and enemy speed of between 1 & 10.

### Project Goals

My main goal for this Code Institute milstone project was to authenically emmulate a game from my childhood (Geometery Wars 2: Pacifism) within the browser.
Another goal of mine was to successfully capture the gameplay feeling from the original.

### User stories

1. As a user of this web application I want:

    - A statifying gameloop that get me to keep coming back to beat a highscore.
    - Sound effects to let me know when important game events take place.
    - Sound design that doesn't get boring to listen to over time.
    - Consistent Framerate.
    - The ability to change the difficulty if needed.

2. As a games platform looking to add this application to their library I would want:

    - A great gameloop that will keep our users hooked.
    - Sound design that doesn't get boring/annoying to the user over time.
    - Sprite designs that capture the user's imagination and generate an emotional response.


### Design Choices

#### Physics Engine Choices

Originally I had chosen to create this application using the PixiJS library but after seeking advice from my mentor, he stated that using vanilla Javascript would be a better as a learning excercise.

#### User Input Choices

Due to the nature of Javascript's event listening system, a choice between 2 player input methods had to be made. 
I had to decide between either the traditional WASD directional input or using the mouse click to move to position. After testing both methods, 'point and click' was chosen due to increased accuracy and ease of use.

#### Fonts

##### Hero Title Font

Orbitron

##### Secondary Font

Dot Gothic 16

#### Icons

#### Colours

#### Styling



## Existing Features


## Performance

#### Image Resizing & Compression

#### Autoprefixing

## Technologies Used


## Testing

#### Validation

* The developer used W3C CSS validation service and W3C Markup validation service to check the validity of their code.

#### Performance Testing


  
#### Common paths though the website

##### Start Screen > Game > Start Screen

* A back button represented by a white leftwards arrow was added to each product page to ensure that site visitors can easily return to the shop page. A link in the navbar also has this functionality, the second button was added as it follows modern online shopping conventions.

##### Home > Contact

#### Testing client's stories outlined in the UX section:

1. As a new visitor to the website, I want to be able to navigate the site easily and be able to find what I want quickly.
    
    * No matter what page a new visitor lands on, they're able to easily find and use the navigation bar.
    * The logo image and hero title are links that always lead back to the homepage.
    * The landing section of the homepage contains a description of the music label, their genre and location.


2. As a new visitor to the site, I want to be able to find specific artists.

    * Artist's profiles are grouped together on the homepage to ensure that the user can find a specific artist quickly. 


3. As a new visitor to the website, I want the ability to read personal information relating to each artist, so I can understand their lyrics in context.

    * Each artist profile contains a short biography and their latest video release.


4. As a fan, I want the ability to purchase physical/digital copies of their music.
   
    * Each artist's profile has a link to their Bandcamp page where users can purchase music from Bad Arts Entertainment digitally.
    * Physical media such as CDs and clothing will be available for sale when in stock.


5. As a fan, I want to be able to interact with social media from their Twitter account.

    * On the homepage, an embedded twitter timeline allows users to scroll though the Bad Arts Entertainment twitter feed.
    * A twitter follow button has also added within the footer, which has been synchronised across all pages.


6. As a music venue coordinator, I would like the ability to see previous events they have done in order to make a more calculated business decision on whether to hire one of the label's artists.

    * The events section on the homepage outlines previous events that the label has taken part in as well as any upcoming gigs planned.
    * A video gallery can be used to review recent content and determine if the label is the right fit for the venue.


7. As a potential customer, I would like the ability to view their merchandise with clearly indicated pricing.

    * In the shop, prices are outlined clearly for each product once you hover over the item. Also, within the product page, the current and previous product price is clearly outlined.
    * The user is then brought to the individual product page where they can read the product information.
    * A call-to-action button allows the user to add the item to the checkout.


8. As a potential customer, I want to be able to navigate between the shop and individual product pages with ease.

    * At the top left of each product page, a left arrow icon allows the user to return to the shop with ease.
    * This icon was chosen for its obvious meaning and purpose so that it can be understood by everyone.


9. As a potential employer, I would like the ability to contact the label directly.

    * On the contact page, there is a contact form in order to get in touch with Bad Arts Entertainment.
  

10. As a fan, I would like to know precisely where the music label is located.

    * The contact page contains a Google Map element containing a pin to show where the label is based.
    * If you click on the map marker, a small blurb of the area is provided to give the user more context about the location.



## Bugs Discovered:

##### Overlap detection for swarm behaviour

##### Hitbox not following Gate rotation    

##### Gates spawn without image (solved)

##### Gate detection not consistent

##### Framerate slowing down (I believe due to nested loops)

##### Mines on the end of gates exhibiting random behaviour

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

