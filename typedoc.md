<br />
<p align="center">
  <a href="https://github.com/andrewisen/bim-whale">
    <img src="https://bimvalen.se/assets/img/logos/logo-500x500-alt.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Welcome to the BIMWHALE.js docs</h3>

  <p align="center">
    A simple client-side IFC parser 
    <br />
    <a href="https://github.com/andrewisen/bim-whale/"><strong>GitHub repository »</strong></a>
    <br />
    <br />
    <a href="https://github.com/andrewisen/bim-whale-ifc-samples">Access IFC sample files</a>
    ·
    <a href="https://github.bimvalen.se/public/">View Demo</a>
    ·
    <a href="https://github.com/andrewisen/bim-whale/issues">Report Bug</a>
    ·
    <a href="https://github.com/andrewisen/bim-whale/issues">Request Feature</a>
  </p>
</p>

## Introduction

The primary docs for **The BIM Whale Project** can be found at:
[https://andrewisen.gitbook.io/bim-whale/](https://andrewisen.gitbook.io/bim-whale/)

The purpose of this website is to provide additional documentation.
This site will focus on the code itself; the classes and methods used.

Please note that actual source code is **NOT** included here.
This site is built using [TypeDoc](https://typedoc.org).
The content is automatically generated from the TypeScript source code.

Again, to clarify:
This documentation will go into more details.
It will (try to) explain how the code works.

If you feel overwheled by this, then head back to the [original documentations](https://andrewisen.gitbook.io/bim-whale/).

## Code Architecture

### Folder Structure

The overall folder structure is shown below.

```text
bim-whale
├───dist
└───src
    ├───utils
    ├───config
    ├───step-parser
    │   └───step-parser.ts
    └───ifc-parser
        └───ifc-parser.ts
```

Please note that the `ifc-parser` is an extensions of the `step-parser`.
Each method is put inside it's own file to keep things more organized.

```text
bim-whale
└───src
    └───ifc-parser
       ├───ifc-parser.ts
       └───methods
            ├───parse-ifc-file.ts
            ├───map-property-single-values-to-property-set.ts
            └───map-property-sets-to-generic-entities.ts
```

### Getting started

-   A `config` object is created.

The main repository uses a [config file](https://github.com/andrewisen/bim-whale/blob/b8427d3/src/config/example.config.ts).
The public demo creates a [config object](https://github.com/andrewisen/bim-whale-demo/blob/main/public/assets/js/handle-ifc-file.js) inside the function.

Both approaches are valid.

-   A new `IfcFile` object is created

```javascript
let ifcFile = new BIMWHALE.IfcFile(lines, config);
```

The class `IfcFile` is an extension of the class `StepFile`.
In other words, the `IfcFile`'s constructor is inherited from the [StepFile's constructor](https://github.bimvalen.se/docs/classes/stepfile.html#constructor).

-   The `IfcFile object` parse an IFC file and return `Property Sets` for each object (IFC Entity)

### In more detail

1. A `config object` is provided
2. A new [IfcFile object](https://github.bimvalen.se/docs/classes/ifcfile.html) is created
3. The [constructor](https://github.bimvalen.se/docs/classes/stepfile.html#constructor) handle the aforementioned `config object`
4. [parseStepFile()](https://github.bimvalen.se/docs/globals.html#_parsestepfile) iterates over **each line** and calls [generateStepInstance()](https://github.bimvalen.se/docs/globals.html#_generatestepinstance)
5. [generateStepInstance()](https://github.bimvalen.se/docs/globals.html#_generatestepinstance) generates a so-called `STEP Instance` object

In this particular case, a `STEP Instance` object is one of the following

-   [IfcPropertySet](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifckernel/lexical/ifcpropertyset.htm)
-   [IfcPropertySingleValue](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertysinglevalue.htm)
-   [IfcRelDefinesByProperties](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifckernel/lexical/ifcreldefinesbyproperties.htm)
-   [IfcBuildingElement](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifcproductextension/lexical/ifcbuildingelement.htm), which is denoted as a `genericEntity`

6. [parsestepinstanceattributes()](https://github.bimvalen.se/docs/globals.html#_parsestepinstanceattributes) is used to aid the aforementioned `generateStepInstance()`.
7. [mapPropertySingleValuesToPropertySet()](https://github.bimvalen.se/docs/classes/ifcfile.html#mappropertysinglevaluestopropertyset) maps a [IfcPropertySingleValue](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertysinglevalue.htm) to a [IfcPropertySet](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifckernel/lexical/ifcpropertyset.htm)
8. [mapPropertySetsToGenericEntities()](https://github.bimvalen.se/docs/classes/ifcfile.html#mappropertysetstogenericentities) maps a [IfcPropertySet](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifckernel/lexical/ifcpropertyset.htm) to a [IfcBuildingElement/GenericEntity](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/FINAL/HTML/ifcproductextension/lexical/ifcbuildingelement.htm) using an [objectified relationship (IfcRelDefinesByProperties)](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifckernel/lexical/ifcreldefinesbyproperties.htm)

### Why TypeScript?

I prefer TS for one simple reason:

> Developer tooling support / Enhanced IDE support

See: [TypeScript in 100 Seconds](https://www.youtube.com/watch?v=zQnBQ4tB3ZA)

In my option, TS makes it much easier to work with IFC.

### A word about performance

-   Avoid unwanted loops
-   Avoid nested loops
-   Avoid using try-catch-finally
-   Set correct variable scope
-   Use modern ES6 features (e.g. Object Destructuring, Spread Operator, template literals)

**TODO**

## Where should I start?

Start by looking at the [stepFile Class](https://github.bimvalen.se/docs/classes/stepfile.html).
This is the base and deals with [STEP / ISO 10303](https://en.wikipedia.org/wiki/ISO_10303).

In other words:

-   The [stepFile Class](https://github.bimvalen.se/docs/classes/stepfile.html) handles the parsing of a [STEP file](https://en.wikipedia.org/wiki/ISO_10303-21).
-   The [IfcFile Class](https://github.bimvalen.se/docs/classes/ifcfile.html) builds the relationship between objects (IFC Entites) according to the [IFC Schema](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/).

### Example

Let's take a look at the example file [SimpleWall](https://github.com/andrewisen/bim-whale-ifc-samples/tree/main/SimpleWall/IFC).
Here's an extract of the file:

```javascript
#297= IFCPROPERTYSINGLEVALUE('Description',$,IFCTEXT('_DESCRIPTION_'),$);
#298= IFCPROPERTYSINGLEVALUE('Fire Rating',$,IFCTEXT('_FIRE-RATING_'),$);
#299= IFCPROPERTYSINGLEVALUE('Keynote',$,IFCTEXT('_KEYNOTE_'),$);
#300= IFCPROPERTYSINGLEVALUE('Manufacturer',$,IFCTEXT('_MANUFACTURER_'),$);
#301= IFCPROPERTYSINGLEVALUE('Model',$,IFCTEXT('MODEL'),$);
#302= IFCPROPERTYSINGLEVALUE('Type Comments',$,IFCTEXT('_TYPE-COMMENTS_'),$);
#303= IFCPROPERTYSINGLEVALUE('Type Mark',$,IFCTEXT('_TYPE-MARK_'),$);
#304= IFCPROPERTYSINGLEVALUE('Type Name',$,IFCTEXT('Bearing Wall'),$);
#305= IFCPROPERTYSINGLEVALUE('URL',$,IFCTEXT('_URL_'),$);
#306= IFCPROPERTYSINGLEVALUE('Family Name',$,IFCTEXT('Basic Wall'),$);
```

Each line consist of an **entity instance**.
This can simply be referred to as an _entity_ or an _instance_ ("entity instance" is a long word).

Each line contains the following:

-   Instance name
-   Entity name
-   Attributes

Let's examine the **first line** in the example above:

-   Instance name: `#294`
-   Entity name: `IFCPROPERTYSINGLEVALUE`
-   Attributes: `'Description',$,IFCTEXT('_DESCRIPTION_'),$`

The terminology above will be used throughout this site.

The method [generateStepInstance()](https://github.bimvalen.se/docs/globals.html#_generatestepinstance) is used to build an **entity instance**.

In other words: [stepFile Class](https://github.bimvalen.se/docs/classes/stepfile.html) will use [generateStepInstance()](https://github.bimvalen.se/docs/globals.html#_generatestepinstance) to generate each IFC Entity.

**MORE INFO WILL COME**

## But, I don't understand

No worries. The goal with The BIM Whale is to teach people how to work with IFC.
However, the learning resources are not ready yet. Have some patience!

## Contact

-   Primary email: [kontakt@andrewisen.se](mailto:kontakt@andrewisen.se)
-   Secondary email: [andre.wisen@gmail.com](mailto:andre.wisen@gmail.com])
-   LinkedIn: [https://linkedin.com/in/andrewisen/](https://linkedin.com/in/andrewisen/)

## Extra

Not what you're looking for?
Check out these projects instead!

-   [IFC.js](https://github.com/agviegas/IFC.js)
-   [IfcOpenShell](https://github.com/IfcOpenShell/IfcOpenShell)
-   [xBIM](https://github.com/xBimTeam)
