const gamesController = {};
import gamesModel from "../models/games.js"

gamesController.getGames = async (req, res) => {
    const games = await gamesModel.find(); 
    res.json (games);
};

gamesController.createGames = async (req, res) => {
    const{nombre,categoria,ApMinima,ApMaxima} = req.body;
const newGames = new gamesModel({nombre,categoria,ApMinima,ApMaxima});
await newGames.save();
res.json ({message: "Game save"});
}

gamesController.deleteGames = async(req,res) => {
    const deleteGames = await gamesModel.findByIdAndDelete(req.params.id);
    if (!deleteGames){
        return res.status(404).json({message: "Game dont find"});
    
    }
    res.json ({message: "game deleted"});
};

gamesController.updateGames = async (req,res) => {

    const{ nombre,categoria,ApMinima,ApMaxima} = req.body;

    await gamesModel.findByIdAndUpdate(
        req.params.id,
        {
            nombre,
            categoria,
            ApMinima,
            ApMaxima,          
        },
        { new: true}
    );
   
    res.json ({message: "Game update"});
};

export default gamesController;