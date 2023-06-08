
module.exports.isUrl = function isUrl(str) {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)" +
      "(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}" +
      "(:\\d{2,5})?" +
      "(\\/[-a-z\\d%@_.~+&:]*)*" +
      "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" + 
      "(\\#[-a-z\\d_]*)?$", "i"
    );
  
    return urlPattern.test(str);
}