/**
 * WIP
 */

import { IfcFile } from "./src/ifc-parser/ifc-parser.ts";
declare const buildTable: any;
declare const $: any;

function handleIfcFile() {
    localStorage.setItem("ifcEntities", $("#ifcSelection").val());

    const requiredEntities = [
        "IFCPROPERTYSINGLEVALUE",
        "IFCRELDEFINESBYPROPERTIES",
        "IFCPROPERTYSET",
    ];
    let selectedEntities = $("#ifcSelection")
        .val()
        .map((entity: any) => {
            return entity.toUpperCase();
        });
    const allEntities = [...requiredEntities, ...selectedEntities];
    const config = {
        requiredEntities: requiredEntities,
        selectedEntities: selectedEntities,
        allEntities: allEntities,
    };
    const file = $("#ifcFileInput").prop("files")[0];
    var fileReader = new FileReader();
    fileReader.onload = (loadEvent) => {
        const lines = (<string>fileReader!.result).split(/\r\n|\n/);
        let ifcFile = new IfcFile(lines, config);
        ifcFile.parseIfcFile();
        buildTable(Object.values(ifcFile.entities.genericEntities));
    };
    fileReader.readAsText(file);
    return false;
}
document.getElementById("ifc-form").addEventListener("submit", handleIfcFile);
