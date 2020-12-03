<br />
<p align="center">
  <a href="https://github.com/andrewisen/bim-whale">
    <img src="https://bimvalen.se/assets/img/logos/logo-500x500-alt.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Welcome to the Docs / Wiki</h3>

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

This site is built using [TypeDoc](https://typedoc.org).
The content is automatically generated from the TypeScript source code.

### Why TypeScript?

I prefer TS for one simple reason:

> Developer tooling support / Enhanced IDE support

See: [TypeScript in 100 Seconds](https://www.youtube.com/watch?v=zQnBQ4tB3ZA)

In my option, TS makes it much easier to work with IFC.

## Where should I start?

Start by looking at the [stepFile Class](https://github.bimvalen.se/docs/classes/stepfile.html).
This is the base and deals exclusively with [ISO 10303](https://en.wikipedia.org/wiki/ISO_10303).

The class only parse a so-called [STEP-file](https://en.wikipedia.org/wiki/ISO_10303-21).
The [IFC schema](https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/) is not used at this point.

In other words: The class doesn't care what kind of data the file contains. It will parse file and treat is as generic data.

### Example

Take a look at the example file [SimpleWall](https://github.com/andrewisen/bim-whale-ifc-samples/tree/main/SimpleWall/IFC).
Let's ignore the IFC schema and just treat the data as generic information. Here's an extract of the file:

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
Please note that this can simply be referred to as an _entity_ or _instance_.

The encoding of this data follows this format:

-   Instance name
-   Entity name
-   Attributes

Let's examine the first line in the example above:

-   Instance name: `#294`
-   Entity name: `IFCPROPERTYSINGLEVALUE`
-   Attributes: `'Description',$,IFCTEXT('_DESCRIPTION_'),$`

The terminology above will be used throughout this site.

The "method" [\_generateStepInstance](https://github.bimvalen.se/docs/globals.html#_generatestepinstance) is used to build a entity instance.

**MORE INFO WILL COME**

## But, I don't understand

No worries. The goal with the BIM Whale is to teach people how to work with IFC.
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
