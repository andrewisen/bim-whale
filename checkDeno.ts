import { config } from "./src/config/config.ts";

/*
 * ## Read File
 * The Deno way to read files, [read More](https://deno.land/std/fs).
 */
async function readFile(path: string): Promise<string> {
    return await Deno.readTextFile(path);
}

/*
 * ## Main
 * Main will {@link readFile | read the file } asynchronously and split each line into a an array.
 * The array will then be parsed into an IFC Object.
 */
async function main(path: string) {
    readFile(path).then((response) => {
        const lines: string[] = response.split(/\r\n|\n/);
        console.log(lines);
    });
}

const { filePath } = config;
main(filePath);
