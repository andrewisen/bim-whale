import { IfcFile } from "../ifc-parser.ts";

/**
 * Map {@link IfcPropertySet | Property Set} to {@link IfcBuildingElement | a generic enitiy} using an {@link IfcRelDefinesByProperties | objectified relationship}.
 * The method {@link _mapPropertySingleValuesToPropertySet } has already created all `Property Set` objects.
 * Now, we need to populate each {@link IfcBuildingElement | generic enitiy} with `Property Sets`.
 */
function _mapPropertySetsToGenericEntities(this: IfcFile) {
    // For each objectified relationship
    for (let key in this.entities.IFCRELDEFINESBYPROPERTIES) {
        const {
            attributes: { parsed: ifcRelDefinesByPropertiesAttributes },
        } = this.entities.IFCRELDEFINESBYPROPERTIES[key];

        const { ifcPropertySetName = undefined, ifcPropertySet = undefined } =
            this.entities.IFCPROPERTYSET[
                // Reference to IfcPropertySet entity
                ifcRelDefinesByPropertiesAttributes[5].slice(1)
            ] || {};

        if (typeof ifcPropertySet === "undefined") {
            continue;
        }

        if (this.selectedPropertySets.length > 0) {
            if (!this.selectedPropertySets.includes(ifcPropertySetName)) {
                continue;
            }
        }

        const relatedObjectsLenght =
            ifcRelDefinesByPropertiesAttributes[4].length;
        for (let index = 0; index < relatedObjectsLenght; index++) {
            const { properties = undefined } =
                this.entities.genericEntities[
                    // Reference to related object (i.e. a generic IFC entity)
                    ifcRelDefinesByPropertiesAttributes[4][index].slice(1)
                ] || {};
            if (typeof properties === "undefined") {
                // Ignoring: IfcSite, IfcBuildingStorey, IfcBuilding
                continue;
            }

            Object.assign(properties, {
                [ifcPropertySetName]: ifcPropertySet,
            });
        }
    }
}

// Underscore is used to distinguish this function as a method that belongs to IfcFile
export { _mapPropertySetsToGenericEntities };
