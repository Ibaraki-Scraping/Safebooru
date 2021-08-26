# Safebooru
A simple image downloader from [Safebooru](http://safebooru.org/)
## Getting started
`npm i @ibaraki-douji/safebooru --save`

## Usage

### Import the lib
```js
const Safebooru = require('@ibaraki-douji/safebooru')
```

### Get tags predictions
```js
const Safebooru = require('@ibaraki-douji/safebooru')

Safebooru.predict('query').then(console.log)
```

### Get images from page
```js
const Safebooru = require('@ibaraki-douji/safebooru')

// METHOD 1
Safebooru.getPicsFromFirstPage("tag").then(console.log)

// METHOD 2
Safebooru.getPicsFromPage("tag", 2).then(console.log)

// METHOD 3
// LONGER
Safebooru.getPicsFromAllPages("tag").then(console.log)
```

### Get Image URL
```js
const Safebooru = require('@ibaraki-douji/safebooru');

// The image can be resized from the site
Safebooru.getImageURLFromPic("https://safebooru.org/index.php?page=post&s=view&id=3284666").then(console.log);
```

### Get the fullsize image
```js
const Safebooru = require('@ibaraki-douji/safebooru');

Safebooru.getFullsizeImageURLFromPic("https://safebooru.org/index.php?page=post&s=view&id=3284666").then(console.log);
```


## Exemple
This will download ALL image from the tag `ibaraki_douji_(fate/grand_order)`
```js
const Safebooru = require('@ibaraki-douji/safebooru');
// npm i axios
const axios = require('axios').default
const fs = require('fs')

// MAKE A ASYNC FUNCTION AT START
(async () => {
   const TAG = "ibaraki_douji_(fate/grand_order)";
   
   let urls = await Safebooru.getPicsFromAllPages(TAG);
   for (let url of urls) {
    let imageURL = await Safebooru.getImageURLFromPic(url);
    let name = imageURL.split("/")[imageURL.split("/").length-1].split("?")[0];
    fs.writeFileSync("./test/" + name, (await Safebooru.downloadFullSizeURL(imageURL)).buffer);
   }
})()
```

## More Help and Support
Discord : https://discord.gg/mD9c4zP4Er
#
Ask me for an update or to fix a bug in the Discord server