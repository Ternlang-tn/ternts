// module node16+: CommonJS output keeps import() (Node has it); module commonjs turns it into require
export async function main() {
  const { readFile } = await import("fs");
  const m = await import(`./x${1}.js`);
  return [readFile, m];
}
