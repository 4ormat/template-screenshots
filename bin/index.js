#! /usr/bin/env node

require('dotenv').config()
const cloudinary = require("cloudinary").v2;
const yargs = require('yargs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const site_url = yargs.argv._[0];
const stylesheet = "https://4ormat.github.io/template-screenshots/bin/style.css";

const desktop = "1440x2400";
// Might have to consider 766px instead of 768px to fix tablet view
const tablet = "766x100";
const mobile = "390x800";

const options =  {
  type: "url2png",
  sign_url: true,
  transform: [
    { width: 1000, height: 1600 },
  ]
};

const desktop_url = cloudinary.url(`${site_url}/url2png/viewport=${desktop}|fullpage=true|delay=15|custom_css_url=${stylesheet}`, options);
const tablet_url = cloudinary.url(`${site_url}/url2png/viewport=${tablet}|fullpage=true|delay=15|custom_css_url=${stylesheet}`, options);
const mobile_url = cloudinary.url(`${site_url}/url2png/viewport=${mobile}|fullpage=true|delay=15|custom_css_url=${stylesheet}`, options);

Promise.all([desktop_url, tablet_url, mobile_url]).then(res => {
  console.log(res);
}).catch((err) => {
  console.log(err.message)
});


