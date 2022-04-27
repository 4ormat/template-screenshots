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
const stylesheet = "https://4ormat.github.io/template-screenshots/public/style.css";

const desktop = "1440x2400";
// Might have to consider 766px instead of 768px to fix tablet view
const tablet = "766x100";
const mobile = "390x800";

const addUrl2PNGOptions = (url, device, options) => {
  const defaultOptions = {
    viewport: device,
    fullpage: true,
    delay: 12,
    custom_css_url: stylesheet,
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

const desktop_url = cloudinary.url(addUrl2PNGOptions(site_url, desktop), options);
const tablet_url = cloudinary.url(addUrl2PNGOptions(site_url, tablet), options);
const mobile_url = cloudinary.url(addUrl2PNGOptions(site_url, mobile), options);

[desktop_url, tablet_url, mobile_url].forEach(res => {
  console.log(res);
});

