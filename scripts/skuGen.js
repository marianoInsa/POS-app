var serial_maker = function () {
  var prefix = "";
  var seq = 0;
  return {
    set_prefix: function (p) {
      prefix = String(p);
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function () {
      var result = prefix + seq;
      seq += 1;
      return result;
    },
  };
};

function skuGen(prefix) {
  var seqer = serial_maker();
  seqer.set_prefix(prefix);
  seqer.set_seq(1000);
  return seqer.gensym();
}
console.log("unique: " + skuGen("COC-"));
console.log("unique: " + skuGen("PEP-"));

export default skuGen;
