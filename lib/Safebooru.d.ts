/// <reference types="node" />
export declare class Safebooru {
    private static BASE;
    static predict(from: string): Promise<Array<{
        label: string;
        value: string;
    }>>;
    static getPicsFromFirstPage(tag: string): Promise<Array<string>>;
    static getPicsFromAllPages(tag: string): Promise<Array<string>>;
    static getPicsFromPage(tag: string, page: number): Promise<Array<string>>;
    static getImageURLFromPic(pic: string): Promise<string>;
    static getFullSizeURL(sample: string): Promise<{
        url: string;
        buffer: Buffer;
    }>;
}
