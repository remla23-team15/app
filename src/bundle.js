(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "MY_APP_URL": "/predict",
  "MY_APP_FEEDBACK": "/feedback"
}

},{}],2:[function(require,module,exports){
(function (process){(function (){
"use strict";

var _lib = require("@remla23-team15/lib");

// Enable usage of getVersion in the frontend app
window.currentVersion = function () {
    document.getElementById("version").innerText = (0, _lib.getVersion)();
};

// Setup env variables from env.json file
var env_vars = require('./env.json');
Object.keys(env_vars).forEach(function (k) {
    process.env[k] = env_vars[k];
});

window.backEndUrl = function () {
    return process.env.MY_APP_URL;
};

window.feedbackUrl = function () {
    return process.env.MY_APP_FEEDBACK;
};

}).call(this)}).call(this,require('_process'))
},{"./env.json":1,"@remla23-team15/lib":3,"_process":5}],3:[function(require,module,exports){
// General functions
/**
 * Get repository latest versioned tag from GitHub API.
 *
 * @param url The repository URL.
 * @returns {Promise<string>} The returned latest version.
 */
async function getGitHubRepoLatestVersion(url) {
    const res = await fetch(url);
    if (res.ok) {
        // Parse response to JSON
        const data = await res.json();
        if (data.length === 0) {
            return "version unknown";
        }

        // Filter versioned tags: vx.x.x
        const regex = new RegExp('v[0-9]+.[0-9]+.[0-9]+', 'g');
        const versionedTags = data.filter(tag => tag.name.match(regex));
        if (versionedTags.length === 0) {
            return "version unknown";
        }

        return `${versionedTags[0].name}`;
    } else {
        return "version unknown";
    }
}

// Request the model-service latest version
/**
 * Get the model-service repository latest version.
 *
 * @returns {Promise<string>} The returned latest version.
 */
async function getModelServiceVersion() {
    return await getGitHubRepoLatestVersion('https://api.github.com/repos/remla23-team15/model-service/tags');
}

// Request the app latest version
/**
 * Get the app repository latest version.
 *
 * @returns {Promise<string>} The returned latest version.
 */
async function getAppVersion() {
    return await getGitHubRepoLatestVersion('https://api.github.com/repos/remla23-team15/app/tags');
}

/**
 * VersionUtil class.
 * This class contains the latest versions of the:
 * - model-service
 * - lib
 * - app
 */
class VersionUtil {
    constructor(version) {
        // Initialize lib version
        this.libVersion = version;

        // Fetch model-service and app versions
        getModelServiceVersion().then(modelServiceVersion => {
            getAppVersion().then(appVersion => {
                this.modelServiceVersion = modelServiceVersion;
                this.appVersion = appVersion;
            });
        });
    }
}

// Init VersionUtil class
const packageJson = require('./package.json');
const packageVersion = new VersionUtil(packageJson.version);

// Export the function
exports.getVersion = () => {
    return `App components versions:\nmodel-service: ${packageVersion.modelServiceVersion}\nlib: v${packageVersion.libVersion}\napp: ${packageVersion.appVersion}`;
}

},{"./package.json":4}],4:[function(require,module,exports){
module.exports={
  "name": "@remla23-team15/lib",
  "version": "2.0.0",
  "description": "Version-aware library",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/remla23-team15/lib.git"
  },
  "author": "remla23-team15",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/remla23-team15/lib/issues"
  },
  "homepage": "https://github.com/remla23-team15/lib#readme"
}

},{}],5:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[2]);
