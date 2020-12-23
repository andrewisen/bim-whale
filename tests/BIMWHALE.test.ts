import * as log from "https://deno.land/std/log/mod.ts";

import { assertEquals } from "https://deno.land/std@0.82.0/testing/asserts.ts";
import { IfcFile } from "../src/ifc-parser/ifc-parser.ts";

const requiredEntities: { [key: string]: string } = {
    IFCPROPERTYSINGLEVALUE: "IfcPropertySingleValue",
    IFCRELDEFINESBYPROPERTIES: "IfcRelDefinesByProperties",
    IFCPROPERTYSET: "IfcPropertySet",
};
const selectedEntities: { [key: string]: string } = {
    IFCDOOR: "IfcDoor",
    IFCWALLSTANDARDCASE: "IfcWallStandardCase",
};
const selectedPropertySets: string[] = ["Custom_Pset"];
const allEntities: { [key: string]: string } = {
    ...requiredEntities,
    ...selectedEntities,
};
const filePath: string = "tests/SimpleWall.ifc";
const config: any = {
    requiredEntities,
    selectedEntities,
    selectedPropertySets,
    allEntities,
    filePath,
};

async function readFile(path: string): Promise<string> {
    return await Deno.readTextFile(path);
}

Deno.test("SimpleWall.ifc", async () => {
    await readFile(filePath).then((response) => {
        const lines: string[] = response.split(/\r\n|\n/);
        let ifcFile = new IfcFile(lines, config);
        const ifcEntities = ifcFile.parseIfcFile();
        assertEquals(ifcEntities, {
            "#219": {
                entityName: "IfcWallStandardCase",
                instanceName: "#219",
                attributes: {
                    parsed: [
                        "1F6umJ5H50aeL3A1As_wTm",
                        "#42",
                        "Basic Wall:Bearing Wall:346660",
                        "$",
                        "Basic Wall:Bearing Wall",
                        "#188",
                        "#215",
                        "346660",
                    ],
                },
                properties: {
                    Custom_Pset: {
                        TypeMark: "_TYPE-MARK_",
                        Keynote: "_KEYNOTE_",
                        StoreyName: "Level: Level 1",
                        TypeDescription: "_DESCRIPTION_",
                        StatusConstruction: "New Construction",
                        NetArea: "14.04739",
                        Height: "4000.",
                        Width: "200.",
                        Length: "4000.",
                        Hyperlink: "_URL_",
                    },
                },
            },
            "#572": {
                entityName: "IfcDoor",
                instanceName: "#572",
                attributes: {
                    parsed: [
                        "1F6umJ5H50aeL3A1As_wUF",
                        "#42",
                        "M_Single-Flush:Outside door:346843",
                        "$",
                        "M_Single-Flush:Outside door",
                        "#938",
                        "#566",
                        "346843",
                        "2134.",
                        "915.",
                    ],
                },
                properties: {
                    Custom_Pset: {
                        TypeMark: "20",
                        Keynote: "--KEYNOTE--",
                        StoreyName: "Level: Level 1",
                        TypeDescription: "--DESCRIPTION--",
                        StatusConstruction: "New Construction",
                        NetArea: "3.18957899999998",
                        Height: "2134.",
                        Width: "915.",
                        SillHeight: "0.",
                        Hyperlink: "--URL--",
                    },
                },
            },
        });
    });
});
