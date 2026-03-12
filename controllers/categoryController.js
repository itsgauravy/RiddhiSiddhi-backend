const Category = require("../models/Category");

exports.createCategory = async (req, res) => {

  try {

    const { name, description } = req.body;

    const category = await Category.create({
      name,
      description
    });

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};