import { StepFile } from "../step-parser.ts";
import type { IEntityInstance, IEnties } from "../interfaces/step-interface.ts";

/**
 * Generate a STEP Instance object from a single line.
 * The line is assumed to contain data.
 *
 * __Example:__
 * ```#572= IFCDOOR('1F6umJ5H50aeL3A1As_wUF',#42,'M_Single-Flush:Outside door:346843',$,'M_Single-Flush:Outside door',#938,#566,'346843',2134.,915.);```
 *
 * Each instance will have:
 * - Instance Name, `#572`
 * - Instance Id, `572`
 * - Entity Name, `IFCDOOR`
 * - Attributes `'1F6...',#42,'M_Single-Flush...',$,...`
 *
 * We will henceforth only use the __Instance Id__. I.e. assume _Instance Name_ = _Instance ID_.
 *
 * Getting the _Instance Id_ and _Entity Name_ is fairly straight forward.
 * However, getting the attributes is a bit tricky.
 * The method {@link _parseAttributes} will help us with that.
 *
 * Finally, each instance is added to the property _entities_.
 */
function _generateStepInstance(this: StepFile, line: string) {
    const entity: IEntityInstance = {};
    entity.instanceEndIndex = line.indexOf("=");
    entity.entityStartIndex = line.indexOf("(");
    entity.instanceId = line.substring(1, entity.instanceEndIndex);
    entity.entityName = line.substring(
        entity.instanceEndIndex + 2,
        entity.entityStartIndex
    );
    if (!this.allEntities.includes(entity.entityName)) {
        return;
    }
    entity.attributes = {
        parsed: this.parseStepInstanceAttributes(
            line.substring(entity.entityStartIndex + 1, line.length - 2)
        ),
    };

    if (this.requiredEntities.includes(entity.entityName)) {
        // We need to distinguish the REQUIRED ENTITIES from each other.
        // In other words;
        // - all IfcPropertySingleValue entities are stored in IFCPROPERTYSINGLEVALUE
        // - all IfcRelDefinesByProperties entities are stored in IFCRELDEFINESBYPROPERTIES
        // - all IfcPropertySet entities are stored in IFCPROPERTYSET
        Object.assign(this.entities[entity.entityName], {
            [entity.instanceId]: {
                entityName: entity.entityName,
                attributes: entity.attributes,
            },
        });
        return;
    }

    Object.assign(this.entities.genericEntities, {
        // We DO NOT need to distinguish the these entities from each other.
        // They are simply referred to as: generic entities
        //
        // The so-called generic entities are found on the interoperability layer.
        // These are usually IfcSharedBldgElements (doors, windows, walls, floors, etc.)
        [entity.instanceId]: {
            entityName: entity.entityName,
            attributes: entity.attributes,
            properties: {},
        },
    });
    return;
}

// Underscore is used to distinguish this function as a method that belongs to StepFile
export { _generateStepInstance };
