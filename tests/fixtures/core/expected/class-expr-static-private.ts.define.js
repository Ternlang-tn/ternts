g.R = class R {
    static #e = 1;
    static x = 2;
    m() { return [R.#e, R.x, R]; }
};
tool.onDrop?.(app);
