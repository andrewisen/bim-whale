import { StepFile } from "../step-parser.ts";
import type { IEntityInstance } from "../interfaces/step-interface.ts";

/**
 * TODO:
 * 
 * @param this {@link StepFile}
 * @param entityInstance 
 */
function _saveStepEntityInstance(
    this: StepFile,
    entityInstance: IEntityInstance
) {
    if (entityInstance.entityName in this.requiredEntities) {
        // We need to distinguish the REQUIRED ENTITIES from each other.
        // In other words;
        // - all IfcPropertySingleValue entities are stored in IFCPROPERTYSINGLEVALUE
        // - all IfcRelDefinesByProperties entities are stored in IFCRELDEFINESBYPROPERTIES
        // - all IfcPropertySet entities are stored in IFCPROPERTYSET
        Object.assign(
            this.entityInstances[
                this.requiredEntities[entityInstance.entityName]
            ],
            {
                [entityInstance.instanceName]: {
                    entityName: entityInstance.entityName,
                    attributes: entityInstance.attributes,
                },
            }
        );
    } else {
        Object.assign(this.entityInstances.genericEntityInstances, {
            // We DO NOT need to distinguish the these entities from each other.
            // They are simply referred to as: Generic Entity Instances
            //
            // These generic entity instances are found on the interoperability layer within the IFC schema.
            // Mainly IfcSharedBldgElements, e.g. doors, windows, walls, floors, etc.
            [entityInstance.instanceName]: {
                entityName: this.selectedEntities[entityInstance.entityName],
                instanceName: entityInstance.instanceName,
                attributes: entityInstance.attributes,
                properties: {},
            },
        });
    }
}
// Underscore is used to distinguish this function as a method that belongs to StepFile
export { _saveStepEntityInstance };
