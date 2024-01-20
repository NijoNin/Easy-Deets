[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Easy Deets
Easy deets meaning easy details.

A single page PWA (progressive web app) that generates a QR code dynamically for easy access to your website, portfolio, details, etc.

I created this using replit for free hosting. Working link to webapp is here: [Easy Deets](https://easy-deets.nijonin.com/)

## Why?
Isn't this just the same as other QR generators? Why make another?

I had the idea that because I am moving to Japan and I dont have a business card, why dont I make a webapp that I can use to map to my useless bixby button. I wanted it easily accessible to ~~all~~ most browsers and specifically chrome on android as I wanted to install the webapp via chrome browser. This meant it acted like an app to link to the bixby button natively. 

I wanted to make a QR code generator that looked simple but was also nice to show someone your QR code with ease. 

## How to use
First thing you should see is a text box. Type in the text box to start generating a QR code. The QR code will start instantly generating in the background. This text is saved automatically to local storage. 

To see the QR code without the textbox in front, double click on the screen. Double clicking/tapping is also the way to bring up the menu/overlay.

Changing color is as easy as clicking/tapping on the color buttons on the top right. The color has been saved as soon as the button has been click.

Clicking on the logo will refresh the page. This is a just in case feature.

### Problems that may arise
As I have been having caching update problems when I add or fix the code, I have been deleting cached data to make sure my code is updated. 

Cached data is used so that you are able to use the app offline.

To delete cached data, look through your browsers settings and delete cached data for this website/project.

#### Browser Compatibility
So far tested on: Chrome, Firefox, Mobile Safari, Android

# Usage/Installation
If you want to fork/copy and adapt this code, there is a few things you may need to do to get it up a running straight away.

## Add JSX preprocessor
Because I used JSX code to make it easier to add HTML it needs to convert it to plain Javascript. To do this please follow this guide here: [React Website](https://beta.reactjs.org/learn/add-react-to-a-website#add-jsx-to-a-project).

It will ask you to make sure you have installed node. Don't worry, as the documentation says, it is only for processing the file, not for actually use on an active website.

This is why two main-page.js files are included in the directory, one in root (the converted one) and the other in src sub-directory (the original one that I use to edit and then convert)

## Hosting and domain?
Only if you want it online really.

# Updates and Features

I will be updating this when I can to add certain features I want.

The features or updates that may be added in the future are:

 - Custom colors via Hex code
 - Inverted QR/BG color mode
 - Better Cache integration for PWA
 - Add a settings button
 - Add a how to use with "?" button
 - Fix Logo and colors overlapping when screen is really thin width
 - Secret easter egg??   
 
  ![pausechamp](https://cdn.frankerfacez.com/emoticon/349048/4)
  
 and other features and updates I think of during this development
 
# Thank you and Licenses
## Credit
A thank you goes to Ryan Day ([soldair](https://github.com/soldair)) for "node-qrcode" lib that generates QR Codes, it has been provided under a MIT License.
## License
MIT License
