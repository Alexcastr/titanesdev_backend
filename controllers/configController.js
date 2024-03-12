"use strict";
var Config = require("../models/config");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../middlewares/jwt");
var fs = require('fs');
var path = require('path')

const actualiza_config_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == "admin") {
            let data = req.body;
            if (req.files) {
                var img_path = req.files.logo.path;
                var name = img_path.split('\\');
                var logo_name = name[2];

                let reg = await Config.findByIdAndUpdate({ _id: '64e4ff608b4f40898f3982a1' }, {
                    categorias: JSON.parse(data.categorias),
                    titulo: data.titulo,
                    serie: data.serie,
                    logo: logo_name,
                    correlativo: data.correlativo,
                });
                fs.stat('./uploads/configuraciones/' + reg.logo, function (err) {
                    if (!err) {
                        fs.unlink('./uploads/configuraciones/' + reg.logo, (err) => {
                            if (err) throw err;
                        });
                    }
                })

                res.status(200).send({ data: reg });
            } else {
                let reg = await Config.findByIdAndUpdate({ _id: '64e4ff608b4f40898f3982a1' }, {
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo,
                });

                res.status(200).send({ data: reg });
            }
        } else {
            res.status(500).send({ message: "NoAccess" });
        }
    } else {
        res.status(500).send({ message: "NoAccess 01" });
    }
};

const obtener_config_admin = async function (req, res) {
    if (req.user) {
        if (req.user.role == "admin") {
            try {
                var reg = await Config.findById({ _id: '64e4ff608b4f40898f3982a1' });
                res.status(200).send({ data: reg });
            } catch (error) {
                res.status(200).send({ data: undefined });
            }
        } else {
            res.status(200).send({ data: reg });
        }
    } else {
        res.status(500).send({ message: "NoAccess" });
    }
};

const obtener_logo = async function (req, res) {
    var img = req.params['img'];
    console.log(img)
    fs.stat('./uploads/configuraciones/' + img, function (err) {
        if (!err) {
            let path_img = './uploads/configuraciones/' + img;
            res.status(200).sendFile(path.resolve(path_img))
        } else {
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img))
        }
    })
}

const obtener_config_publico = async function (req, res) {
    try {
        var reg = await Config.findById({ _id: '64e4ff608b4f40898f3982a1' });
        res.status(200).send({ data: reg });
    } catch (error) {
        res.status(200).send({ data: undefined });
    }
};


module.exports = {
    actualiza_config_admin, obtener_config_admin,
    obtener_logo,obtener_config_publico //eliminar_config_admin
};