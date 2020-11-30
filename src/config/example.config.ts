// Config file for Deno

/**
 * ## Required IFC Entities
 * These entities are required to parse {@link PROPERTYSET | Property Sets}.
 */
const requiredEntities: string[] = [
    "IFCPROPERTYSINGLEVALUE",
    "IFCRELDEFINESBYPROPERTIES",
    "IFCPROPERTYSET",
];
/**
 * ## Selected IFC Entities
 * These are the selected entities that will be parsed.
 */
const selectedEntities: string[] = ["IFCDOOR", "IFCWALLSTANDARDCASE"];

/**
 * ## Selected IFC Property Sets
 * These are the selected Property Sets that will be parsed.
 */
const selectedPropertySets: string[] = ["Custom_Pset"];

/**
 * ## All IFC Entities
 * These are all IFC Entities that will be parsed.
 * All other entities will be ignored.
 *
 */
const allEntities: string[] = [...requiredEntities, ...selectedEntities];

/**
 * ## File Path
 * Generic file path for Deno, relative to `index.ts`
 *
 * N.B. Use a [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) when implementing onto a website
 *
 */
const filePath: string = "./SimpleWall.ifc";

/**
 * ## Options
 * Export configurations as generic options object.
 * This need to be better implemented
 */
const config: any = {
    requiredEntities: requiredEntities,
    selectedEntities: selectedEntities,
    selectedPropertySets: selectedPropertySets,
    allEntities: allEntities,
    filePath: filePath,
};

export { config };
