const Photo = require('../models/Photo');
exports.getAbout = (req, res) => {
  res.render('about');
};

exports.getAdd = (req, res) => {
  res.render('add');
};
exports.getEditPhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', { photo });
};
