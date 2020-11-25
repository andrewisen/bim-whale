<br />
<p align="center">
  <a href="https://github.com/andrewisen/bim-whale">
    <img src="https://bimvalen.se/assets/img/logos/logo-500x500-alt.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BIM Whale</h3>

  <p align="center">
    A simple client-side IFC parser 
    <br />
    <a href="http://github.bimvalen.se/docs/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.bimvalen.se/public/">View Demo</a>
    ·
    <a href="https://github.com/andrewisen/bim-whale/issues">Report Bug</a>
    ·
    <a href="https://github.com/andrewisen/bim-whale/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#extra">Extra</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About

The BIM Whale (Swedish: _BIM-valen_) is simple client-side IFC parser built using TypeScript.
The aim of this project is to:

> Teach people how to work with IFC

In more specific terms, the goal of this project is to:

> Provide a simple and fast IFC parser that people can learn from

The BIM Whale is **NOT** supposed to be an all singing, all dancing parser.
Instead, the BIM Whale is only looking to parse information (Property Sets) that we know exists.

Explore the [docs/wiki](http://github.bimvalen.se/docs/) for more information.

<!-- GETTING STARTED -->

## Getting Started

This repository contains only the TypeScript source.
A compiled _JS bundle file_ is available here:
`https://github.bimvalen.se/dist/bundle.min.js`
Please note that the file **only works for the demo**!

The following steps will guide you to set up your own development platform.

### Prerequisites

This repository uses Deno as the runtime for TypeScript.

-   Install Deno. See instruction at [https://deno.land](https://deno.land)

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/your_username_/Project-Name.git
    ```

2. Replace the following files with your own content.

-   `index.ts`
-   `src/config.ts`

The easiest approach is to copy content of the `example.NAME.ts` file.

**In other words:**
Replace `index.ts` with the content inside `example.index.ts`.

4. Make sure you update `src/config.ts` and provide a correct **filePath**.
   You can download the sample file here: [https://github.com/andrewisen/bim-whale-samples](https://github.com/andrewisen/bim-whale-samples)
5. Check if Deno is working

    ```sh
    deno run --allow-read checkDeno.ts
    ```

Any errors until this point are likely due to Deno.

<!-- USAGE EXAMPLES -->

## Usage

You can download the IFC Samples here: [https://github.com/andrewisen/bim-whale-samples](https://github.com/andrewisen/bim-whale-samples)

Run the app with:

```sh
   deno run --allow-read index.ts
```

Or use the demo: [https://github.bimvalen.se/public/](https://github.bimvalen.se/public/)

### SimpleWall Sample File

Download the from [here](https://github.com/andrewisen/bim-whale-samples/tree/main/SimpleWall).
The sample consist of:

-   A wall
-   A door

Here's a screenshot:
![Screenshot](https://raw.githubusercontent.com/andrewisen/bim-whale-samples/main/SimpleWall/Screenshots/Screenshot_2.png)

The IFC file has a **Property Set** called `Custom_Pset`.
Custom_Pset only contains dummy data.

![Screenshot](https://raw.githubusercontent.com/andrewisen/bim-whale-samples/main/SimpleWall/Screenshots/Screenshot_21.png)

Make sure you to update `src/config.ts` and provide a correct **filePath**.
When we run the app, we get the following result:

```javascript
{
  TypeMark: "IFCLABEL(_TYPE-MARK_)",
  Keynote: "IFCLABEL(_KEYNOTE_)",
  StoreyName: "IFCTEXT(Level: Level 1)",
  TypeDescription: "IFCTEXT(_DESCRIPTION_)",
  StatusConstruction: "IFCLABEL(New Construction)",
  NetArea: "IFCAREAMEASURE(14.04739)",
  Height: "IFCLENGTHMEASURE(4000.)",
  Width: "IFCLENGTHMEASURE(200.)",
  Length: "IFCLENGTHMEASURE(4000.)",
  Hyperlink: "IFCTEXT(_URL_)"
}
{
  TypeMark: "IFCLABEL(20)",
  Keynote: "IFCLABEL(--KEYNOTE--)",
  StoreyName: "IFCTEXT(Level: Level 1)",
  TypeDescription: "IFCTEXT(--DESCRIPTION--)",
  StatusConstruction: "IFCLABEL(New Construction)",
  NetArea: "IFCAREAMEASURE(3.18957899999998)",
  Height: "IFCLENGTHMEASURE(2134.)",
  Width: "IFCLENGTHMEASURE(915.)",
  SillHeight: "IFCLENGTHMEASURE(0.)",
  Hyperlink: "IFCTEXT(--URL--)"
}
```

In summary: We have parsed the IFC file looking only for Doors and Walls.

Again, see the config file: `const selectedEntities: string[] = ["IFCDOOR", "IFCWALLSTANDARDCASE"];`
In the end we simply print out the **Property Set** `Custom_Pset`.

**TODO**

<!-- ROADMAP -->

## Roadmap

This project is still in it's early development. Yes, it still has some bugs.
Please be patience!

See the [open issues](/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

-   Primary email: [kontakt@andrewisen.se](mailto:kontakt@andrewisen.se)
-   Secondary email: [andre.wisen@gmail.com](mailto:andre.wisen@gmail.com])
-   LinkedIn: [https://linkedin.com/in/andrewisen/](https://linkedin.com/in/andrewisen/)

<!-- ACKNOWLEDGEMENTS -->

## Extra

Not what you're looking for?
Check out these projects instead!

-   [IFC.js](https://github.com/agviegas/IFC.js)
-   [IfcOpenShell](https://github.com/IfcOpenShell/IfcOpenShell)
-   [xBIM](https://github.com/xBimTeam)
