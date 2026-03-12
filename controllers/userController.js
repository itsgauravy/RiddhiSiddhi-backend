const User = require("../models/User");

exports.updateUserRole = async (req, res) => {
  try {

    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User role updated",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};