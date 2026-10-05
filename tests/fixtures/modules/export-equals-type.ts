// export = of something that is only a type: tsc drops it (module.exports = c would throw)
interface c { q: number }
export = c;
