"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Safebooru = void 0;
const ax = require("axios");
const node_html_parser_1 = require("node-html-parser");
const axios = ax.default;
class Safebooru {
    static async predict(from) {
        return (await axios.get(this.BASE + "autocomplete.php?q=" + from)).data;
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
        const html = node_html_parser_1.default((await axios.get(this.BASE + "index.php?page=post&s=list&tags=" + tag + "&pid=" + page)).data);
        const arr = [];
        for (let e of html.querySelectorAll(".thumb")) {
            arr.push(this.BASE + e.firstChild["_attrs"].href);
        }
        return arr;
    }
    static async getImageURLFromPic(pic) {
        const html = node_html_parser_1.default((await axios.get(pic)).data);
        return html.querySelector("#image").getAttribute("src");
    }
    static async downloadFullSizeURL(sample) {
        let final = sample.replace("samples", "images").replace("sample_", "");
        try {
            let res = await axios.get(final, {
                responseType: 'arraybuffer'
            });
            return { url: final, buffer: res.data };
        }
        catch (e) {
            try {
                let res = await axios.get(final.replace(".jpg", ".png"), {
                    responseType: 'arraybuffer'
                });
                return { url: final.replace(".jpg", ".png"), buffer: res.data };
            }
            catch (r) {
                let res = await axios.get(sample, {
                    responseType: 'arraybuffer'
                });
                return { url: sample, buffer: res.data };
            }
        }
    }
}
exports.Safebooru = Safebooru;
Safebooru.BASE = "https://safebooru.org/";
