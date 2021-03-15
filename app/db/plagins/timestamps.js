const { Model } = require('objection');
const { timestampPlugin } = require('objection-timestamps');

class timeStamps extends timestampPlugin()(Model) {
  static get timestamp() {
    return true;
  }
}

module.exports = timeStamps;
