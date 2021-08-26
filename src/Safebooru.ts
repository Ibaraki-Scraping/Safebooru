import axios from "axios";
import parse from "node-html-parser";

export = Safebooru;

class Safebooru {

    private static BASE = "https://safebooru.org/";

    public static async predict(from: string): Promise<Array<{label: string, value: string}>> {
        return (await axios.get(this.BASE + "autocomplete.php?q=" + from)).data;
    }

    public static async getPicsFromFirstPage(tag: string): Promise<Array<string>> {
        return this.getPicsFromPage(tag, 0);
    }

    public static async getPicsFromAllPages(tag: string): Promise<Array<string>> {
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

    public static async getPicsFromPage(tag: string, page: number): Promise<Array<string>> {

        const html = parse((await axios.get(this.BASE + "index.php?page=post&s=list&tags=" + tag + "&pid=" + page)).data);

        const arr: Array<string> = [];

        for (let e of html.querySelectorAll(".thumb")) {
            arr.push(this.BASE + e.firstChild["_attrs"].href);
        }

        return arr;
    }

    public static async getImageURLFromPic(pic: string): Promise<string> {
        const html = parse((await axios.get(pic)).data);
        return html.querySelector("#image").getAttribute("src");
    }

    public static async getFullsizeImageURLFromPic(pic: string): Promise<string> {
        let sample = await this.getImageURLFromPic(pic);
        let final = sample.replace("samples", "images").replace("sample_", "");
        try {
            let res = await axios.head(final);
            return final;
        } catch (e) {
            try {
                let res = await axios.head(final.replace(".jpg", ".png"));
                return final;
            } catch (r) {
                let res = await axios.head(sample);
                return final;
            }
        }
    }

    public static async downloadFullSizeURL(sample: string): Promise<{url: string, buffer: Buffer}> {
        let final = sample.replace("samples", "images").replace("sample_", "");
        try {
            let res = await axios.get(final, {
                responseType: 'arraybuffer'
            });
            return {url: final, buffer: res.data};
        } catch (e) {
            try {
                let res = await axios.get(final.replace(".jpg", ".png"), {
                    responseType: 'arraybuffer'
                });
                return {url: final.replace(".jpg", ".png"), buffer: res.data};
            } catch (r) {
                let res = await axios.get(sample, {
                    responseType: 'arraybuffer'
                });
                return {url: sample, buffer: res.data};
            }
        }
    }
}