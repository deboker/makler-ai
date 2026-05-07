const allowedTickers = ["RDDT", "BKNG", "DUOL", "NBIS", "CMCSA", "CRCL"];
const allowedRanges = ["1d", "5d", "1m", "6m", "1y", "5y"];

function isAllowedTicker(ticker) {
  return allowedTickers.includes(String(ticker || "").toUpperCase());
}

function isAllowedRange(range) {
  return allowedRanges.includes(String(range || "").toLowerCase());
}

module.exports = {
  allowedTickers,
  allowedRanges,
  isAllowedTicker,
  isAllowedRange
};
