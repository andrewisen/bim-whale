import { IfcFile } from "../ifc-parser.ts";

/**
 * Map {@link IfcPropertySingleValue | Property Single Values} to {@link IfcPropertySet | Property Set}
 *
 * Example: `#370= IFCPROPERTYSET('2WRKEbxzHDcwyFLp2OWZN6',#42,'Custom_Pset',$,(#365,#366,#367,#368,#369));`
 *
 * The property set *Custom_Pset* has the properties:
 * - #365
 * - #366
 * - #367
 * - #368
 * - #369
 *
 * Note that the entity {@link IfcPropertySet | Property Set} only holds __references__ to the {@link IfcPropertySingleValue | properties}.
 * We need to include these explicit. In other words, we need to populate the references with their values.
 *
 * - #365: TypeMark = "..."
 * - #366: Keynote = "..."
 * - #367: TypeDescription = "..."
 * - #368: Width = "..."
 * - #369: Hyperlink = "..."
 *
 */
function _mapPropertySingleValuesToPropertySet(this: IfcFile) {
    for (let key in this.entityInstances.IfcPropertySet) {
        const {
            attributes: { parsed: ifcPropertySetAttributes },
            properties = {},
        } = this.entityInstances.IfcPropertySet[key];

        // Example: The property set _Custom_Pset_ has the properties (HasProperties):
        const ifcPropertyLenght = ifcPropertySetAttributes[4].length;
        for (let index = 0; index < ifcPropertyLenght; index++) {
            const {
                attributes: { parsed: ifcPropertySingleValueAttributes } = {
                    parsed: undefined,
                },
            } =
                this.entityInstances.IfcPropertySingleValue[
                    // Reference to IfcPropertySingleValue entity
                    ifcPropertySetAttributes[4][index]
                ] || {};
            if (typeof ifcPropertySingleValueAttributes === "undefined") {
                continue;
            }
            properties[ifcPropertySingleValueAttributes[0]] =
                ifcPropertySingleValueAttributes[2];
        }

        Object.assign(this.entityInstances.IfcPropertySet[key], {
            ifcPropertySetName: ifcPropertySetAttributes[2],
            ifcPropertySet: properties,
        });
    }
}

// Underscore is used to distinguish this function as a method that belongs to IfcFile
export { _mapPropertySingleValuesToPropertySet };
