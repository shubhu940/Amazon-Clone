const FruitData = require("../models/fruitData");
const GrainData = require("../models/grainData");
const OilData = require("../models/oilData");


const oilDatas = async (req, res) => {
    try {
        const response = await OilData.find();
        if (response.length === 0) {
            return res.status(404).json({ msg: "No oilData Found" });
        }
        return res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`oilDatas: ${error}`);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
const fruitDatas = async (req, res) => {
    try {
        const response = await FruitData.find();
        if (response.length === 0) {
            return res.status(404).json({ msg: "No fruitData Found" });
        }
        return res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`oilDatas: ${error}`);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const grainDatas = async (req, res)=>{
    try{
        const response = await GrainData.find();
        if(response.length === 0){
            return res.status(404).json({msg:"No grainData found"});
        }
        return res.status(200).json({ msg: response });

    }catch(error) {
        console.log(`oilDatas: ${error}`);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = {oilDatas, fruitDatas, grainDatas};
