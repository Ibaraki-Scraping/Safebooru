import { writeFileSync } from "node:fs";
import { Safebooru } from "./Safebooru";

(async () => {
  const TAG = "ibaraki_douji_(fate/grand_order)";

  //let urls = await Safebooru.getPicsFromFirstPage(TAG);
  //let urls = await Safebooru.getPicsFromPage(TAG, 0); //PAGES = (number of pics per pages)*(page n°XX)
  let urls = await Safebooru.getPicsFromAllPages(TAG);

  for (let url of urls) {
    let imageURL = await Safebooru.getImageURLFromPic(url);
    let name = imageURL.split("/")[imageURL.split("/").length-1];
		name = name.split("?")[0];
    writeFileSync("./test/" + name, (await Safebooru.downloadFullSizeURL(imageURL)).buffer);
  }
})()