import { config } from "./src/config/config.ts";
import { IfcFile } from "./src/ifc-parser/ifc-parser.ts";

/*
 * ## DEV
 * Print each entity that has the corresponding property set
 */
function printPropertySet(ifcFile: IfcFile, propertySet: string) {
    for (var entitiy in ifcFile.entities.genericEntities) {
        for (var pset in ifcFile.entities.genericEntities[entitiy].properties) {
            if (pset === propertySet) {
                console.log(
                    ifcFile.entities.genericEntities[entitiy].properties[pset]
                );
            }
        }
    }
}

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
        let ifcFile = new IfcFile(lines, config);
        ifcFile.parseIfcFile();
        printPropertySet(ifcFile, "Custom_Pset");
    });
}

const { filePath } = config;
main(filePath);
