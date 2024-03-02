# Playwright for Sauce Demo

Repository contains the Playwright tests of the Sauce Demo application.</br>
Project is created to show the way how to handle the multiple users logged in and used in the same test iteratively.

## Required

The application isn't included in the repository, but it's available on https://www.saucedemo.com.

The project uses Node.js library and npm as a package manager.
The file `.env.example` contains all data required to run the tests.

## Installation

1. Make sure you've got Node.js installed
2. Run `npm install`
3. Run `npx playwright install` to install browsers
4. Copy the `.env.example` file to `.env`
5. Run tests using one of the script included in the `package.json`

You can use `npx playwright test` to run tests headless or `npx playwright test --ui` to open the GUI.
When you open the GUI, please expand the projects section and select `setup`, `admin` and `app` project. 
There are 2 projects created with different viewport. You can use flag to run only one of the project: `--project=admin` or `--project=app`.<br>
If not used, both projects are executed.

6. Happy testing! 😄

## Good practices used in the project:

1. DRY - Don't repeat yourself
2. YAGNI  - You ain't gonna need it
3. Page Object Pattern
4. KISS - Keep it simple stupid
5. Framework best practises
6. SCOUT
7. Prettier