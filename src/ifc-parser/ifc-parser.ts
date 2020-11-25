import { StepFile } from "../step-parser/step-parser.ts";
import { _parseIfcFile } from "./methods/parse-ifc-file.ts";
import { _mapPropertySingleValuesToPropertySet } from "./methods/map-property-single-values-to-property-set.ts";
import { _mapPropertySetsToGenericEntities } from "./methods/map-property-sets-to-generic-entities.ts";
/**
 * ## IFC FILE
 *
 * The class {@link StepFile} only handles [ISO 10303-21](https://en.wikipedia.org/wiki/ISO_10303-21).
 * ISO 10303-21 is only responsible for the encoding mechanism that represents data.
 *
 * __IFC2x3 TC1__ is the actual schema of interest.
 * The full specification can be found [here](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/).
 *
 * In summary, this class will only handle parsing related to IFC.
 */
class IfcFile extends StepFile {
    public mapPropertySingleValuesToPropertySet: any = _mapPropertySingleValuesToPropertySet;

    public mapPropertySetsToGenericEntities: any = _mapPropertySetsToGenericEntities;

    /**
     * See {@link _parseStepFile}
     */
    public parseIfcFile: any = _parseIfcFile;
}

/**
 * ### Parse IFC File
 * Helper function that:
 * 1. Creates a new {@link IfcFile} object
 * 2. Parse said object
 *
 * @param lines  Contents of the file as a text string.
 * @return void
 */
function dev2(lines: any, config: any) {
    let ifcFile = new IfcFile(lines, config);
    ifcFile.parseIfcFile();
}
export { IfcFile };
