<br />
<p align="center">
  <a href="https://github.com/andrewisen/bim-whale">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BIM Whale</h3>

  <p align="center">
    A simple client-side IFC parser 
    <br />
    <a href="https://github.com/andrewisen/bim-whale"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/andrewisen/bim-whale">View Demo</a>
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

The BIM Whale (Swedish:_BIM-valen_) is client-side IFC parser built using TypeScript.
The aim of this project is to:

> Teach people how to work with IFC

In more specific terms, the goal of this project is to:

> Provide a simple and fast IFC parser that people can learn from

The BIM Whale is **NOT** supposed to be an all singing, all dancing parser.
Instead, the BIM Whale is only looking to parse information that we know exists.

<!-- GETTING STARTED -->

## Getting Started

This repository contains only the TypeScript source.
If you're looking for a compiled _JS Bundle_ file, then check here: TODO

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
In other words: Replace `index.ts` with the content in `example.index.ts`.

3. Check if Deno is working
    ```sh
    deno run --allow-read checkDeno.ts
    ```

Any errors are likely due to Deno and its' installation.

<!-- USAGE EXAMPLES -->

## Usage

You can download the IFC Samples here:

```sh
   deno run --allow-read index.ts
```

<!-- ROADMAP -->

## Roadmap

This project is still in it's early development. Please be patience!
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

-   Website: [https://andrewisen.se/](https://andrewisen.se/)
-   LinkedIn: [https://linkedin.com/in/andrewisen/](https://linkedin.com/in/andrewisen/)
-   Primary email: [kontakt@andrewisen.se](mailto:kontakt@andrewisen.se)
-   Secondary email: [andre.wisen@gmail.com](mailto:andre.wisen@gmail.com])

<!-- ACKNOWLEDGEMENTS -->

## Extra

Not what you're looking for?
Check out these projects instead!

-   [IFC.js](https://github.com/agviegas/IFC.js)
-   [IfcOpenShell](https://github.com/IfcOpenShell/IfcOpenShell)
-   [xBIM](https://github.com/xBimTeam)
