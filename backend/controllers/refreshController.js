const refresh = async (req, res) => {
  return res.status(200).json({ message: "Refreshed" });
};

module.exports = {
  refresh,
};
