This repo contains utilities for working with the agni backend. Below are the available utilities

push_content.js : to push a picture and image into the backend db, with the option of sending the user a push notification
hide_content.js : to hide an item from the user's feed. This command DOES NOT erase the corresponding item from the backend db.
push_cta.js: to push a share or rate card to the user's feed. you can also run a command to remove all the CTAs from a user's feed.


# Utility scripts for WompWomp (Oct 2015 - Jun 2016)

## Intro
Wompwomp was an Android app and web app for viewing video and image memes. The Android app was on the Play Store. The web app was hosted at https://wompwomp.co and was used mainly for uploading memes to the database. This repo is for utility scripts that gave a backdoor to the meme database.

## Usage
After installing the Android app, users could view memes without needing to sign in. The web app had a sign in for admin users. An admin could sign in and upload memes to the database. These memes would be served to Android app users on a set schedule.

## Tech Stack
* JS scripts using ImageMagick to edit image files

## User base
WompWomp had 10K installs and hosted over 3000 pictures and video memes.

## Challenges
* poor retention
* no path forward — just an entertainment app
* not a solution to any pain point as such

### How to use the codebase ###
* Clone this git repo
* Start the MongoDB instance on the server
* Run the chosen script
