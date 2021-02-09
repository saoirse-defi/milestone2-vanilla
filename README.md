![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

Welcome saoirse-defi,

This is the Code Institute student template for Gitpod. We have preinstalled all of the tools you need to get started. You can safely delete this README.md file, or change it for your own project. Please do read it at least once, though! It contains some important information about Gitpod and the extensions we use.

## Gitpod Reminders

To run a frontend (HTML, CSS, Javascript only) application in Gitpod, in the terminal, type:

`python3 -m http.server`

A blue button should appear to click: *Make Public*,

Another blue button should appear to click: *Open Browser*.

To run a backend Python file, type `python3 app.py`, if your Python file is named `app.py` of course.

A blue button should appear to click: *Make Public*,

Another blue button should appear to click: *Open Browser*.

In Gitpod you have superuser security privileges by default. Therefore you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the lessons.

## Updates Since The Instructional Video

We continually tweak and adjust this template to help give you the best experience. Here is the version history:

**October 21 2020:** Versions of the HTMLHint, Prettier, Bootstrap4 CDN and Auto Close extensions updated. The Python extension needs to stay the same version for now.

**October 08 2020:** Additional large Gitpod files (`core.mongo*` and `core.python*`) are now hidden in the Explorer, and have been added to the `.gitignore` by default.

**September 22 2020:** Gitpod occasionally creates large `core.Microsoft` files. These are now hidden in the Explorer. A `.gitignore` file has been created to make sure these files will not be committed, along with other common files.

**April 16 2020:** The template now automatically installs MySQL instead of relying on the Gitpod MySQL image. The message about a Python linter not being installed has been dealt with, and the set-up files are now hidden in the Gitpod file explorer.

**April 13 2020:** Added the _Prettier_ code beautifier extension instead of the code formatter built-in to Gitpod.

**February 2020:** The initialisation files now _do not_ auto-delete. They will remain in your project. You can safely ignore them. They just make sure that your workspace is configured correctly each time you open it. It will also prevent the Gitpod configuration popup from appearing.

**December 2019:** Added Eventyret's Bootstrap 4 extension. Type `!bscdn` in a HTML file to add the Bootstrap boilerplate. Check out the <a href="https://github.com/Eventyret/vscode-bcdn" target="_blank">README.md file at the official repo</a> for more options.

--------

Happy coding!



# Against All Odds Milestone Project

## Introduction

A 2D spaceship survival game built using vanilla Javascript.


## UX

#### Sprites

When designing UX for a game, selecting the correct sprite images is essential. 

Before beginning the design process (ie. creating wireframes and choosing the colour scheme), I reviewed Bad Arts Entertainment's current online presence.
The company had already designed a logo, an orange smiley face on a black background with red lettering(see below).


![alt text goes here](assets/img/logo4.jpg)

### Project Goals


### User stories



### Design Choices




#### Fonts

##### Hero Title Font



##### Secondary Font


#### icons

#### Colours

#### Styling



## Existing Features


## Performance

#### Image Resizing & Compression

#### Autoprefixing

## Technologies Used

[JQuery](https://jquery.com/) - The Jquery script tag is required in order to load Bootstrap.

[Bootstrap](https://getbootstrap.com/)
Bootstrap was one of the technologies that was requested for us to use for our milestone project. 
I decided to use this framework to implement several features on the site including the navbar, a carousel and a grid containing 4 cards (each having an image, some text and a link).

[Youtube Video Embedding tool](https://www.classynemesis.com/projects/ytembed/)
This technology was used to convert Youtube videos into html iframe elements.

[Image Resizer](https://picresize.com/)
At times, working with images can be a difficult task. This free website was used mainly to crop images into square profile photos.

[Image Compression](https://tinyjpg.com/)
Used to decrease Time to Live & application weight.

[Google Fonts](https://fonts.google.com/)
The site used to choose and implement custom fonts.

[Icons](https://fontawesome.com/)
Website used to source footer icons

[Photo Editing Software](https://www.gimp.org/)
Used to create custom event ticket container


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

##### Overlap detection for swarm

##### Hitbox not following Gate rotation

##### Gates spawn without image

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

