import { IfcFile } from "../ifc-parser.ts";

/**
 * Map {@link IfcPropertySet | Property Set} to {@link IfcBuildingElement | a generic enitiy} using an {@link IfcRelDefinesByProperties | objectified relationship}.
 * The method {@link _mapPropertySingleValuesToPropertySet } has already created all `Property Set` objects.
 * Now, we need to populate each {@link IfcBuildingElement | generic enitiy} with `Property Sets`.
 */
function _mapPropertySetsToGenericEntities(this: IfcFile) {
    const filterPropertySets =
        this.selectedPropertySets.length > 0 ? true : false;
    const selectedPropertySets: string[] = this.selectedPropertySets;
    Object.values(this.entityInstances.IfcRelDefinesByProperties).forEach(
        (ifcRelDefinesByProperties: any) => {
            // ENTITY IfcRelDefines; RelatedObjects : SET [1:?] OF IfcObject;
            const relatedObjects = getRelatedObjectsReferences(
                ifcRelDefinesByProperties
            );
            const ifcObject = getIfcObjects(this, relatedObjects);
            // Skip object if undefined or not in selectedPropertySets
            if (skipObject(ifcObject, filterPropertySets, selectedPropertySets))
                return;
            // ENTITY IfcRelDefinesByProperties; RelatingPropertyDefinition : IfcPropertySetDefinition;
            const relatingPropertyDefinition = getRelatingPropertyDefinition(
                ifcRelDefinesByProperties
            );
            const ifcPropertySetDefinition = getIfcPropertySetDefinition(
                this,
                relatingPropertyDefinition
            );
            // Ignoring things like: IfcSite, IfcBuildingStorey, IfcBuilding, etc.
            if (ifcPropertySetDefinition === undefined) return;
            mapPropertySet(ifcObject, ifcPropertySetDefinition);
        }
    );
}

/**
 * TODO
 * @param ifcRelDefinesByProperties
 */
const getRelatedObjectsReferences = (ifcRelDefinesByProperties: any) => {
    const {
        attributes: { parsed: ifcRelDefinesByPropertiesAttributes },
    } = ifcRelDefinesByProperties;
    return ifcRelDefinesByPropertiesAttributes[5];
};

/**
 * TODO
 * @param _this
 * @param relatedObjects
 */
const getIfcObjects = (_this: IfcFile, relatedObjects: any) => {
    const { ifcPropertySetName: name = undefined, ifcPropertySet = undefined } =
        _this.entityInstances.IfcPropertySet[relatedObjects] || {};
    if (name === undefined) return;
    return { name, ifcPropertySet };
};

/**
 * TODO
 * @param ifcObject
 * @param filterPropertySets
 * @param selectedPropertySets
 */
const skipObject = (
    ifcObject: any,
    filterPropertySets: any,
    selectedPropertySets: any
) => {
    if (ifcObject === undefined) return true;
    if (filterPropertySets) {
        if (selectedPropertySets.includes(ifcObject.name) === false)
            return true;
    }
    return false;
};

/**
 * TODO
 * @param ifcRelDefinesByProperties
 */
const getRelatingPropertyDefinition = (ifcRelDefinesByProperties: any) => {
    const {
        attributes: { parsed: ifcRelDefinesByPropertiesAttributes },
    } = ifcRelDefinesByProperties;
    return ifcRelDefinesByPropertiesAttributes[4];
};

/**
 * TODO
 * @param _this
 * @param ifcRelDefinesByProperties
 */
const getIfcPropertySetDefinition = (
    _this: IfcFile,
    ifcRelDefinesByProperties: any
) => {
    const { properties: ifcPropertySetDefinition = undefined } =
        // Reference to related object (i.e. a generic IFC entity)
        _this.entityInstances.genericEntityInstances[
            ifcRelDefinesByProperties[0]
        ] || {};
    return ifcPropertySetDefinition;
};

/**
 * TODO
 * @param ifcObject
 * @param ifcPropertySetDefinition
 */
const mapPropertySet = (ifcObject: any, ifcPropertySetDefinition: any) => {
    Object.assign(ifcPropertySetDefinition, {
        [ifcObject.name]: ifcObject.ifcPropertySet,
    });
};
// Underscore is used to distinguish this function as a method that belongs to IfcFile
export { _mapPropertySetsToGenericEntities };
