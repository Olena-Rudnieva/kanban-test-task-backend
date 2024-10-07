export const runValidatorsAtUpdate = function (this: any, next: any) {
  this.options.runValidatiors = true;
  this.options.new = true;
  next();
};
