"use strict";

/* eslint no-undef: "off" */

const path = require("path");
const fractal = (module.exports = require("@frctl/fractal").create());
const theme = require("@frctl/mandelbrot");
const simpleSvgPlaceholder = require("@cloudfour/simple-svg-placeholder");

const svgDefaults = {
    text: "img",
};

const handlebars = require("@frctl/handlebars")({
    helpers: {
        placeholderImage: function (block) {
            const options = block.hash || {};
            return simpleSvgPlaceholder(
                Object.assign({}, svgDefaults, options)
            );
        },
    },
});

const themeCustomize = theme({
    format: "yaml",
    nav: ["search", "docs", "components"],
    panels: [
        "html",
        // "view",
        // "context",
        // "resources",
        // "info",
        "notes",
    ],
    skin: "white",
});

fractal.set("project.title", "NAME Lego Library");

fractal.components.engine(handlebars);
fractal.components.set("path", path.join(__dirname, "/src/components"));
fractal.components.set("default.preview", "@preview");
fractal.components.set("default.status", "wip");

fractal.docs.engine(handlebars);
fractal.docs.set("path", path.join(__dirname, "/src/docs"));
fractal.docs.set("default.status", "draft");

fractal.web.set("static.path", path.join(__dirname, "/dist/assets"));
fractal.web.set("builder.dest", path.join(__dirname, "/static/lego-library"));
fractal.web.theme(themeCustomize);
