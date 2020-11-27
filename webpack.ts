/**
 * This is a mirror of index.ts.
 *
 * WIP
 */

import { config } from "./src/config/example.config.ts";
import { IfcFile } from "./src/ifc-parser/ifc-parser.ts";

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

function handleFile(event: Event) {
    const file = (<HTMLInputElement>event!.target).files![0];
    var fileReader = new FileReader();
    fileReader.onload = (loadEvent: Event) => {
        const lines: string[] = (<string>fileReader!.result).split(/\r\n|\n/);
        let ifcFile = new IfcFile(lines, config);
        ifcFile.parseIfcFile();
        printPropertySet(ifcFile, "Custom_Pset");
    };
    fileReader.readAsText(file);
}

const inputElement = document.getElementById("ifcFileInput");
inputElement!.addEventListener("change", (event: Event) => {
    handleFile(event);
});
