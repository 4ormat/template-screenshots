#! /usr/bin/env node

require('dotenv').config()
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addUrl2PNGOptions = (url, options) => {
  const defaultOptions = {
    viewport: "1440x2600",
    fullpage: false,
    delay: 12,
  };
  const completeOptions = { ...defaultOptions, ...options };
  const query = Object.entries(completeOptions).reduce((opts, entry) => {
    return opts.concat(entry.join("="))
  }, []).join("|")
  return `${url}/url2png/${query}`;
};

const site_url = "https://discovernewborn1.zenfoliosite-test.zenfolio.dev/home";

const options =  {
  type: "url2png",
  sign_url: true,
  transform: [
    { width: 1000, height: 1600 },
  ]
};

const viewport_url = cloudinary.url(addUrl2PNGOptions(site_url), options);

console.log(viewport_url);
