export async function main() {
    const { readFile } = await import("fs");
    const m = await import(`./x${1}.js`);
    return [readFile, m];
}
