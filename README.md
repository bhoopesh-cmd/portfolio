# Bhoopesh Chowdary — Portfolio

Interactive portfolio prepared for Cloudflare Pages.

## Cloudflare Pages deployment

Import this repository in Cloudflare Workers & Pages → Create application → Pages.

- Production branch: main
- Framework preset: None
- Build command: exit 0
- Build output directory: dist
- Root directory: leave blank
- Environment variables: none

No npm dependencies, API keys, database, or build step are required.

## Local preview

Run `python3 -m http.server 8080 --directory dist` and open http://localhost:8080.

The video and poster are included in dist. The email link opens an editable message in the visitor’s mail app. Project demos use sample data.

Official deployment guide: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
