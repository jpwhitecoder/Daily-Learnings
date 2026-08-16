const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model")
const jwt = require("jsonwebtoken")
const { uploadFile } = require("../services/storage.service");
const userModel = require("../models/user.model");


async function createMusic(req, res){

    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    // console.log(result)

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        message:"Music created successfully",
        music:{
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
}

async function createAlbum (req,res){

    const {title, musicIds} = req.body;

    const album = await albumModel.create({
        title,
        musics: musicIds,
        artist: req.user.id
    })

    res.status(201).json({
        message:"Album created successfully",
        album:{
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics : album.musics
        }
    })

}

async function getAllMusics(req,res){

    const musics = await musicModel.find();

    res.status(200).json({
        message:"Musics fetched successfully",
        musics: musics
    })
}

async function getAllAlbums(req,res){
    const albums = await albumModel.find().populate("artist","username email");

    res.status(200).json({
        message:"Albums fetched successfully",
        albums
    })
}

async function getAlbumById(req,res){

    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics");

    return res.status(200).json({
        message:"Album fetched successfully",
        album
    })
}



module.exports = { createMusic , createAlbum, getAllMusics, getAllAlbums, getAlbumById}