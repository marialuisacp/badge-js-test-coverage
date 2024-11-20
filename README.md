<br />
<div align="center">
  <img src="image.png" alt="Logo" width="240" height="73">

  <h1 align="center">js-coverage-badges</h1>

  <p align="center">
    This library implements badges for JavaScript test coverage. It supports tests using either Mocha or Jest implementations.    
  </p>
</div>

<!-- CONFIG -->
## Demonstration
<br/>
<div align="center">
<img src="./badges_output/functions.svg" alt="Logo">
<img src="./badges_output/statements.svg" alt="Logo">
<img src="./badges_output/branches.svg" alt="Logo">
<img src="./badges_output/lines.svg" alt="Logo">
</div>
<br/><br/>
<div align="center">
<img src="./badges_output/functions_chart.svg" alt="Logo">
<img src="./badges_output/statements_chart.svg" alt="Logo">
<img src="./badges_output/branches_chart.svg" alt="Logo">
<img src="./badges_output/lines_chart.svg" alt="Logo">
</div>
<br/>

<!-- CONFIG -->
## Get Started

### Requirements 

Configure Jest or Mock.

#### Mocha Configuration

Using:
```
"nyc": "^15.1.0",
```

Add the following to your `package.json`:
```
"nyc": {
    "extension": [
      ".js"
    ],
    "reporter": [
      "json-summary",
      "lcov",
      "text"
    ],
    "include": [
      "src"
    ],
    "exclude": "**/*.mock.js"
  }
```

Run:
```
nyc report --reporter=lcov --reporter=text --reporter=json-summary
```

It is necessary to have the `.nyc_output` folder.

#### Jest Configuration

Run:
```
jest --coverage --coverageReporters="json-summary"
```

It is necessary that the coverage folder exists.

<!-- USAGE -->
## Usage

1. Install the library:
```
npm install 
```

2. Run the command:
```
npx js-coverage-badges {badges_output}
```

**Example:**
```
npx js-coverage-badges badges_output
```

This command will create a folder:

```
└── badges_output
     ├── branches.svg
     ├── branches_chart.svg
     ├── functions.svg
     ├── functions_chart.svg
     ├── lines.svg
     ├── lines_chart.svg
     ├── statements.svg
     └── statements_chart.svg
```

## Modes

By default, the tool generates two images for each test type (statements, functions, branches, and lines): one badge and one donut chart. However, you can choose to generate only the badge or only the chart.

### Badge Mode
To generate only badges (no charts), run:

```
npx js-coverage-badges badges_output mode:badge
```


This will create only the badge images:

```
└── badges_output
     ├── branches.svg
     ├── functions.svg
     ├── lines.svg
     └── statements.svg
```

Add the following code to your README.md to display the badges:

```
**Test Coverage**

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](./badges_output/statements.svg) | ![Branches](./badges_output/branches.svg) | ![Functions](./badges_output/functions.svg) | ![Lines](./badges_output/lines.svg) |
```

The badges will be displayed like this:

**Test Coverage**

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](./badges_output/statements.svg) | ![Branches](./badges_output/branches.svg) | ![Functions](./badges_output/functions.svg) | ![Lines](./badges_output/lines.svg) |


### Chart Mode

To generate only donut charts (no badges), run:

```
npx js-coverage-badges badges_output mode:chart
```

This will create only the chart images:

```
└── badges_output
     ├── branches_chart.svg
     ├── functions_chart.svg
     ├── lines_chart.svg
     └── statements_chart.svg
```

Add the following code to your README.md to display the charts:

```
**Test Coverage**

![Lines](./badges_output/lines_chart.svg) ![Statements](./badges_output/statements_chart.svg)  ![Branches](./badges_output/branches_chart.svg)  ![Functions](./badges_output/functions_chart.svg)  
```

The charts will be displayed like this:

**Test Coverage**

![Functions](./badges_output/functions_chart.svg)
![Statements](./badges_output/statements_chart.svg)
![Branches](./badges_output/branches_chart.svg)
![Lines](./badges_output/lines_chart.svg)


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some Feature'`)
4. Push to the Branch (`git push origin feature/Feature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<!-- CONTACT -->
## Contact

Created by: [@marialuisacp](https://github.com/marialuisacp)  -  [contato@malu.dev](mail:contato@malu.dev)
