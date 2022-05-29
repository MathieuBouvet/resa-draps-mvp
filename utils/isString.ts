function isString(param: unknown): param is string {
  return typeof param === "string";
}

export default isString;
