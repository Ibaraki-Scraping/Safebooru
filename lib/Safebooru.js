"use strict";
const axios_1 = require("axios");
const node_html_parser_1 = require("node-html-parser");
class Safebooru {
    static async predict(from) {
        return (await axios_1.default.get(this.BASE + "autocomplete.php?q=" + from)).data;
    }
    static async getPicsFromFirstPage(tag) {
        return this.getPicsFromPage(tag, 0);
    }
    static async getPicsFromAllPages(tag) {
        const arr = [];
        let page = await this.getPicsFromFirstPage(tag);
        while (page.length > 0) {
            for (let link of page) {
                arr.push(link);
            }
            page = await this.getPicsFromPage(tag, arr.length);
        }
        return arr;
    }
    static async getPicsFromPage(tag, page) {
        const html = node_html_parser_1.default((await axios_1.default.get(this.BASE + "index.php?page=post&s=list&tags=" + tag + "&pid=" + page)).data);
        const arr = [];
        for (let e of html.querySelectorAll(".thumb")) {
            arr.push(this.BASE + e.firstChild["_attrs"].href);
        }
        return arr;
    }
    static async getImageURLFromPic(pic) {
        const html = node_html_parser_1.default((await axios_1.default.get(pic)).data);
        return html.querySelector("#image").getAttribute("src");
    }
    static async getFullsizeImageURLFromPic(pic) {
        let sample = await this.getImageURLFromPic(pic);
        let final = sample.replace("samples", "images").replace("sample_", "");
        try {
            let res = await axios_1.default.head(final);
            return final;
        }
        catch (e) {
            try {
                let res = await axios_1.default.head(final.replace(".jpg", ".png"));
                return final;
            }
            catch (r) {
                let res = await axios_1.default.head(sample);
                return final;
            }
        }
    }
    static async downloadFullSizeURL(sample) {
        let final = sample.replace("samples", "images").replace("sample_", "");
        try {
            let res = await axios_1.default.get(final, {
                responseType: 'arraybuffer'
            });
            return { url: final, buffer: res.data };
        }
        catch (e) {
            try {
                let res = await axios_1.default.get(final.replace(".jpg", ".png"), {
                    responseType: 'arraybuffer'
                });
                return { url: final.replace(".jpg", ".png"), buffer: res.data };
            }
            catch (r) {
                let res = await axios_1.default.get(sample, {
                    responseType: 'arraybuffer'
                });
                return { url: sample, buffer: res.data };
            }
        }
    }
}
Safebooru.BASE = "https://safebooru.org/";
module.exports = Safebooru;
