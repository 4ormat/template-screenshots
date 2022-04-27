# template-screenshots

Utility for taking website screenshots at different viewports.


## Setup

### Install Dependencies
```bash
nvm use
npm install
```

### Add API Keys

```
touch .env
```

.env file should look like
```
CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
## Available Scripts

## npm run screenshots <url>

Pass any target url to the script above in order to produce multiple screencaptures of a webpage at different viewport sizes. 

Screenshots always capture the full height of the webpage provided. 

Viewport widths for screenshots are defined as follows:

- Desktop: 1440px
- Tablet: 766px
- Mobile: 390px

