type ObjectWithId = {
  id?: number;
  [key: string]: any;
};

export const ignoreId = <T extends ObjectWithId>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const newObj: any = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (key !== 'id') {
      newObj[key] = ignoreId(value);
    }
  }

  return newObj;
};
