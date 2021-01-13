<br />
<p align="center">
  <a href="https://github.com/andrewisen/bim-whale">
    <img src="https://bimvalen.se/assets/img/logos/logo-500x500-alt.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">The BIM Whale Project</h3>

  <p align="center">
    BIMWHALE.js | A simple client-side IFC parser 
    <br />
    <a href="http://github.bimvalen.se/public/"><strong>View the demo »</strong></a>
    <br />
    <br />
    <a href="https://andrewisen.gitbook.io/bim-whale/">Explore docs</a>
    ·
    <a href="https://github.com/andrewisen/bim-whale-ifc-samples">Access IFC sample files</a>
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
      <a href="#about-the-project">About</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
     <li>
      <a href="#getting-started">Usage</a>
      <ul>
        <li><a href="#prerequisites">SimpleWall Sample File</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#extra">Extra</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About

**The BIM Whale** (Swedish: _BIM-valen_) is a project about the Industry Foundation Classes (IFC) format.
The aim of this project is to:

> I: Introduce and explain the basics of IFC schema

> II: Teach people how to parse an IFC file and retrieve basic information

In more specific terms, the goal of this project is to:

> A: Provide a simple and fast IFC parser

> B: Provide learning resources (documentation, videos, power points) to people within the AEC industry

**Goal A** has been realized as **BIMWHALE.js**, i.e. this repo.
BIMWHALE.js is a simple client-side IFC parser built using TypeScript.

Please note that the BIMWHALE.js is **NOT** supposed to be an all singing, all dancing parser.
This project is only looking to parse information that we know exists, so-called `User Defined IFC Property Sets`.

Again, the focus with The BIM Whale Project is to educate people.
The code itself and its functionality are secondary.

Explore the [docs](https://andrewisen.gitbook.io/bim-whale/) for more information.

<!-- GETTING STARTED -->

## FAQ

**Question:** What does _The BIM Whale_ do?

**Answer:** Parse so-called `User Defined IFC Property Sets` from an IFC file

##

**Q:** What does _The BIM Whale_ NOT do?

**A:** Parse entity attributes, parse geometry, follow the EXPRESS standard, etc. etc.

##

**Q:** What is an IFC file?

**A:** Industry Foundation Classes (IFC) is a standardized, digital description of a BIM model. See [IFC](https://en.wikipedia.org/wiki/Industry_Foundation_Classes) for more information.

##

**Q:** What is a STEP file?

**A:** A STEP-File is the format IFC uses. See [ISO 10303-21](https://en.wikipedia.org/wiki/ISO_10303-21) for more information

##

**Q:** Is this code "hand made"?

**A:** Yes, the code is hand made. The parsing is not derived from an EXPRESS definition.

##

**Q:** Is the code ready for production?

**A:** No, not yet. See [open issues](/issues) for more info

## Getting Started

1. A compiled _JS bundle file_ is available here:

[https://cdn.jsdelivr.net/gh/andrewisen/bim-whale/dist/bundle.min.js](https://cdn.jsdelivr.net/gh/andrewisen/bim-whale/dist/bundle.min.js)

2. Add it to your project

```html
<script src="https://cdn.jsdelivr.net/gh/andrewisen/bim-whale/dist/bundle.min.js"></script>
```

3. Use the FileReader API and create a new `IfcFile` object

```javascript
// The libary is called: BIMWHALE
var fileReader = new FileReader();
fileReader.onload = function (e) {
    const lines = e.target.result.split(/\r\n|\n/);
    let ifcFile = new BIMWHALE.IfcFile(lines, config);
    ifcFile.parseIfcFile();
};
fileReader.readAsText(file);
```

4. See the docs for more information: [docs.bimvalen.se](docs.bimvalen.se)

## Local Development

These next steps will guide you to set up your own development platform.

### Prerequisites

This repository uses Deno as the runtime for TypeScript.

-   Install Deno.
    See instruction at [https://deno.land](https://deno.land)

### Installation

1. Clone the repo

    ```shell
    git clone https://github.com/andrewisen/bim-whale.git
    ```

2. Replace the following files with your own content.

-   `index.ts`
-   `src/config.ts`

The easiest approach is to copy content of the `example.NAME.ts` file.

**In other words:**
Replace `index.ts` with the content inside `example.index.ts`.

4. Make sure you update `src/config.ts` and provide a correct **filePath**.
   You can download some sample files here: [https://github.com/andrewisen/bim-whale-ifc-samples](https://github.com/andrewisen/bim-whale-ifc-samples)

5. Check if Deno is working

    ```shell
    deno run --allow-read checkDeno.ts
    ```

Any errors until this point are likely due to Deno.
Submit an issue if have any problems.

<!-- USAGE EXAMPLES -->

## Usage

-   Run the app with:

```shell
   deno run --allow-read index.ts
```

### SimpleWall Sample File

Download the `SimpleWall Sample File` [here](https://github.com/andrewisen/bim-whale-ifc-samples/tree/main/SimpleWall).
The sample consist of:

-   A wall
-   A door

Here's a screenshot:

![Screenshot](https://raw.githubusercontent.com/andrewisen/bim-whale-ifc-samples/main/SimpleWall/Screenshots/Screenshot_2.png)

The IFC file has a **Property Set** called `Custom_Pset`.
Please note that the file only contains dummy data.

![Screenshot](https://raw.githubusercontent.com/andrewisen/bim-whale-ifc-samples/main/SimpleWall/Screenshots/Screenshot_21.png)

Make sure to update `src/config.ts` and provide a correct **filePath**.
You should get the following result:

```javascript
{
  TypeMark: "_TYPE-MARK_",
  Keynote: "_KEYNOTE_",
  StoreyName: "Level: Level 1",
  TypeDescription: "_DESCRIPTION_",
  StatusConstruction: "New Construction",
  NetArea: "14.04739",
  Height: "4000.",
  Width: "200.",
  Length: "4000.",
  Hyperlink: "_URL_"
}
{
  TypeMark: "20",
  Keynote: "--KEYNOTE--",
  StoreyName: "Level: Level 1",
  TypeDescription: "--DESCRIPTION--",
  StatusConstruction: "New Construction",
  NetArea: "3.18957899999998",
  Height: "2134.",
  Width: "915.",
  SillHeight: "0.",
  Hyperlink: "--URL--"
}
```

**In summary:**
We have performed a simple parsing.

We have only included `walls` and `doors` in our config file. See:
`const selectedEntities: string[] = ["IFCDOOR", "IFCWALLSTANDARDCASE"];`

**TODO**

<!-- ROADMAP -->

## Roadmap

This project is still in it's early development. And yes, it still has some bugs.
Please be patience!

See the [open issues](/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

This project is still in it's early development.
But, any contributions you make are **greatly appreciated**.

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

-   Email: [andre.wisen@gmail.com](mailto:andre.wisen@gmail.com])
-   LinkedIn: [https://linkedin.com/in/andrewisen/](https://linkedin.com/in/andrewisen/)

<!-- ACKNOWLEDGEMENTS -->

## Extra

Not what you're looking for?
Check out these projects instead!

-   [IFC.js](https://github.com/agviegas/IFC.js)
-   [IfcOpenShell](https://github.com/IfcOpenShell/IfcOpenShell)
-   [xBIM](https://github.com/xBimTeam)
-   [IFC++](https://github.com/ifcquery/ifcplusplus)
