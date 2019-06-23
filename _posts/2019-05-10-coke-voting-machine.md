---
layout: single
title:  "The Coke Voting Device"
tags:
  - ESP32
  - Firebase
  - Vue.js
header:
  teaser: "/assets/images/coke-voting-teaser.png"
sidebar:
  - title: 
    image: "/assets/images/coke-voting-show.png"
    image_alt: "Coke voting machine printout"
    text: 
---

## About
Expanding on the amazing capabilities of **ESP32**, we built the Coke Voting Machine.
It was a data collection experiment we ran in our coworking hub.

We fed on a few polls that already flowing in our community chat group and created an offline voting mechanism, basically leveraging the Touch input pins, for a minimalistic interactions mechanism.

## Overview
We would leverage the touch input pins of the ESP32 as an input.
All these interactions would be stored as individual events in our persistent storage.
Based on the position and usage of these touch input pins, the event data can be used to create results and reports.
![Coke Voting Machine Schematic](/assets/images/coke-voting.png)

## Build your own
* On-ground system

  The module has the following functions:
  * Connect to the internet on startup (if possible)
  * Listen for touch input interactions
  * Send interaction data to the server

  [Link to Github repository](https://github.com/karx/kaaroVote)

* On cloud - listener
  This service will simply log the interactions detected by our on-ground module.
  I used firebase as it provides an easy mechanism of also having persistent storage - using Firestore.
  We only have one function running which basically 
  * opens up an HTTP-endpoint, 
  * when hit, logs interaction event details to firestore

  [Link to Github repository](https://github.com/karx/kaaroVote/tree/master/firebase-functions)

* Simple HTML for display
  A single HTML file, that fetches data from your storage/API (in our case Firestore), to display collected events

  [Link to Github repository](https://github.com/karx/karx.github.io/tree/master/publicPulse/touchSurvey)

* Assets
  I also created a few assets, which can be printed to accompany the device.
  These are available [here](https://www.canva.com/design/DADbuRHzHS4/vwViTR1jmh4o-E2zdDOgkA/view?utm_content=DADbuRHzHS4&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton).


## Results
Results of our little experiment are available at [live result page](http://kaaro.akriya.co.in/publicPulse/touchSurvey/index.html)
  
## Further reading
* [Touch Sensor pins on ESP32](https://docs.espressif.com/projects/esp-idf/en/latest/api-reference/peripherals/touch_pad.html)
* [Great explainer video about Dev environment for ESP32](https://www.youtube.com/watch?v=psMqilqlrRQ&t=24s)
* [Learn More about the ESP32](/esp)


You can see the device in action in the following [Tweet from @Rahul Agarwal](https://twitter.com/rahulagarwal_96/status/1134447026412720129)
