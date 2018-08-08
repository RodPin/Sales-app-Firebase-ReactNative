export function dataHoje() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yy = today.getFullYear();
  return dd + "/" + mm + "/" + yy;
}
