var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
{
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const d1 = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false), d2 = __addDisposableResource(env_1, null, false), d3 = __addDisposableResource(env_1, undefined, false);
        for (;;) {
        }
    }
    catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
    }
    finally {
        __disposeResources(env_1);
    }
}
function f() { {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
        const a = __addDisposableResource(env_2, null, false), b = __addDisposableResource(env_2, x(), false);
        for (; a; g())
            h(a, b);
    }
    catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
    }
    finally {
        __disposeResources(env_2);
    }
} }
async function af() { {
    const env_3 = { stack: [], error: void 0, hasError: false };
    try {
        const a = __addDisposableResource(env_3, null, true);
        for (;;) {
            break;
        }
    }
    catch (e_3) {
        env_3.error = e_3;
        env_3.hasError = true;
    }
    finally {
        const result_1 = __disposeResources(env_3);
        if (result_1)
            await result_1;
    }
} }
async function fa(xs) { for await (const d_1 of xs) {
    const env_4 = { stack: [], error: void 0, hasError: false };
    try {
        const d = __addDisposableResource(env_4, d_1, false);
        f(d);
    }
    catch (e_4) {
        env_4.error = e_4;
        env_4.hasError = true;
    }
    finally {
        __disposeResources(env_4);
    }
} for await (const e_5 of xs) {
    const env_5 = { stack: [], error: void 0, hasError: false };
    try {
        const e = __addDisposableResource(env_5, e_5, true);
        g(e);
    }
    catch (e_6) {
        env_5.error = e_6;
        env_5.hasError = true;
    }
    finally {
        const result_2 = __disposeResources(env_5);
        if (result_2)
            await result_2;
    }
} }
