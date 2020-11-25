// IFC Definitions for TypeDoc

class IfcDefinitions {
    /**
     * __IFC2x3 Definition__:
     * The _IfcPropertySet_ defines all dynamically extensible {@link IfcPropertySingleValue | properties}.
     * The property set is a container class that holds {@link IfcPropertySingleValue | properties} within a property tree.
     * These properties are interpreted according to their name attribute.
     */
    IfcPropertySet: any = undefined;

    /**
     * __IFC2x3 Definition__:
     * A property with a single value (_IfcPropertySingleValue_) defines a property object which has a single (numeric or descriptive) value assigned.
     * It defines a property - single value combination for which the property name, the value with measure type (and optionally the unit) is given.
     */
    IfcPropertySingleValue: any = undefined;

    /**
     * __IFC2x3 Definition__:
     * This objectified relationship (_IfcRelDefinesByProperties_) defines the relationships between {@link IfcPropertySet | property set definitions} and {@link IfcBuildingElement | objects}.
     * Properties are aggregated in {@link IfcPropertySet | property sets}, property sets can be grouped to define an object type.
     *
     * The _IfcRelDefinesByProperties_ is a 1-to-N relationship, as it allows for the assignment of one {@link IfcPropertySet | property sets} to a single or to many objects.
     * Those objects then share the same property definition.
     */
    IfcRelDefinesByProperties: any = undefined;

    /**
     * __IFC2x3 Definition__:
     * Major functional part of a building, examples are foundation, floor, roof, wall.
     * The building element comprises all elements that are primarily part of the construction of a building, i.e., its structural and space separating system.
     */
    IfcBuildingElement: any = undefined;
}

export { IfcDefinitions };
