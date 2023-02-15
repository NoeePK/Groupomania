const Profile = require("../models/Profile");
require("dotenv").config();

// Récupérer tous les profils
const getAllProfiles = async (req, res) => {
    const profiles = await Profile.find();
    if (!profiles)
        return res.status(204).json({ message: "Aucun profil n'a été trouvé" });
    res.json(profiles);
};

// Récupérer un profil
const getOneProfile = async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({ message: "Un ID est nécessaire" });
    const profile = await Profile.findOne({ _id: req.params.id }).exec();
    if (!profile) {
        return res.status(204).json({
            message: `Le profil avec l'ID ${req.params.id} n'a pu être trouvé`,
        });
    }
    res.json(profile);
};

// Créer un profil
const createProfile = async (req, res) => {
    if (!req?.body?.firstName || !req?.body?.lastName || !req?.body?.service) {
        return res.status(400).json({
            message:
                "Votre profil requiert votre nom, prénom et le service auquel vous appartenez",
        });
    }

    try {
        const result = await Profile.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            service: req.body.service,
            description: req.body.description,
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
};

const updateProfile = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ message: "ID du profil manquant." });
    }

    const profile = await Profile.findOne({ _id: req.body.id }).exec();
    if (!profile) {
        return res
            .status(204)
            .json({
                message: `Aucun profil avec l'ID ${req.body.id} n'a pu être trouvé.`,
            });
    }
    if (req.body?.firstName) profile.firstName = req.body.firstName;
    if (req.body?.lastName) profile.lastName = req.body.lastName;
    if (req.body?.birthday) profile.birthday = req.body.birthday;
    if (req.body?.service) profile.service = req.body.service;
    if (req.body?.description) profile.description = req.body.description;
    const result = await profile.save();
    res.json(result);
};

// !!!! Supprimer un profil (uniquement par un admin)
const deleteProfile = async (req, res) => {
    if (!req?.body?.id)
        return res.status(400).json({ message: "Un ID est nécessaire" });
    const profile = await Profile.findOne({ _id: req.body.id }).exec();
    if (!profile) {
        return res.status(204).json({
            message: `Le profil avec l'ID ${req.params.id} n'a pu être trouvé`,
        });
    }
    const result = await profile.deleteOne({ _id: req.body.id });
    res.json(result);
};

module.exports = {
    getAllProfiles,
    getOneProfile,
    createProfile,
    updateProfile,
    deleteProfile,
};

// WIP !!! Refaire ! Modifier mon profil
exports.updateMyself = (req, res, next) => {
    const profileObject = req.file
        ? {
              ...JSON.parse(req.body.profile),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    Profile.updateOne(
        { _id: req.params.id },
        { ...profileObject, _id: req.params.id }
    )
        .then(() =>
            res.status(200).json({
                message: "Modifications du profil enregistrées",
            })
        )
        .catch((error) =>
            res.status(401).json({
                message:
                    "Vous n'avez pas l'autorisation nécessaire pour modifier ce profil",
            })
        );
};
