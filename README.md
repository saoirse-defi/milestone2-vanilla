# Against All Odds Milestone Project

## Introduction

A 2D spaceship survival game built using Javascript and HTML Canvas. Developed using vanilla Javascript, no additional libraries were used. I have taken inspritation from a childhood video game called Geometery Wars, specifically a game mode called Pacifism.
As a kid, I spend countless hours on this mode trying to beat my friend's high scores. The concept is simple, you don't have any projectiles so the only way to survive is to pass through gates in order to destroy nearby ships and to thin the ever increasing hoarde.
The goal is to survive for as long as possible. Similarly to other arcade games, there is no possible way to beat the game. You must simply try and survive for as long as you can.
Enemy speed increases when your score passes certain increments. This will be outlined to the user using custom sound effects.


## UX

#### Sprites

When designing UX for a game, selecting the correct sprite image is essential as it can dramatically change the appearance & feel of your finished application.
I decided to browse several game development marketplaces to see which sprite images were available for free.

###### Player Sprite (Human Mining Station)

![Player Sprite](sprites/spacestation.png)

As mentioned above, the point and click method was chosen as user input. This introduced a UX issue that would look disconcerting to the end user. 
Depending on where the user clicked, the sprite would appear either upside down or at the incorrect angle. Due to this, circular sprite was chosen for the player.

###### Enemy Sprite (Alien Drone Ship)

![Enemy Sprite](sprites/enemy.png)

When choosing the enemy sprite, I wanted the design to give the user a sense of mortality and dread. The ship had to look like it belonged to a terrifying alien race.


###### Gate Sprite (Used to thin Alien hoarde)

![Gate Sprite](sprites/gate5.png)

#### Background

###### Default Background

###### User Customisation (Background Choice)

## Sound

Custom sound effects were recorded for this project.

#### Gate Effect

#### Enemy Speed Increase Effect

#### Start Menu Soundtrack

#### Game Soundtrack

#### Enemy Spawn Noise



### Project Goals


### User stories



### Design Choices

#### Physics Engine Choices

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

* Lighthouse within Chrome developer tools was used to observe areas where application performance could be improved.
* Uncompressed images were causing a very slow TTL, using MS Paint & TinyJPG I was able to reduce the TTL significantly.
  
#### Common paths though the website

* From the home page, each path outlined below is accessible through the navigation bar using clearly defined buttons.

##### Home > Videos
  
##### Home > Shop > Product

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

