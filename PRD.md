# Product requirements

## Outcome

Create timestamped local copies of files listed in a JSON backup configuration.

## Requirements

- **PRD-001 - Read backup configuration:** Load `input/input.json` as a JSON list of source and destination path pairs; reject invalid JSON.
  **Verification:** `test/utils/readInputFile.test.js` tests prefixed `PRD-001`.
- **PRD-002 - Create timestamped copies:** Generate a timestamped destination for every configured file and create destination directories before copying.
  **Verification:** `test/app.test.js::PRD-002: copies every file from the input list`; `test/utils/copyFile.test.js` tests prefixed `PRD-002`.
