---
layout: single
title:  "MQTT - Topic convention document"
header:
  teaser: "/assets/images/docs/mqtt_topics_with_bg.png"
tags:
  - MQTT
  - Pub/Sub
  - Messaging
  - JavaScript
  - Erlang
  - EMQ
  
# sidebar:
#   - title: Discord
#     image: "/assets/images/discord/title.jpeg"
#     image-alt: discord is our choice
#     text: Discord is our choice
# model:
#   asset: "/assets/models/esp.glb"
#   color: #FFFFFF
---
# THe MQTT Conventions Document


## Summary
This document is to highlight, document and improve our practices while designing MQTT Topic in our Deployments, keeping in mind 
* Resource optimizations
* Use-case possibilities
* Empower Composability
* Provide Granularity
* Improve Verbosity

MQTT concepts and terminologies: [EMQX docs - v3](https://docs.emqx.io/broker/v3/en/protocol.html)

## Broad Categorization
These topics are broadly divided into two types. Administrative and Product Topics
### Administrative Topics
These are topics on which administrative, metadata flows.

Data and events that are essential for the upkeep of the infrastructure itself. In our case,
* our region-wise presence topics: Kento/presence
* OTA topics
* Reset topic

The general form of these Admin Topics will be:
`CURRENT_REGION`/presence/<`DEVICE_ID`>

The `CURRENT_REGION` would always be the first stub for a developer/custom created administrative topic.

### Product Topics
These are topics on which product specific information flow, the data/information that drives the features/utility of the product.

The message update topic: `ROOT_STUB`/`PRODUCT_STUB`/<`DEVICE_ID`>/`ACTION_STUB`

* `ROOT_STUB`: Something that helps us easily identify the product line. example: digitalicon, homeswitch
* `PRODUCT_STUB`: To identify the batch of the product line. Example: name of owner, name of usecase, mesh_id
* `DEVICE_ID`: The unique id to each h/w device, can use: MAC address, or IMEI number. MAC prefered as on date.
* `ACTION_STUB`: name of event/action to trigger or log.


``` 
NOTE: There is no hard limit of having exactly 4 sub parts of topics. General use-case discussed here
```


## Recommendations/Best Practices
* Topics only lowercase, numbers and dashes.

* Topic stub from Left to Right :: General to specific

![MQTT Topic Stub L2R Flow](\assets\images\docs\mqtt_flow_gen_to_specfic.png)

* While Subscribing, multi-level subscriptions (using `#`) are highly discouraged. Use single level wild-card (using `+`) for stubs like DEVICE_STUB on open listners.

* Use MAC address if possible as DEVICE_STUB.

## References
* https://d1.awsstatic.com/whitepapers/Designing_MQTT_Topics_for_AWS_IoT_Core.pdf
* https://docs.emqx.io/broker/v3/en/design.html#routing-layer
