#!/usr/bin/env bash

sudo docker build --no-cache -t social-media:ui .
sudo docker tag social-media:ui apatterson189/social-media:ui
sudo docker push apatterson189/social-media:ui
