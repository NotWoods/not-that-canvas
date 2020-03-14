# No, not that Canvas API

Sample project for "Web, Docs, & Canvas" lecture. This was part of a series of mini-lectures for the CPSC 490 class at the University of British Columbia. This lecture was designed to mix a presentation, live coding, and workshop. We instructed students how to read technical documentation and used the Canvas API built into web browsers as an example to work with.

## Branches

- `master`: Completed project
- `day1`: Day 1 starter code (live coding)
- `day2`: Day 2 starter code (workshop)

## Slides

- [Day 1 - Overview of HTML, CSS, and JavaScript](https://docs.google.com/presentation/d/e/2PACX-1vQ21uGQVdwD8rymnvL1Ligj6Rj2wxf4e_BYIJNMrb_SrTVKnQEu3Y27RhzJ6muv0kGj8IWO5s9lOxIg/pub?start=false&loop=false)
- [Day 2 - Canvas API workshop](https://docs.google.com/presentation/d/e/2PACX-1vRZYercSdcS07YlHjlsDKmBkd3grOAlpUR4l9GhGGOE8vhpCDvo44MepKPj2sW4hcm5QjMRI0yCIamw/pub?start=false&loop=false)

## Running the server

If using Max or Linux, you can use your built-in Python installation to run a simple web server.

```sh
cd not-that-canvas
# If Python 2
python -m SimpleHTTPServer
# If Python 3
python3 -m http.server
```

Then open `localhost:8000`.

---

Alternatively, you can install [Node.js](https://nodejs.org/en/) then use it to run a simple web server.

```sh
# After node.js is installed...
cd not-that-canvas
npx serve
```

Then open `localhost:5000`.
