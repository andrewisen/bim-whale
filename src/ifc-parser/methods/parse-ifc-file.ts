import { IfcFile } from "../ifc-parser.ts";

/**
 * Iterates over each line.
 * Only include the so-called __DATA section__.<br>
 * One can assume that each line will contain an equal sign (=).<br>
 *
 *  __Example:__<br>
 * ```#572= IFCDOOR('...');```
 * <br>
 */
function _parseIfcFile(this: IfcFile) {
    this.parseStepFile();
    this.mapPropertySingleValuesToPropertySet();
    this.mapPropertySetsToGenericEntities();
}

// Underscore is used to distinguish this function as a method that belongs to IfcFile
export { _parseIfcFile };
