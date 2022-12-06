!(function () {
  var n = {
    createName: function (n, e) {
      return `${n}|${JSON.stringify(e)}`;
    },
    getName: e,
    getParams: function () {
      return (
        (function (n) {
          try {
            return JSON.parse(n);
          } catch (n) {
            return null;
          }
        })(window.self.name.split("|")[1]) || {}
      );
    },
    isIframe: function (n = null) {
      return window.self !== parent && (!n || e() === n);
    },
  };
  function e() {
    return window.self.name.split("|")[0] || null;
  }
  function t(n) {
    const e = document.createElement("div"),
      t = n.replace("<script>", "(() => {").replace("</script>", "})()");
    e.setAttribute("onreset", t), e.dispatchEvent(new Event("reset"));
  }
  var r = {
      executeScript: t,
      loadExtScript: function (n, e = {}) {
        const t = Math.random().toString().slice(2),
          r = document.createElement("script");
        (r.onload = () => r.remove()),
          (r.src = chrome.runtime.getURL(`${n}?v=${t}`)),
          document.documentElement.insertAdjacentElement("afterbegin", r);
        for (const n in e) r.setAttribute(n, e[n]);
      },
      iframe: n,
    },
    i = document.documentElement,
    o = function () {
      t(
        `\n      <script>\n        window.inssist.theme.emojiRegex = ${window.emojiRegex.toString()}\n      <\/script>\n    `
      );
    };
  var a = {
    init: function () {
      !(function () {
        const e = n.getParams().theme;
        if (!e) return;
        i.classList.add(`theme-${e}`);
      })(),
        i.insertAdjacentHTML(
          "afterbegin",
          '\n    <svg id="theme-night-svg" style="display: none; height: 0px; width: 0px;">\n      <filter id="theme-filter" x="0" y="0" width="99999" height="99999" style="color-interpolation-filters: srgb;">\n        <feColorMatrix type="matrix" values="0.300 -0.600 -0.600 0.000 0.950 -0.600 0.300 -0.600 0.000 0.950 -0.600 -0.600 0.300 0.000 0.950 0.000 0.000 0.000 1.000 0.000"></feColorMatrix>\n      </filter>\n      <filter id="theme-reverse-filter" x="0" y="0" width="99999" height="99999" style="color-interpolation-filters: srgb;">\n        <feColorMatrix type="matrix" values="0.333 -0.667 -0.667 0.000 1.015 -0.667 0.333 -0.667 0.000 1.015 -0.667 -0.667 0.333 0.000 1.015 0.000 0.000 0.000 1.000 0.000"></feColorMatrix>\n      </filter>\n    </svg>\n  '
        ),
        i.insertAdjacentHTML(
          "afterbegin",
          '\n    <style>\n      .theme-night {\n        filter: url(#theme-filter) !important;\n        text-shadow: 0 0 0 !important;\n        background: #191919 !important;\n      }\n\n      .theme-night ._cqw45._2pnef,\n      .theme-night ._mli86,\n      .theme-night :not(object):not(body)>embed,\n      .theme-night [background],\n      .theme-night [style*="background-image: url"],\n      .theme-night [style*="background-image:url"],\n      .theme-night [style*="background: url"],\n      .theme-night [style*="background:url"],\n      .theme-night img,\n      .theme-night object,\n      .theme-night svg image,\n      .theme-night video {\n        -webkit-filter: url(#theme-reverse-filter) !important;\n        filter: url(#theme-reverse-filter) !important;\n      }\n\n      .theme-night [background] *,\n      .theme-night [style*="background-image: url"] *,\n      .theme-night [style*="background-image:url"] *,\n      .theme-night [style*="background: url"] *,\n      .theme-night [style*="background:url"] *,\n      .theme-night img[src^="https://s0.wp.com/latex.php"],\n      .theme-night input .NaturalImage-image {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :-webkit-full-screen,\n      .theme-night :-webkit-full-screen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :-moz-full-screen,\n      .theme-night :-moz-full-screen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n\n      .theme-night :fullscreen,\n      .theme-night :fullscreen * {\n        -webkit-filter: none !important;\n        filter: none !important;\n      }\n    </style>\n  '
        ),
        o();
    },
  };
  var s = {
    controller: {
      init: function () {
        r.executeScript(
          "\n    <script>\n      window.inssist.schedule.requireModule = requireModule\n\n\n      async function requireModule (moduleName, maxWaitTime = null) {\n        return new Promise(resolve => {\n          let timeout\n          if (maxWaitTime) {\n            timeout = setTimeout(() => {\n              clearInterval(interval)\n              resolve(null)\n            }, maxWaitTime)\n          }\n\n          // wait for window.requireLazy to be available\n          const interval = setInterval(() => {\n            const requireLazy = window.requireLazy\n            if (!requireLazy) return\n            clearInterval(interval)\n\n            // require module\n            requireLazy([moduleName], module => {\n              clearTimeout(timeout)\n              resolve(module)\n            })\n          }, 100)\n        })\n      }\n    </script>\n  "
        ),
          r.executeScript(
            "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit(\n        ({ moduleName, args }) => {\n          // improve error logs\n          if (moduleName === 'ErrorBrowserConsole') {\n            window.requireLazy(['ErrorBrowserConsole'], errorBrowserConsole => {\n              errorBrowserConsole.errorListener = (error) => {\n                // ignore certain facebook errors\n                if (error.message.includes('GraphQL server responded with error 1675012')) { return }\n                if (error.message.includes('Graph API failed')) { return }\n                console.error('[fcs]', error.stack.trim(), '\\n', error.message)\n              }\n            })\n          }\n\n          // disable \"check out calender\" tooltip\n          if (moduleName === 'MediaManagerInstagramCalendarViewTabConfig') {\n            window.requireLazy(['MediaManagerInstagramCalendarViewTabConfig'], calendarTabConfig => {\n              calendarTabConfig.navItemPulseNUXConfig.isVisible = () => false\n            })\n          }\n        }\n      )\n    </script>\n  "
          ),
          r.executeScript(
            "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n      modulePatcher.onModuleInit(({ bodyStr, setBodyStr }) => {\n        if (!bodyStr.includes('window.top')) { return }\n        const newBodyStr = bodyStr.split('window.top').join('window')\n        setBodyStr(newBodyStr)\n      })\n    </script>\n  "
          ),
          r.executeScript(
            "\n    <script>\n      const _getCurrentEntry_ = Symbol('getCurrentEntry')\n      Object.defineProperty(Object.prototype, 'getCurrentEntry', {\n        get () {\n          return (...args) => {\n            const fn = this[_getCurrentEntry_]\n            try {\n              return fn(...args)\n            } catch (e) {\n              if (e.message?.toLowerCase().includes('invariant')) {\n                return { getRoute: () => {} }\n              }\n              throw e\n            }\n          }\n        },\n        set (value) {\n          this[_getCurrentEntry_] = value\n          return true\n        },\n      })\n    </script>\n  "
          );
      },
    },
  };
  var l = {
      controller: {
        init: function () {
          (function () {
            if (Array.prototype.flat) return;
            Array.prototype.flat = function () {
              const n = [...this],
                e = [];
              for (const t of n) Array.isArray(t) ? e.push(...t) : e.push(t);
              return e;
            };
          })(),
            String.prototype.replaceAll ||
              (String.prototype.replaceAll = function (n, e) {
                return this.split(n).join(e);
              });
        },
      },
    },
    c = {
      init: function () {
        r.executeScript(
          "\n    <script>\n      window.inssist.modulePatcher = {\n        // onModuleInit(({ moduleName, args, bodyStr, setBodyStr }) => {...})\n        onModuleInit,\n      }\n\n\n      const handlers = []\n\n\n      function onModuleInit (handler) {\n        handlers.push(handler)\n      }\n\n\n      // patch __d function so we can modify modules body\n      let __d\n      Object.defineProperty(Object.prototype, '__d', {\n        get () {\n          return (...args) => {\n            // check __d args\n            const fn = args[2]\n            if (typeof fn !== 'function') {\n              return __d(...args)\n            }\n\n            // extract module's function body as a string\n            const fnStr = fn.toString()\n            const argsStr = fnStr.split('(')[1].split(')')[0]\n            const bodyStartIndex = fnStr.indexOf('{')\n            const bodyEndIndex = fnStr.lastIndexOf('}')\n            let bodyStr = fnStr.slice(bodyStartIndex + 1, bodyEndIndex)\n\n            const setBodyStr = (newBodyStr) => {\n              bodyStr = newBodyStr\n              const newFn = new Function(argsStr, bodyStr)\n              args[2] = newFn\n            }\n\n            // call handlers which can modify current module\n            const moduleName = args[0]\n            handlers.forEach(handler => {\n              handler({\n                moduleName,\n                args,\n                bodyStr,\n                setBodyStr,\n              })\n            })\n\n            return __d(...args)\n          }\n        },\n        set (value) {\n          __d = value\n          return true\n        },\n      })\n    </script>\n  "
        );
      },
    };
  var u = {
    init: function () {
      r.executeScript(
        "\n    <script>\n      const modulePatcher = window.inssist.modulePatcher\n\n\n      modulePatcher.onModuleInit(\n        ({ moduleName, bodyStr, setBodyStr }) => {\n          // ignore these modules because patching fails for them\n          if (\n            moduleName === 'ReactPropTransfererCore' ||\n            moduleName === 'TooltipData'\n          ) { return }\n\n          if (!bodyStr.includes('className:')) { return }\n\n          // generate class name\n          const className = moduleName\n            .replace('.react', '')\n            .split('.').join('_')\n\n          // add generated class name to className field\n          const newBodyStr = bodyStr\n            .replace(/className:([\"a-z][^?]{20})/g, 'className:\"' + className + ' \"+$1')\n\n          setBodyStr(newBodyStr)\n        }\n      )\n    </script>\n  "
      );
    },
  };
  function d() {
    r.executeScript(
      "\n    <script>\n      window.inssist = {\n        theme: {},\n        schedule: {},\n        modulePatcher: null,\n      }\n    </script>\n  "
    );
  }
  ({
    init: function () {
      l.controller.init(),
        d(),
        a.init(),
        r.loadExtScript("/app/fb-nj.js"),
        r.iframe.isIframe("inssist-fcs") &&
          (document.documentElement.insertAdjacentHTML(
            "afterbegin",
            '\n    <link\n      href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Nunito+Sans&display=fallback&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese"\n      rel="stylesheet"/>\n  '
          ),
          r.executeScript(
            "\n    <script>\n      document.write = function () {}\n    </script>\n  "
          ),
          c.init(),
          u.init(),
          s.controller.init());
    },
  }.init());
})();
