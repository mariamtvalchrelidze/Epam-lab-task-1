# SauceDemo Login Page Tests

A program that tests the login page of [https://www.saucedemo.com](https://www.saucedemo.com).

## Tests
**UC-1** Tests Login form with empty credentials

**UC-2** Tests Login form with credentials by passing Username

**UC-3** Tests Login form with credentials by passing Username & Password

## Installation
```bash
git clone https://github.com/mariamtvalchrelidze/Epam-project-wdio.git
cd Epam-project-wdio

```

```bash
npm install
```
## Execution

```bash
npm run test
```
or

```bash
npm  test
```
## Environment
Works on Chrome and Microsoft Edge.

## Data
Credentials Data is exported from credentials.js

Error Messages Data is exported from messages.js

## Process
Once test case is executed, the program logs info and results in console and takes screenshots. Screenshots are taken before execution, so the input data is visible, and after execution so the result is visible. Screenshots directory stores separate directories for each session.