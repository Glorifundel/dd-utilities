# dd-utilities

This library provides common utilities.

# Publishing to NPM

Before attempting to publish to npm ensure the following has occurred:

- Bump the version in `./src/package.json` ( making sure to follow semver formatting )
- Update the readme `./src/readme.md` #Changelog section
- Run the build command and ensure no build errors occur

```
> npm run build
```

- Run unit tests and ensure no errors occur

```
> npm run test
```

- Copy static files to the `./dist` folder
  - `./src/package.json` > `./dist/package.json`
  - `./src/readme.md` > `./dist/readme.md`
