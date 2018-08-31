export function dataHoje() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yy = today.getFullYear();
  return dd + "/" + mm + "/" + yy;
}

export function horaHoje() {
  var today = new Date();
  var hora = today.getHours();
  var min = today.getMinutes();
  var seg = today.getSeconds();
  return hora + ":" + min + ":" + seg;
}

export function idToNomeProduto(id) {
  firebase
    .database()
    .ref("Produtos/" + id)
    .on("value", snap => {
      items = [];
      snap.forEach(data => {
        items.push({
          key: data.key,
          data: data.val()
        });
      });
      console.log(data.val().produto);
      return data.val().produto;
    });
}
