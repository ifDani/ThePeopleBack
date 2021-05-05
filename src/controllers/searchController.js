const controller = {};
const { query } = require("express");
const Profile = require("../models/profile");
const User = require("../models/user");
const authJWT = require("../auth/jwt");

controller.saveProfile = async (req, res) => {

  const name = req.body.name;
  const surname = req.body.surname;
  const birthday = req.body.birthday;
  const job = req.body.job;
  const biography = req.body.biography;
  const photo = req.body.photo;
  console.log(photo+"lafoto")
  if (name && surname && birthday && job && biography && photo) {
    try {
      const profile = new Profile({
        name: name,
        surname: surname,
        birthday: birthday,
        job: job,
        biography: biography,
        picture: photo,
      });
      await profile.save();
      res.status(204).send();
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  } else {
    res.status(400).send();
  }
};

controller.getProfiles = async (req, res) => {
  const filter = req.query.search
  console.log(filter)
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  const filters = []
  if (filter) {
      filters.push({ fullname: new RegExp(filter, 'i') })
  }
  if (startDate && endDate) {
      filters.push({
          "birthday": {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
          }
      })
  }
  try {
      let profiles = {}
      if (filters.length > 0) {
          profiles = await Profile.aggregate([
              { $addFields: { fullname: { $concat: ["$name", " ", "$surname"] } } },
              {
                  $match: { $and: filters }
              }
          ])
      } else {
          profiles = await Profile.find()
      }
      res.send(profiles)
  } catch (error) {
      console.log(error)
      res.status(500).send("ocurrió un error")
  }
}

controller.getProfile = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const profiles = await Profile.findById(id);
      res.json(profiles);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

controller.updateProfile = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const surname = req.body.surname;
  const birthday = req.body.birthday;
  const job = req.body.job;
  const biography = req.body.biography;
  const photo = req.body.photo;

  if (!name || !surname || !birthday || !job || !biography || !photo) {
    res.status(400).send;
  }
  try {
    await Profile.findByIdAndUpdate(id, {
      name: name,
      surname: surname,
      birthday: birthday,
      job: job,
      biography: biography,
      photo: photo,
    });
    res.status(201).send();
  } catch (err) {
    res.status(500).send("Error");
  }
};

controller.deleteProfile = async (req, res) => {
  let id = req.params.id;
  if (id) {
    try {
      await Profile.findByIdAndDelete(id);
      res.status(204).send("Personaje borrado");
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send();
  }
};

module.exports = controller;
