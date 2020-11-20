MyGration Command Line Interface (CLI) - This is a fork of the [Sequelize](https://sequelize.org) project used to manage raw SQL migrations in a scenario where migrations can only be automated in a development environment and need to be audited per release.

This is a very niche CLI, but feel free to use and contribute.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)

## Installation

Install the Sequelize CLI to be used in your project with

```bash
npm install --save-dev mygration
```

Or install it globally with

```bash
npm install --global mygration
```

### Usage

```bash
MyGration CLI [Node: 12.18.3, CLI: 0.1.0, ORM: 6.3.5]

mygration <command>

Commands:
  mygration init             Initializes project
  mygration init:config      Initializes configuration
  mygration init:migrations  Initializes migrations
  mygration migrate          Run pending migrations
  mygration migrate:status   List the status of all migrations
  mygration create           Generates a new migration file                [aliases: migration:generate]
  mygration release          Create a single migration for deploy

Options:
  --version  Show version number                                                               [boolean]
  --help     Show help                                                                         [boolean]
```

## Contributing

All contributions are accepted as a PR.

- You can file issues by submitting a PR (with test) as a test case.
- Implement new feature by submitting a PR
