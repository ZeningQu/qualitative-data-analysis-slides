// https://github.com/30-seconds/30-seconds-of-code#initializearraywithrange
export const initializeArrayWithRange = (end: number, start = 0, step = 1) =>
  Array.from({ length: Math.ceil((end - start + 1) / step) }, (v, i) => i * step + start);

// https://github.com/30-seconds/30-seconds-of-code#unzip
export const unzip = (arr: any[]) =>
arr.reduce(
  (acc, val) => (val.forEach((v: any, i: number) => acc[i].push(v)), acc),
  Array.from({
    length: Math.max(...arr.map(x => x.length))
  }).map(x => [])
);

// https://github.com/30-seconds/30-seconds-of-code#uniqueelementsby
export const uniqueElementsBy = (arr: any[], fn: any) =>
  arr.reduce((acc, v) => {
    if (!acc.some((x:any) => fn(v, x))) acc.push(v);
    return acc;
  }, []);

// https://github.com/30-seconds/30-seconds-of-code#orderby
export const orderBy = (arr: any[], props: string[], orders?: string[]) =>
[...arr].sort((a, b) =>
  props.reduce((acc, prop, i) => {
    if (acc === 0) {
      const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
      acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
    }
    return acc;
  }, 0)
);
