import foodModel from "../models/foodModel.js";
import fs from 'fs'
   


//add food item

const addFood=async(req,res)=>{
if (!req.file) {
  return res.status(400).json({
    success: false,
    message: "Image is required"
  });
}

const image_filename = req.file.filename;


    const food=new foodModel({
       name:req.body.name,
       description:req.body.description,
       price:req.body.price,
       category:req.body.category,
       image:image_filename


    })
    try{
        await food.save();
         res.status(201).json({
      success: true,
      message: "Food item added successfully",
      data: food
    });
        
    }
    catch(e){
        res.send(e);
    }
         
}

//list food
//all food list
const listFood=async(req,res)=>{
    try{
   const foods=await foodModel.find({});
   res.json({success:true,data:foods})
    }
    catch(e){
        res.send(e);

    }

}

//remove food item
const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"})
      
    }
    catch(e){
        res.send(e);


    }
}

export {addFood,listFood,removeFood}