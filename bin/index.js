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
const current_date = Date.now();
const template_name = yargs.argv._[1] || `${current_date}_template`;
const stylesheet = "https://4ormat.github.io/template-screenshots/public/style.css";

const desktop = "1440x2400";
// Might have to consider 766px instead of 768px to fix tablet view
const tablet = "766x100";
const mobile = "390x800";

const device_type = [
  "desktop", "tablet", "mobile"
]

const addUrl2PNGOptions = (url, options) => {
  const defaultOptions = {
    viewport: "1440x2400",
    fullpage: true,
    delay: 15,
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

const desktop_url = cloudinary.url(addUrl2PNGOptions(site_url, { viewport: desktop }), options);
const tablet_url = cloudinary.url(addUrl2PNGOptions(site_url, { viewport: tablet }), options);
const mobile_url = cloudinary.url(addUrl2PNGOptions(site_url, { viewport: mobile }), options);

fs.mkdir(path.resolve(__dirname,`../screenshots/${template_name}`), { recursive: true }, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log(`New ${template_name} directory successfully created.`)
  }
});

[desktop_url, tablet_url, mobile_url].forEach((url, index) => {
  http.get(url, function(res) {
    const fileStream = fs.createWriteStream(path.resolve(__dirname,`../screenshots/${template_name}/${device_type[index]}-preview.png`));
    res.pipe(fileStream);
    fileStream.on("finish", () => {
      fileStream.close();
      console.log(`${device_type[index]} preview saved!`);
    });
  })
});

