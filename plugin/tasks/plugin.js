'use strict';
var Stream = require('readable-stream');
var wf = require('./util/util');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var _s = require('underscore.string');
var gutil = require('gulp-util');


function gulpFontIcon(options) {
    var o = options;
    o.dest = options.dest || "";
    o.order = optionToArray(options.order, wf.fontFormats);
    o.addLigatures = options.ligatures === true;
    o.styles = optionToArray(options.styles, 'font,icon');
    o.destCss = options.destCss || options.dest;
    o.destHtml = options.destHtml || o.destCss;
    o.htmlDemo = true;
    o.types = options.formats;
    o.embed = options.embed === true ? ['woff'] : optionToArray(options.embed, false);
    o.template = options.template;
    o.syntax = options.syntax || 'bem';
    o.templateOptions = options.templateOptions || {};
    o.stylesheet = options.stylesheet || path.extname(options.template).replace(/^\./, '') || 'css';
    o.htmlDemoTemplate = options.htmlDemoTemplate;
    o.destHtml = options.destHtml || o.destCss;
    o.fontfaceStyles = has(o.styles, 'font');
    o.baseStyles = has(o.styles, 'icon');
    o.extraStyles = has(o.styles, 'extra');
    o.fontBaseName = options.fontName || "icons";
    o.fontFilename = template(options.fontFilename || o.fontBaseName, o);
    o.ie7 = options.ie7 === true;
    /**
     * Generate HTML demo page
     *
     * @param {Function} done
     */
    function generateDemoHtml() {
        if (!o.htmlDemo) {
            done();
            return;
        }

        // HTML should not contain relative paths
        // If some styles was not included in CSS we should include them in HTML to properly render icons
        var relativeRe = new RegExp(_s.escapeRegExp(o.relativeFontPath), 'g');
        var htmlRelativeFontPath = normalizePath(path.relative(o.destHtml, o.dest));
        var context = _.extend(o, {
            fontSrc1: o.fontSrc1.replace(relativeRe, htmlRelativeFontPath),
            fontSrc2: o.fontSrc2.replace(relativeRe, htmlRelativeFontPath),
            fontfaceStyles: true,
            baseStyles: true,
            extraStyles: false,
            iconsStyles: true,
            stylesheet: 'css'
        });
        var htmlStyles = renderTemplate(o.cssTemplate, context);
        var htmlContext = _.extend(context, {
            styles: htmlStyles
        });

        // Generate HTML
        var demoTemplate = readTemplate(o.htmlDemoTemplate, 'demo', '.html');
        var demo = renderTemplate(demoTemplate, htmlContext);

        // Save file
        //fs.writeFileSync(getDemoFilePath(), demo);
        return demo;
    }

    /**
     * Generate CSS
     *
     * @param {Function} done
     */
    function generateStylesheet() {
        // Relative fonts path
        if (!o.relativeFontPath) {
            o.relativeFontPath = path.relative(o.destCss, o.dest);
        }
        o.relativeFontPath = normalizePath(o.relativeFontPath);
        // Generate font URLs to use in @font-face
        var fontSrcs = [[], []];
        o.order.forEach(function (type) {
            if (!has(o.types, type)) return;
            wf.fontsSrcsMap[type].forEach(function (font, idx) {
                if (font) {
                    fontSrcs[idx].push(generateFontSrc(type, font));
                }
            });
        });

        // Convert them to strings that could be used in CSS
        var fontSrcSeparator = option(wf.fontSrcSeparators, o.stylesheet);
        fontSrcs.forEach(function (font, idx) {
            // o.fontSrc1, o.fontSrc2
            o['fontSrc' + (idx + 1)] = font.join(fontSrcSeparator);
        });
        o.fontRawSrcs = fontSrcs;

        // Convert codepoints to array of strings
        var codepoints = [];
        var glyphs = [];
        _.forOwn(o.codepoints, function (codepoint, name) {
            codepoints.push(codepoint.toString(16));
            glyphs.push(name);
        });

        o.codepoints = codepoints;
        o.glyphs = glyphs;
        // Prepage glyph names to use as CSS classes
        o.glyphs = _.map(o.glyphs, classnameize);

        // Read JSON file corresponding to CSS template
        var templateJson = readTemplate(o.template, o.syntax, '.json', true);
        if (templateJson) o = _.extend(o, JSON.parse(templateJson.template));

        // Now override values with templateOptions
        if (o.templateOptions) o = _.extend(o, o.templateOptions);

        // Generate CSS
        var ext = path.extname(o.template) || '.css';  // Use extension of o.template file if given, or default to .css
        o.cssTemplate = readTemplate(o.template, o.syntax, ext);
        var cssContext = _.extend(o, {
            iconsStyles: true
        });

        var css = renderTemplate(o.cssTemplate, cssContext);

        // Fix CSS preprocessors comments: single line comments will be removed after compilation
        if (has(['sass', 'scss', 'less', 'styl'], o.stylesheet)) {
            css = css.replace(/\/\* *(.*?) *\*\//g, '// $1');
        }

        return css;
    }

    /**
     * Return path of HTML demo file or `null` if its generation was disabled.
     *
     * @return {String}
     */
    function getDemoFilePath() {
        if (!o.htmlDemo) return null;
        return path.join(o.destHtml, o.fontBaseName + '.html');
    }

    /**
     * Return a specified option if it exists in an object or `_default` otherwise
     *
     * @param {Object} map Options object
     * @param {String} key Option to find in the object
     * @return {Mixed}
     */
    function option(map, key) {
        if (key in map) {
            return map[key];
        }
        else {
            return map._default;
        }
    }

    /**
     * Return path of CSS file.
     *
     * @return {String}
     */
    function getCssFilePath() {
        var cssFilePrefix = option(wf.cssFilePrefixes, o.stylesheet);
        return path.join(o.destCss, cssFilePrefix + o.fontBaseName + '.' + o.stylesheet);
    }

    /**
     * Check if a value exists in an array
     *
     * @param {Array} haystack Array to find the needle in
     * @param {Mixed} needle Value to find
     * @return {Boolean} Needle was found
     */
    function has(haystack, needle) {
        return haystack.indexOf(needle) !== -1;
    }

    /**
     * Render template with error reporting
     *
     * @param {Object} template {filename: 'Template filename', template: 'Template code'}
     * @param {Object} context Template context
     * @return {String}
     */
    function renderTemplate(template, context) {
        try {
            return _.template(template.template, context);
        }
        catch (e) {
            //grunt.fail.fatal('Error while rendering template ' + template.filename + ': ' + e.message);
            console.error('Error while rendering template ' + template.filename + ': ' + e.message);
        }
    }

    /**
     * Read the template file
     *
     * @param {String} template Template file path
     * @param {String} syntax Syntax (bem, bootstrap, etc.)
     * @param {String} ext Extention of the template
     * @return {Object} {filename: 'Template filename', template: 'Template code'}
     */
    function readTemplate(template, syntax, ext, optional) {
        var filename = template
                ? path.resolve(template.replace(path.extname(template), ext))
                : path.join(__dirname, 'templates/' + syntax + ext)
            ;
        if (fs.existsSync(filename)) {
            return {
                filename: filename,
                template: fs.readFileSync(filename, 'utf8')
            };
        }
        else if (!optional) {
            //return grunt.fail.fatal('Cannot find template at path: ' + filename);
            console.error('Cannot find template at path: ' + filename);
        }
    }

    /**
     * Prepare string to use as CSS class name
     *
     * @param {String} str
     * @return {String}
     */
    function classnameize(str) {
        return _s.trim(str).replace(/\s+/g, '-');
    }

    /**
     * Generate URL for @font-face
     *
     * @param {String} type Type of font
     * @param {Object} font URL or Base64 string
     * @return {String}
     */
    function generateFontSrc(type, font) {
        var filename = template(o.fontFilename + font.ext, o);

        var url;
        if (font.embeddable && has(o.embed, type)) {
            url = embedFont(path.join(o.dest, filename));
        }
        else {
            url = o.relativeFontPath + filename;
            if (o.addHashes) {
                if (url.indexOf('#iefix') === -1) {  // Do not add hashes for OldIE
                    // Put hash at the end of an URL or before #hash
                    url = url.replace(/(#|$)/, '?' + o.hash + '$1');
                }
            }
        }

        var src = 'url("' + url + '")';
        if (font.format) src += ' format("' + font.format + '")';

        return src;
    }

    /**
     * Basic template function: replaces {variables}
     *
     * @param {Template} tmpl Template code
     * @param {Object} context Values object
     * @return {String}
     */
    function template(tmpl, context) {
        return tmpl.replace(/\{([^\}]+)\}/g, function (m, key) {
            return context[key];
        });
    }
    /**
     * Append a slash to end of a filepath if it not exists and make all slashes forward
     *
     * @param {String} filepath File path
     * @return {String}
     */
    function normalizePath(filepath) {
        if (!filepath.length) return filepath;

        // Make all slashes forward
        filepath = filepath.replace(/\\/g, '/');

        // Make sure path ends with a slash
        if (!_s.endsWith(filepath, '/')) {
            filepath += '/';
        }

        return filepath;
    }
    /**
     * Convert a string of comma seperated words into an array
     *
     * @param {String} val Input string
     * @param {String} defVal Default value
     * @return {Array}
     */
    function optionToArray(val, defVal) {
        if (val === undefined) val = defVal;
        if (!val) return [];
        if (typeof val !== 'string') return val;
        if (val.indexOf(',') !== -1) {
            return val.split(',');
        }
        else {
            return [val];
        }
    }
    var stream = Stream.Transform({objectMode: true});

    stream._transform = function (file, unused, done) {
        stream.push(file);
        done();
    };

    stream._flush = function _gulpSVGIcons2SVGFontFlush(done) {
        var cssFile = new gutil.File({
            path: o.fontBaseName + '.css'
        });
        cssFile.contents = new Buffer(generateStylesheet());
        stream.push(cssFile);
        var demoFile = cssFile.clone();
        demoFile.path = o.fontBaseName + '.html';
        demoFile.contents = new Buffer(generateDemoHtml());
        stream.push(demoFile);
        done();
    }

    return stream;
}

module.exports = gulpFontIcon;
