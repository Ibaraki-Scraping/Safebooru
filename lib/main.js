"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const Safebooru_1 = require("./Safebooru");
(async () => {
    const TAG = "ibaraki_douji_(fate/grand_order)";
    //let urls = await Safebooru.getPicsFromFirstPage(TAG);
    //let urls = await Safebooru.getPicsFromPage(TAG, 0); //PAGES = (number of pics per pages)*(page n°XX)
    let urls = await Safebooru_1.Safebooru.getPicsFromAllPages(TAG);
    for (let url of urls) {
        let imageURL = await Safebooru_1.Safebooru.getImageURLFromPic(url);
        let name = imageURL.split("/")[imageURL.split("/").length - 1];
        name = name.split("?")[0];
        node_fs_1.writeFileSync("./test/" + name, (await Safebooru_1.Safebooru.downloadFullSizeURL(imageURL)).buffer);
    }
})();
