// Interface
import type { IEntityInstance } from "../interfaces/step-interface.ts";
// Class
import { StepFile } from "../step-parser.ts";
// Functions
import { setStepInstanceName } from "../functions/set-step-instance-name.ts";
import { setStepEntityName } from "../functions/set-step-entity-name.ts";
import { getStepAttributes } from "../functions/get-step-attributes.ts";
import { setStepAttributes } from "../functions/set-step-attributes.ts";

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
 * Yes, the terminology can be a bit confusing...
 * 
 * Anyways, getting the _Instance Name_ and _Entity Name_ is fairly straight forward.
 * However, getting the attributes can be a bit tricky.
 * The function {@link parseStepEntityInstanceAttributes} will help us with that.
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
    // Getting the attributes can be a bit tricky. getStepAttributes() will help us
    const parsedAttributes: string[] = getStepAttributes({
        line: line,
        entityInstance: entityInstance,
    });
    // Save parsed attributes, e.g. [['1F6...'],[#42],['M_Single-Flush...'],['$'],[...]]
    setStepAttributes({
        line: line,
        entityInstance: entityInstance,
        parsedAttributes: parsedAttributes,
    });
    return entityInstance;
}

// Underscore is used to distinguish this function as a method that belongs to StepFile
export { _generateStepEntityInstance };
