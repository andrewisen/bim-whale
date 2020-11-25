import { IfcFile } from "../ifc-parser.ts";

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

        const relatedObjectsLenght =
            ifcRelDefinesByPropertiesAttributes[4].length;
        for (let index = 0; index < relatedObjectsLenght; index++) {
            // const relatedObject =
            //     ifcRelDefinesByPropertiesAttributes[4][index];

            const { properties = undefined } =
                this.entities.genericEntities[
                    // Reference to related object (i.e. a generic IFC entity)
                    ifcRelDefinesByPropertiesAttributes[4][index].slice(1)
                ] || {};
            if (typeof properties === "undefined") {
                // Ignoring: IfcSite, IfcBuildingStorey, IfcBuilding
                continue;
            }

            // if (!(ifcPropertySetName in properties)) {
            //     Object.assign(properties, { [ifcPropertySetName]: {} });
            // } else {
            //     console.log("duplicate..");

            //     Object.assign(properties, {
            //         [ifcPropertySetName]: ifcPropertySet,
            //     });
            // }

            Object.assign(properties, {
                [ifcPropertySetName]: ifcPropertySet,
            });
        }
    }
}

// Underscore is used to distinguish this function as a method that belongs to IfcFile
export { _mapPropertySetsToGenericEntities };
