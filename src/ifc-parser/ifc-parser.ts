import { StepFile } from "../step-parser/step-parser.ts";
import { _parseIfcFile } from "./methods/_parse-ifc-file.ts";
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
    /**
     * See {@link _mapPropertySingleValuesToPropertySet}
     */
    public mapPropertySingleValuesToPropertySet: any = _mapPropertySingleValuesToPropertySet;
    /**
     * See {@link _mapPropertySetsToGenericEntities}
     */
    public mapPropertySetsToGenericEntities: any = _mapPropertySetsToGenericEntities;
    /**
     * See {@link _parseStepFile}
     */
    public parseIfcFile: any = _parseIfcFile;
}

export { IfcFile };
