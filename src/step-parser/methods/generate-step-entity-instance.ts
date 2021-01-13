import { StepFile } from "../step-parser.ts";
import { parseStepEntityInstanceAttributes } from "../functions/parse-step-entity-instance-attributes.ts";
import type { IEntityInstance, IEnties } from "../interfaces/step-interface.ts";

/**
 * Generate a __STEP Entity Instance object__, herby denoted as a `Entity Instance`.
 *
 * __Example:__
 * ```#572= IFCDOOR('1F6umJ5H50aeL3A1As_wUF',#42,'M_Single-Flush:Outside door:346843',$,'M_Single-Flush:Outside door',#938,#566,'346843',2134.,915.);```
 *
 * Each `Entity Instance` will have a:
 * - Instance Name, `#572`
 * - Entity Name, `IFCDOOR`
 * - Attribute(s) `'1F6...',#42,'M_Single-Flush...',$,...`
 *
 * Getting the _Instance Name_ and _Entity Name_ is fairly straight forward.
 * However, getting the attributes is a bit tricky.
 * The method {@link _parseStepEntityInstanceAttributes} will help us with that.
 *
 */
function _generateStepEntityInstance(this: StepFile, line: string) {
    // Initialize STEP Entity Instance object
    var entityInstance: IEntityInstance = {
        // Instance
        instanceStartIndex: 0,
        instanceEndIndex: line.indexOf("="),
        instanceName: "",
        // Entity
        entityStartIndex: line.indexOf("("),
        entityEndIndex: -1,
        entityName: "",
    };
    // Instance Name, eg. #572
    setStepInstanceName({
        line: line,
        entityInstance: entityInstance,
    });
    // Entity Name, e.g. IFCDOOR
    setStepEntityName({
        line: line,
        entityInstance: entityInstance,
    });
    // Check if Entity Name, e.g. IFCDOOR, should be parsed
    if (entityInstance.entityName in this.allEntities === false) return;
    // Calls the imported function "parseStepEntityInstanceAttributes"
    const parsedAttributes: string[] = getStepAttributes({
        line: line,
        entityInstance: entityInstance,
    });
    // Attributes, e.g. `'1F6...',#42,'M_Single-Flush...',$,...`
    setStepAttributes({
        line: line,
        entityInstance: entityInstance,
        parsedAttributes: parsedAttributes,
    });
    return entityInstance;
}
// Set STEP Instance Name, eg. #572
const setStepInstanceName = (_: {
    line: string;
    entityInstance: IEntityInstance;
}) => {
    const {
        line,
        entityInstance: { instanceEndIndex },
    } = _;
    let { entityInstance } = _;
    entityInstance.instanceName = line.substring(0, instanceEndIndex);
};
// Set STEP Entity Name, e.g. IFCDOOR
const setStepEntityName = (_: {
    line: string;
    entityInstance: IEntityInstance;
}) => {
    const {
        line,
        entityInstance: { instanceEndIndex },
        entityInstance: { entityStartIndex },
    } = _;
    let { entityInstance } = _;
    entityInstance.entityName = line.substring(
        instanceEndIndex + 2,
        entityStartIndex
    );
};
// Get STEP Attributes, e.g. '1F6...',#42,'M_Single-Flush...',$,...`
const getStepAttributes = (_: {
    line: string;
    entityInstance: IEntityInstance;
}) => {
    const { line } = _;
    let { entityInstance } = _;
    return parseStepEntityInstanceAttributes(
        line.substring(entityInstance.entityStartIndex + 1, line.length - 2),
        entityInstance.entityName
    );
};
// Set STEP Attributes, e.g. '1F6...',#42,'M_Single-Flush...',$,...`
const setStepAttributes = (_: {
    line: string;
    entityInstance: IEntityInstance;
    parsedAttributes: string[];
}) => {
    const { line, parsedAttributes } = _;
    let { entityInstance } = _;
    entityInstance.attributes = {
        parsed: parsedAttributes,
    };
};
// Underscore is used to distinguish this function as a method that belongs to StepFile
export { _generateStepEntityInstance };
