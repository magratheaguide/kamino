"use strict";

/* eslint no-undef: "off" */

const path = require("path");
const mandelbrot = require("@frctl/mandelbrot");
const fractal = (module.exports = require("@frctl/fractal").create());
const casual = require("casual");
const simpleSvgPlaceholder = require('@cloudfour/simple-svg-placeholder');

const svgDefaults = {
    text: "img"
};

const handlebars = require('@frctl/handlebars')({
    helpers: {
        placeholderImage: function(block) {
            const options = block.hash || {};
            return simpleSvgPlaceholder(Object.assign({}, svgDefaults, options));
        },
    }
});

const myCustomisedTheme = mandelbrot({
    skin: "white",
    format: "yaml",
    nav: ["docs", "components"],
});

fractal.set("project.title", "Bright Lego Library");

fractal.components.engine(handlebars);
fractal.components.set("path", path.join(__dirname, "/src/components"));
fractal.components.set("default.preview", "@preview");
fractal.components.set("default.status", "wip");
fractal.components.set("default.context", {
    datetime: casual.moment.format("MMM Do, YYYY h:mm A"),
});

fractal.docs.engine(handlebars);
fractal.docs.set("path", path.join(__dirname, "/src/docs"));
fractal.docs.set("default.status", "draft");

fractal.web.set("static.path", path.join(__dirname, "/dist/assets"));
fractal.web.set("builder.dest", path.join(__dirname, "/static-lego-library"));
fractal.web.theme(myCustomisedTheme);
