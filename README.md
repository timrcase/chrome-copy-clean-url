# Copy Clean URL

A Chrome extension that copies a clean, tracking-free URL from the current tab to your clipboard with a single keyboard shortcut.

## Features

- Strips common tracking parameters (UTM tags, `fbclid`, `gclid`, etc.)
- Confirms the copy with a toast notification
- Keyboard shortcut: **⌘+Shift+C** (Mac) / **Ctrl+Shift+C** (Windows/Linux)

## Installation & Setup

Install from the [Chrome Web Store](#).

Set the keyboard shortcut:
  - Go to `chrome://extensions/shortcuts`
  - Find **Copy Clean URL** and assign **⌘+Shift+C**

## Releasing

Releases are triggered by pushing a git tag. This will automatically build a zip of the `src/` folder and attach it to a GitHub Release.

1. Commit and push your changes to `main`:
```bash
   git add .
   git commit -m "commit message"
   git push
```

2. Tag the commit and push the tag:
```bash
   git tag v1.0
   git push origin v1.0
```

The GitHub Actions workflow will then build `copy-clean-url.zip` and attach it to a new release at `https://github.com/timrcase/chrome-copy-clean-url/releases`.

## Privacy

This extension does not collect or transmit any data. See [PRIVACY.md](PRIVACY.md) for details.