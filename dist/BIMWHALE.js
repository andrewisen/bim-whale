var BIMWHALE;BIMWHALE =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "IfcFile": () => /* reexport */ IfcFile
});

;// CONCATENATED MODULE: ./src/step-parser/methods/parse-step-file.ts
/**
 * Iterates over each line.
 * Only include the so-called __DATA section__.<br>
 * One can assume that each line will contain an equal sign (=).<br>
 *
 *  __Example:__<br>
 * ```#572= IFCDOOR('...');```
 * <br>
 */
function _parseStepFile() {
    var linesLength = this.lines.length;
    for (var index = 0; index < linesLength; index++) {
        var line = this.lines[index];
        if (line.indexOf("=") == -1) {
            continue;
        }
        this.generateStepEntityInstance(line);
    }
}
// Underscore is used to distinguish this function as a method that belongs to StepFile


;// CONCATENATED MODULE: ./src/step-parser/methods/generate-step-entity-instance.ts
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
function _generateStepEntityInstance(line) {
    var _a, _b;
    var entity = {};
    entity.instanceEndIndex = line.indexOf("=");
    entity.entityStartIndex = line.indexOf("(");
    entity.instanceName = line.substring(0, entity.instanceEndIndex);
    entity.entityName = line.substring(entity.instanceEndIndex + 2, entity.entityStartIndex);
    if (!(entity.entityName in this.allEntities)) {
        return;
    }
    entity.attributes = {
        parsed: this.parseStepEntityInstanceAttributes(line.substring(entity.entityStartIndex + 1, line.length - 2), entity.entityName),
    };
    if (entity.entityName in this.requiredEntities) {
        // We need to distinguish the REQUIRED ENTITIES from each other.
        // In other words;
        // - all IfcPropertySingleValue entities are stored in IFCPROPERTYSINGLEVALUE
        // - all IfcRelDefinesByProperties entities are stored in IFCRELDEFINESBYPROPERTIES
        // - all IfcPropertySet entities are stored in IFCPROPERTYSET
        Object.assign(this.entityInstances[this.requiredEntities[entity.entityName]], (_a = {},
            _a[entity.instanceName] = {
                entityName: entity.entityName,
                attributes: entity.attributes,
            },
            _a));
        return;
    }
    Object.assign(this.entityInstances.genericEntityInstances, (_b = {},
        // We DO NOT need to distinguish the these entities from each other.
        // They are simply referred to as: Generic Entity Instances
        //
        // These generic entity instances are found on the interoperability layer within the IFC schema.
        // Mainly IfcSharedBldgElements, e.g. doors, windows, walls, floors, etc.
        _b[entity.instanceName] = {
            entityName: this.selectedEntities[entity.entityName],
            instanceName: entity.instanceName,
            attributes: entity.attributes,
            properties: {},
        },
        _b));
    return;
}
// Underscore is used to distinguish this function as a method that belongs to StepFile


;// CONCATENATED MODULE: ./src/step-parser/methods/parse-step-entity-instance-attributes.ts
/**
 *
 * Parse an _attribute string_ into a JavaScript object.
 * The so-called _attribute string_ is derived from {@link _generateStepEntityInstance}.
 *
 * __Example:__
 *
 * ```#572= IFCDOOR('1F6umJ5H50aeL3A1As_wUF',#42,'M_Single-Flush:Outside door:346843',$,'M_Single-Flush:Outside door',#938,#566,'346843',2134.,915.);```
 *
 * In this example, the _attribute string_ is `'1F6umJ5H50aeL3A1As_wUF',#42,'M_Single-Flush:Outside door:346843',$,'M_Single-Flush:Outside door',#938,#566,'346843',2134.,915.`.
 * Or, in other words: The _attribute string_ is the parameter of the "IFCDOOR function".
 *
 * Moving on; the _attribute string_  must first be converted into a _JSON string_.
 * [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) will then convert the _JSON string_ into a _JSON object_.
 *
 * We can clearly see that the _attribute string_ __IS NOT__ compatible with JSON.
 * Firstly, apostrophes are not supported (there needs to be quotation marks).
 * Secondly, some attributes are not enclosed by quotation marks. E.g. `#938`(see example above).
 *
 * __In summary, we want the following:__
 *
 * ```[ "1F6umJ5H50aeL3A1As_wUF", "#42", "M_Single-Flush:Outside door:346843", "$", "M_Single-Flush:Outside door", "#938","#566","346843","2134.","915."]```
 *
 * ## RegEx
 * Regular Expression is probably the easiest (but not the fastest) way to convert the _attribute string_ into a _JSON Object_.
 * Please note that each RegEx will impact the performance.
 *
 * I have provides a very basic set of RegEx, this will work _in most cases_.
 * Feel free to tweak this to your own liking.
 * My favorite RegEx tool is [https://regex101.com](https://regex101.com).
 *
 * Please note that RegEx is can be difficult to understand.
 * Just ignore this bit if you are unsure.
 *
 * ### Some noteworthy difficult lines
 * _As instances:_
 * ```javascript
 * #278= IFCPROPERTYSINGLEVALUE('Structural',$,IFCBOOLEAN(.F.),$);
 * #261= IFCWALLTYPE('1F6umJ5H50aeL3A1As_wV9',#42,'Basic Wall:Bearing Wall',$,$,(#332,#334,#336,#338,#340,#343,#346,#349,#352,#355,#359,#363,#370),$,'346781',$,.STANDARD.);
 * #121= IFCPROJECT('2nxdYR2RHCDBiKJulbA_QU',#42,'// PROJECT/NUMBER //',$,$,'// PROJECT/NAME //','// PROJECT/STATUS //',(#113),#108);
 * #228= IFCQUANTITYLENGTH('Height',$,$,4000.);
 * #754= IFCPROPERTYSINGLEVALUE('AboveGround',$,IFCLOGICAL(.U.),$);
 * #652= IFCPROPERTYSINGLEVALUE('Thermal Resistance (R)',$,IFCREAL(0.270116960643959),$);
 * ```
 * _As attribute strings:_
 * ```javascript
 * 'Structural',$,IFCBOOLEAN(.F.),$)
 * '1F6umJ5H50aeL3A1As_wV9',#42,'Basic Wall:Bearing Wall',$,$,(#332,#334,#336,#338,#340,#343,#346,#349,#352,#355,#359,#363,#370),$,'346781',$,.STANDARD.
 * '2nxdYR2RHCDBiKJulbA_QU',#42,'// PROJECT/NUMBER //',$,$,'// PROJECT/NAME //','// PROJECT/STATUS //',(#113),#108
 * 'Height',$,$,4000.
 * 'AboveGround',$,IFCLOGICAL(.U.),$
 * 'Thermal Resistance (R)',$,IFCREAL(0.270116960643959),$
 * ```
 *
 * There are at least five different things to consider:
 * 1. "Function"
 * 2. Indefinite attribute
 * 3. Nested attribute
 * 4. References
 * 5. Integers
 *
 * ### 1. Functions
 * Example:
 *
 * ```javascript
 * IFCIDENTIFIER('Outside door')
 * IFCTHERMALTRANSMITTANCEMEASURE(3.7021)
 * IFCTEXT('')
 * IFCLOGICAL(.U.)
 * ```
 *
 * For the sake of simplicity, let's call and treat these as JavaScript functions.
 * Note that each function has different ways to pass in parameters.
 * Some parameters are enclosed with apostrophe, and some are not.
 *
 * We need a RegEx that takes this into consideration.
 * The simplest form is:
 * `[A-Z]+\('[a-zA-z_ ]+'\)`
 *
 * Let's take the first function `IFCIDENTIFIER('Outside door')` as an example.
 * The RegEx will find us the name of the function...
 *
 * However, this is to no good use yet.
 * We need to capture both the _function name_ and the _parameters_, i.e. __IFCIDENTIFIER__ and __Outside door__
 *
 * Our RegEx now becomes: `([A-Z]+\()'([a-zA-z_ ]+)'\)`
 * It is crucial that you understand what this RegEx mean... it will only get more difficult from here.
 *
 * Anyways, we can substitute our string using the expression `$1$2)`.
 *
 * __UPDATE:__ This approach has been replaced with a new one.
 * See [Issue #4](https://github.com/andrewisen/bim-whale/issues/4) for more information.
 *
 * ### 2. Indefinite attribute
 * Example: `#764= IFCRELDEFINESBYPROPERTIES('0Jv9wzDiT2Fx3l2pN5PrZ7',#42,$,$,(#140),#752);`
 *
 * _Indefinite attribute_ are parameters that has not been assigned. These are represented with a dollar sign (__$__).
 * Note that a dollar sign might appear in the UIID, e.g. `2HlE6XRD5D2u$q88QiyvCI`
 *
 * One can simply assume that _indefinite attributes_ __ALWAYS__ begins with a comma (and not a character).
 *
 * __UPDATE:__ This approach has been replaced with a new one.
 * See [Issue #4](https://github.com/andrewisen/bim-whale/issues/4) for more information.
 *
 * ### 3. Nested attribute
 * Example: `#810= IFCPROPERTYSET('0eCyo1mQf61RRDb8LkFhbB',#42,'Other',$,(#781,#782,#783,#784,#785));`
 *
 * The _nested attributes_ are the ones enclosed by parentheses, i.e. __#781,#782,#783,#784,#785__.
 * We need enclose them with square brackets.
 *
 * ### 4. References
 * Example: `#219= IFCWALLSTANDARDCASE('1F6umJ5H50aeL3A1As_wTm',#42,'Basic Wall:Bearing Wall:346660',$,'Basic Wall:Bearing Wall',#188,#215,'346660');`
 *
 * The _wall entity_ is referencing the entities __188__ and __215__.
 * These references need to be enclosed by  quotations marks.
 *
 * Please note that references inside _nested attributes_ also need to be enclosed (see example above).
 *
 * ### 5. Integers
 * Example: `#572= IFCDOOR('1F6umJ5H50aeL3A1As_wUF',#42,'M_Single-Flush:Outside door:346843',$,'M_Single-Flush:Outside door',#938,#566,'346843',2134.,915.);`
 *
 * The last two parameters are integers; __2134.__, __915.__.
 * Note that the zero is omitted in these cases.
 */
function _parseStepEntityInstanceAttributes(attributeString, entityName, globalId, hasFunction, functionParameter) {
    var _a, _b;
    if (globalId === void 0) { globalId = ""; }
    if (hasFunction === void 0) { hasFunction = false; }
    if (functionParameter === void 0) { functionParameter = ""; }
    // Used for error logging
    var originalAttributeString = attributeString;
    // A. Deconstruct the GlobalId (GUID)
    (_a = deconstructGlobalId(originalAttributeString, entityName, globalId), attributeString = _a.attributeString, globalId = _a.globalId);
    // B. RegEx edge case
    attributeString = addCommas(attributeString);
    // C. Deconstruct function
    (_b = deconstructFunction(attributeString, hasFunction, functionParameter), attributeString = _b.attributeString, functionParameter = _b.functionParameter, hasFunction = _b.hasFunction);
    /**
     * PARSE
     */
    attributeString = parse(attributeString);
    // C. Construct function
    attributeString = constructFunction(attributeString, entityName, hasFunction, functionParameter);
    // B. RegEx edge case
    attributeString = removeCommas(attributeString);
    globalId = removeCommas(globalId);
    // A. Construct GlobalId (GUID)
    attributeString = constructGlobalId(entityName, attributeString, globalId);
    /**
     * WIP
     */
    var parsedAttributes = [];
    try {
        parsedAttributes = JSON.parse("[" + attributeString + "]");
    }
    catch (error) {
        console.log("Parsing error:");
        console.log("In:", originalAttributeString);
        console.log("Out:", attributeString);
        console.log(" ");
        parsedAttributes = ["N/A"];
    }
    return parsedAttributes;
}
// Underscore is used to distinguish this function as a method that belongs to StepFile

/**
 * Deconstructs the GlobalId (GUID)
 * The function {@link constructGlobalId} will add back the GlobalId.
 *
 * Edge case for `IfcPropertySingleValue`
 *
 * Example: #77331= IFCSLAB('3V$FMCDUfCoPwUaHMPfteW',#48,'Pad:Pad 1:130737',$,'Pad:Pad 1',#77294,#77329,'130737',.FLOOR.);
 *
 * Notice that the GlobalId contains a dollar sign.
 * The regEx that deals with dollar signs will take the GlobalId into consideration.
 * Let's ignore the GloablId for now, in order to make the parsing somewhat easier.
 *
 * WIP
 *
 * @param attributeString
 * @param entityName
 * @param globalId
 */
var deconstructGlobalId = function (attributeString, entityName, globalId) {
    if (entityName !== "IFCPROPERTYSINGLEVALUE") {
        globalId = attributeString.substr(0, attributeString.indexOf(","));
        // The attributeString will NOT contain the GlobalID.
        attributeString = attributeString.substr(attributeString.indexOf(","));
        // We will add back the GlobalID later
    }
    return { attributeString: attributeString, globalId: globalId };
};
/**
 * Constructs the GlobalId(GUID) from {@link deconstructGlobalId}
 *
 * @param entityName
 * @param attributeString
 * @param globalId
 */
var constructGlobalId = function (entityName, attributeString, globalId) {
    if (entityName !== "IFCPROPERTYSINGLEVALUE") {
        attributeString = '"' + globalId + '"' + attributeString;
    }
    return attributeString;
};
/**
 * Edge case for RegEx. In normal cases, we must add an edge case for the beginning and end of the string.
 * E.g. `GlobalId,OwnerHistory,Name,Description`
 *
 * Let's say that we want to parse the _description_.
 * Notice that the string DO NOT end with a comma.
 * In this particular case, we need to add an edge case.
 *
 * We do not need this edge case if we add commas before and after the string.
 * @param attributeString
 */
var addCommas = function (attributeString) {
    return "," + attributeString + ",";
};
/**
 * Construct RegEx
 * @param attributeString
 */
var removeCommas = function (attributeString) {
    return attributeString.slice(1, -1);
};
/**
 * Deconstruct a function inside an attribute string.
 * The function {@link constructFunction} will add the function back.
 *
 * E.g. `...,IFCTEXT('Hello World'),...`
 *
 * The function `IFCTEXT` has the parameter `'Hello World'`.
 * Notice that some parameters are enclosed by apostrophes.
 *
 * @param attributeString
 * @param hasFunction
 * @param functionParameter
 */
var deconstructFunction = function (attributeString, hasFunction, functionParameter) {
    /**
     * Check if the attribute string has a "function" (see above for example)
     */
    functionParameter = /(IFC[A-Z]+\()(.*)(\)\,)/g.exec(attributeString);
    if (functionParameter) {
        hasFunction = true;
        functionParameter = parseFunctionParameter(functionParameter[2]);
        // Replace the parameter with the phrase: {PARAM}
        attributeString = attributeString.replace(/(IFC[A-Z]+\()(.*)(\)\,)/g, '"$1{PARAM})",');
    }
    return { attributeString: attributeString, functionParameter: functionParameter, hasFunction: hasFunction };
};
/**
 * Constructs the function from {@link deconstructFunction}
 *
 * @param attributeString
 * @param entityName
 * @param hasFunction
 * @param functionParameter
 */
var constructFunction = function (attributeString, entityName, hasFunction, functionParameter) {
    if (hasFunction) {
        if (entityName !== "IFCPROPERTYSINGLEVALUE") {
            attributeString = attributeString.replace(/(IFC[A-Z]+\()(\{PARAM\})(\)\"\,)/g, "$1" + functionParameter + ')",');
        }
        else {
            attributeString = attributeString.replace(/(IFC[A-Z]+\()(\{PARAM\})(\)\"\,)/g, functionParameter.replace(/^\'(.+)\'/g, "$1") + '",');
        }
    }
    return attributeString;
};
/**
 * Parse a regular attribute string
 *
 * @param attributeString
 */
var parse = function (attributeString) {
    return attributeString
        .replace(/\\/g, "") // Backward slashes
        .replace(/\//g, "\\/") // Forward slashes
        .replace(/\$/g, '"$"') // Indefinite attributes
        .replace(/(^|,)\((#\d+.*?)\)/g, "$1[$2]") // Nested attributes
        .replace(/([,\[])(#\d+)+/g, '$1"$2"') // References to other entities (e.g. #123)
        .replace(/,(\d+[.]\d*)/g, ",'$1'") // Integers (that are not escaped)
        .replace(/(\(|\,)(\..+\.)(\)|\,)/g, "$1'$2'$3") // ".T.", ".F.", ".UNDEFINED.", etc.
        .replace(/'/g, '"'); // Convert all remaining apostrophes to quotes
};
/**
 * Parse a function parameter.
 * The entire function parameter will be enclosed with quotes.
 *
 * No need to be as detailed as the {@link parse} function.
 *
 * @param functionParameter
 */
var parseFunctionParameter = function (functionParameter) {
    return functionParameter
        .replace(/\\/g, "") // Backward slashes
        .replace(/\//g, "\\/") // Forward slashes
        .replace(/\"/g, '\\"'); // Quotation marks
};

;// CONCATENATED MODULE: ./src/step-parser/step-parser.ts



/**
 * ## STEP FILE
 *
 * This class deals with [STEP](https://en.wikipedia.org/wiki/ISO_10303).
 * More specific, the so-called [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21).
 *
 * To clarify:
 * - [STEP](https://en.wikipedia.org/wiki/ISO_10303) refers to the ISO standard.
 * - [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21) is the actual file.
 *
 * This class will therefore mainly deal with the encoding mechanism that represents data.
 *
 * In layman's terms:
 * An `IFC File` is actually a so-called [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21).
 * This class will open the `IFC File` and go trough each line of the file.
 * The method {@link _generateStepEntityInstance  | generateStepEntityInstance } will create a so-called `step instance` from each line.
 *
 * The parent/super class {@link IfcFile } will take the generated `step instances` and build the relationships between objects.
 * The relationship is expressed in the [IFC2x3 TC1 schema](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/).
 */
var StepFile = /** @class */ (function () {
    /**
     * Builds the {@link entities} object from the config parameter.
     *
     * Creates empty objects for each required entity.
     * The rest (i.e. {@link selectedEntities}) are treated as a `generic entity`.
     *
     * Example:
     * ```javascript
     * this.entityInstances = {
     *      IFCPROPERTYSINGLEVALUE = {},
     *      IFCRELDEFINESBYPROPERTIES = {},
     *      IFCPROPERTYSET = {},
     *      ...
     *      genericEntities = {}
     * }
     * ```
     */
    function StepFile(lines, config) {
        var _this = this;
        /**
         * See {@link _parseStepFile}
         */
        this.parseStepFile = _parseStepFile;
        /**
         * See {@link _generateStepEntityInstance }
         */
        this.generateStepEntityInstance = _generateStepEntityInstance;
        /**
         * See {@link _parseStepInstanceAttributes}
         */
        this.parseStepEntityInstanceAttributes = _parseStepEntityInstanceAttributes;
        this.lines = lines;
        this.entityInstances = {}; // Needs to be initialized as an empty object
        // Config
        this.requiredEntities = config.requiredEntities;
        this.selectedEntities = config.selectedEntities;
        this.selectedPropertySets = config.selectedPropertySets;
        this.allEntities = config.allEntities;
        // Generate an empty object for each required entity
        Object.values(config.requiredEntities).forEach(function (entity) {
            var _a;
            Object.assign(_this.entityInstances, (_a = {}, _a[entity] = {}, _a));
        });
        // The non-required entities (e.g. IfcWall, IfcDoor) are treated as Generic Entity Instances
        Object.assign(this.entityInstances, { genericEntityInstances: {} });
    }
    return StepFile;
}());


;// CONCATENATED MODULE: ./src/ifc-parser/methods/parse-ifc-file.ts
/**
 * Iterates over each line.
 * Only include the so-called __DATA section__.<br>
 * One can assume that each line will contain an equal sign (=).<br>
 *
 *  __Example:__<br>
 * ```#572= IFCDOOR('...');```
 * <br>
 */
function _parseIfcFile() {
    this.parseStepFile();
    this.mapPropertySingleValuesToPropertySet();
    this.mapPropertySetsToGenericEntities();
    return this.entityInstances.genericEntityInstances;
}
// Underscore is used to distinguish this function as a method that belongs to IfcFile


;// CONCATENATED MODULE: ./src/ifc-parser/methods/map-property-single-values-to-property-set.ts
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
function _mapPropertySingleValuesToPropertySet() {
    for (var key in this.entityInstances.IfcPropertySet) {
        var _a = this.entityInstances.IfcPropertySet[key], ifcPropertySetAttributes = _a.attributes.parsed, _b = _a.properties, properties = _b === void 0 ? {} : _b;
        // Example: The property set _Custom_Pset_ has the properties (HasProperties):
        var ifcPropertyLenght = ifcPropertySetAttributes[4].length;
        for (var index = 0; index < ifcPropertyLenght; index++) {
            var _c = (this.entityInstances.IfcPropertySingleValue[
            // Reference to IfcPropertySingleValue entity
            ifcPropertySetAttributes[4][index]] || {}).attributes, _d = _c === void 0 ? {
                parsed: undefined,
            } : _c, ifcPropertySingleValueAttributes = _d.parsed;
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


;// CONCATENATED MODULE: ./src/ifc-parser/methods/map-property-sets-to-generic-entities.ts
/**
 * Map {@link IfcPropertySet | Property Set} to {@link IfcBuildingElement | a generic enitiy} using an {@link IfcRelDefinesByProperties | objectified relationship}.
 * The method {@link _mapPropertySingleValuesToPropertySet } has already created all `Property Set` objects.
 * Now, we need to populate each {@link IfcBuildingElement | generic enitiy} with `Property Sets`.
 */
function _mapPropertySetsToGenericEntities() {
    var _a;
    // For each objectified relationship
    for (var key in this.entityInstances.IfcRelDefinesByProperties) {
        var ifcRelDefinesByPropertiesAttributes = this.entityInstances.IfcRelDefinesByProperties[key].attributes.parsed;
        var _b = this.entityInstances.IfcPropertySet[
        // Reference to IfcPropertySet entity
        ifcRelDefinesByPropertiesAttributes[5]] || {}, _c = _b.ifcPropertySetName, ifcPropertySetName = _c === void 0 ? undefined : _c, _d = _b.ifcPropertySet, ifcPropertySet = _d === void 0 ? undefined : _d;
        if (typeof ifcPropertySet === "undefined") {
            continue;
        }
        if (this.selectedPropertySets.length > 0) {
            if (!this.selectedPropertySets.includes(ifcPropertySetName)) {
                continue;
            }
        }
        var relatedObjectsLenght = ifcRelDefinesByPropertiesAttributes[4].length;
        for (var index = 0; index < relatedObjectsLenght; index++) {
            var _e = (this.entityInstances.genericEntityInstances[
            // Reference to related object (i.e. a generic IFC entity)
            ifcRelDefinesByPropertiesAttributes[4][index]] || {}).properties, properties = _e === void 0 ? undefined : _e;
            if (typeof properties === "undefined") {
                // Ignoring: IfcSite, IfcBuildingStorey, IfcBuilding
                continue;
            }
            Object.assign(properties, (_a = {},
                _a[ifcPropertySetName] = ifcPropertySet,
                _a));
        }
    }
}
// Underscore is used to distinguish this function as a method that belongs to IfcFile


;// CONCATENATED MODULE: ./src/ifc-parser/ifc-parser.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * ## IFC FILE
 *
 * The class {@link StepFile} only handles [ISO 10303-21](https://en.wikipedia.org/wiki/ISO_10303-21).
 * ISO 10303-21 is only responsible for the encoding mechanism that represents data.
 *
 * __IFC2x3 TC1__ is the actual schema of interest.
 * The full specification can be found [here](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/).
 *
 * In summary, this class will only handle parsing related to IFC.
 */
var IfcFile = /** @class */ (function (_super) {
    __extends(IfcFile, _super);
    function IfcFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * See {@link _mapPropertySingleValuesToPropertySet}
         */
        _this.mapPropertySingleValuesToPropertySet = _mapPropertySingleValuesToPropertySet;
        /**
         * See {@link _mapPropertySetsToGenericEntities}
         */
        _this.mapPropertySetsToGenericEntities = _mapPropertySetsToGenericEntities;
        /**
         * See {@link _parseStepFile}
         */
        _this.parseIfcFile = _parseIfcFile;
        return _this;
    }
    return IfcFile;
}(StepFile));


;// CONCATENATED MODULE: ./webpack.ts



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(847);
/******/ })()
;