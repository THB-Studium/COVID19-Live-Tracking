#!/usr/bin/env bash

# configure the bucket to serve static file. May this can be done once.
aws s3 website s3://covid-19-live-tracking --index-document index.html --error-document error.html
# path to be found in angular.json, it is COVID19-Live-Tracking
aws s3 sync dist/COVID19-Live-Tracking s3://covid-19-live-tracking
