export async function run(open: () => Disposable, openAsync: () => AsyncDisposable) {
  using a = open();
  await using b = openAsync();
  {
    using c = open(), d = open();
    console.log(c, d);
  }
  for (using e of [open()]) console.log(e);
  return a && b;
}
export {};
