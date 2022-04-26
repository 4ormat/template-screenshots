#! /usr/bin/env node

require('dotenv').config()
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const site_url = "https://discovernewborn1.zenfoliosite-test.zenfolio.dev/home";
const options =  {
  type: "url2png",
  sign_url: true,
  transform: [
    { width: 1000, height: 1600 },
  ]
};

const viewport_url = cloudinary.url(`${site_url}/url2png/viewport=1440x2400|fullpage=false|delay=12|custom_css_url=https://4ormat.github.io/template-screenshots/bin/style.css`, options);

console.log(viewport_url);
