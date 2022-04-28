#! /usr/bin/env node

require('dotenv').config()
const cloudinary = require("cloudinary").v2;
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const http = require('http');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const site_url = yargs.argv._[0];
const stylesheet = "https://4ormat.github.io/template-screenshots/public/style.css";

const desktop = "1440x2400";
// Might have to consider 766px instead of 768px to fix tablet view
const tablet = "766x100";
const mobile = "390x800";

const addUrl2PNGOptions = (url, dimensions, options, device) => {
  const defaultOptions = {
    viewport: dimensions,
    fullpage: true,
    delay: 5,
    custom_css_url: stylesheet,
    device_type: device
  };
  const completeOptions = { ...defaultOptions, ...options };
  const query = Object.entries(completeOptions).reduce((opts, entry) => {
    return opts.concat(entry.join("="))
  }, []).join("|")
  return `${url}/url2png/${query}`;
};

const options =  {
  type: "url2png",
  sign_url: true,
  transform: [
    { width: 1000, height: 1600 },
  ]
};

const desktop_url = cloudinary.url(addUrl2PNGOptions(site_url, desktop), options, "desktop");
const tablet_url = cloudinary.url(addUrl2PNGOptions(site_url, tablet), options, "tablet");
const mobile_url = cloudinary.url(addUrl2PNGOptions(site_url, mobile), options, "mobile");

[desktop_url, tablet_url, mobile_url].forEach((url, index, array) => {
  console.log(index, "index", array)
  http.get(url, function(res) {
    const fileStream = fs.createWriteStream(path.resolve(__dirname,`../screenshots/${index}-preview.png`));
    res.pipe(fileStream);
    fileStream.on("finish", function() {
      fileStream.close();
      console.log("done!")
    });
  })
});

