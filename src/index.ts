export function convert<FROM, TO>(
  src: FROM,
  rules: {
    copy?: Array<keyof FROM>;
    rename?: { [k in keyof TO]?: keyof FROM };
    map?: Array<{
      dest: keyof TO;
      map: (src: FROM) => any;
    }>;
  },
): TO {
  let obj: any = {};

  if (rules.copy) {
    obj = rules.copy.reduce(
      (acc, property) => ({ ...acc, [property]: src[property] }),
      obj,
    );
  }

  if (rules.rename) {
    for (const property in rules.rename) {
      if (rules.rename.hasOwnProperty(property)) {
        obj = { ...obj, [property]: src[rules.rename[property]] };
      }
    }
  }

  if (rules.map) {
    obj = rules.map.reduce(
      (acc, property) => ({ ...acc, [property.dest]: property.map(src) }),
      obj,
    );
  }

  return obj;
}
