import { StepFile } from "../step-parser.ts";
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
    const entity: IEntityInstance = {};
    entity.instanceEndIndex = line.indexOf("=");
    entity.entityStartIndex = line.indexOf("(");
    entity.instanceName = line.substring(0, entity.instanceEndIndex);
    entity.entityName = line.substring(
        entity.instanceEndIndex + 2,
        entity.entityStartIndex
    );
    if (!(entity.entityName in this.allEntities)) {
        return;
    }
    entity.attributes = {
        parsed: this.parseStepEntityInstanceAttributes(
            line.substring(entity.entityStartIndex + 1, line.length - 2),
            entity.entityName
        ),
    };

    if (entity.entityName in this.requiredEntities) {
        // We need to distinguish the REQUIRED ENTITIES from each other.
        // In other words;
        // - all IfcPropertySingleValue entities are stored in IFCPROPERTYSINGLEVALUE
        // - all IfcRelDefinesByProperties entities are stored in IFCRELDEFINESBYPROPERTIES
        // - all IfcPropertySet entities are stored in IFCPROPERTYSET
        Object.assign(
            this.entityInstances[this.requiredEntities[entity.entityName]],
            {
                [entity.instanceName]: {
                    entityName: entity.entityName,
                    attributes: entity.attributes,
                },
            }
        );
        return;
    }

    Object.assign(this.entityInstances.genericEntityInstances, {
        // We DO NOT need to distinguish the these entities from each other.
        // They are simply referred to as: Generic Entity Instances
        //
        // These generic entity instances are found on the interoperability layer within the IFC schema.
        // Mainly IfcSharedBldgElements, e.g. doors, windows, walls, floors, etc.
        [entity.instanceName]: {
            entityName: this.selectedEntities[entity.entityName],
            instanceName: entity.instanceName,
            attributes: entity.attributes,
            properties: {},
        },
    });
    return;
}

// Underscore is used to distinguish this function as a method that belongs to StepFile
export { _generateStepEntityInstance };
