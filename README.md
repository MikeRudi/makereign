# makereign

## Cache busting

A GitHub Actions workflow automatically updates `version.txt` on every
push to `main`. The file contains a simple integer that increments by one
with each commit. Webflow’s client script fetches this value and appends
`?v=<number>` to the `quarterly.js` URL, ensuring visitors always receive
the latest version from jsDelivr.

You can review the workflow at `.github/workflows/bump-version.yml` and
customise it if you prefer a SHA or other scheme.
