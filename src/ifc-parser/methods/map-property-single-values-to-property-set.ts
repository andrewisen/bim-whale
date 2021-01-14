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
    Object.values(this.entityInstances.IfcPropertySet).forEach(
        (ifcPropertySet: any) => {
            // ENTITY IfcPropertySet; HasProperties : SET [1:?] OF IfcProperty;
            const hasProperties: string[] = getHasPropertiesReferences(
                ifcPropertySet
            );
            const ifcProperties: { [key: string]: string } = getIfcProperties(
                this,
                hasProperties
            );
            mapProperties(ifcPropertySet, ifcProperties);
        }
    );
}
/**
 * TODO
 * @param ifcPropertySet
 */
const getHasPropertiesReferences = (ifcPropertySet: any) => {
    const {
        attributes: { parsed: ifcPropertySetAttributes },
    } = ifcPropertySet;
    return ifcPropertySetAttributes[4];
};

/**
 * TODO
 * @param _this
 * @param hasProperties
 */
const getIfcProperties = (_this: IfcFile, hasProperties: string[]) => {
    let properties: { [key: string]: string } = {};
    hasProperties.forEach((reference) => {
        const {
            attributes: { parsed: ifcPropertySingleValueAttributes } = {
                parsed: undefined,
            },
        } = _this.entityInstances.IfcPropertySingleValue[reference] || {};
        if (ifcPropertySingleValueAttributes !== "undefined") {
            properties[ifcPropertySingleValueAttributes[0]] =
                ifcPropertySingleValueAttributes[2];
        }
    });
    return properties;
};

/**
 * TODO
 * @param ifcPropertySet
 */
const getIfcPropertySetName = (ifcPropertySet: any) => {
    const {
        attributes: { parsed: ifcPropertySetAttributes },
    } = ifcPropertySet;

    return ifcPropertySetAttributes[2];
};

/**
 * TODO
 * @param ifcPropertySet
 * @param ifcProperties
 */
const mapProperties = (
    ifcPropertySet: any,
    ifcProperties: { [key: string]: string }
) => {
    const name: string = getIfcPropertySetName(ifcPropertySet);
    Object.assign(ifcPropertySet, {
        ifcPropertySetName: name,
        ifcPropertySet: ifcProperties,
    });
};

// Underscore is used to distinguish this function as a method that belongs to IfcFile
export { _mapPropertySingleValuesToPropertySet };
