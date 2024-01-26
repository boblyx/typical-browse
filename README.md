# Typical Browsing Test Suite
Infinitely looping windows app for testing light computer work and laptop battery life.
## Key Dependencies
- NodeJS 20.x
- Puppeteer
- ESBuild
  
## Development
Install dependences:
```bash
pnpm i .
```

To test run:
```bash
pnpm test
```

## Build
Build the executable:
```bash
pnpm clean ; pnpm build && pnpm compile
```

The `.exe` file should be in the `dist` folder.

## Special Thanks
- Jan for the idea, and providing the list of default urls.
