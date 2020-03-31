const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const auth = require('./middlewares/auth');

const OngController = require("./controllers/OngControllers");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const router = express.Router();

router.post("/session", SessionController.create)


router.get("/ongs", OngController.index);
router.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);


router.get("/incidents",celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page:Joi.number(),
    })
}) ,IncidentController.index);


router.post("/incidents", IncidentController.create);
router.delete("/incidents/:id",celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id:Joi.number().required()
    })    
}),IncidentController.delete);

router.get("/profile",auth,celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}), ProfileController.index);


module.exports = router