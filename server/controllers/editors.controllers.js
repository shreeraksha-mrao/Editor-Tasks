import ApiError from "../ApiError.js";
import Editor from "../models/editors.models.js"
import bcrypt from "bcrypt"

export const getEditor  = async(req,res,next)=>{
    //retrieve all the editors
    try{
        const data =  await Editor.find();
        if(data.length == 0) return res.status(204).send();
        return res.status(200).json({message:"Editors retrieved successfully", data:data})
    }
    catch(err){
        next(err);
    }
}

export const postEditor = async(req,res,next)=>{
    try{
        const {name, rating, password} = req.body;
        console.log(req.body)
        console.log(name)
        console.log(rating)
        if(name == null || rating == null || password == null){
            const err = new ApiError("All details are not present to add a editor", 400);
            next(err);
        }
        const data = await Editor.create({ name, rating, password });
        return res.status(201).json({message:"Editor posted successfully", data:data})
    }
    catch(err){
        next(err);
    }
}

export const getEditorById = async(req,res,next)=>{
    try{
        const {id} = req.params
        const data = await Editor.findById(id);
        if(data == null){
            const err = new ApiError("Editor details not found", 404);
            next(err);
        } 
        return res.status(200).json({message:"Editor retrieved successfully", data});

    }
    catch(err){
        next(err);
    }
}

export const updateEditorById = async(req, res, next)=>{
    try{
        const {id} = req.params
        const data = req.body
        console.log(data)
        let updatededitor = await Editor.findById(id)
        updatededitor.name = data.name
        updatededitor.rating = data.rating
        if (data.password != updatededitor.password ) {
            updatededitor.password = await bcrypt.hash(data.password, 10);
        }

        await updatededitor.save()

        
        return res.status(200).json({message:"Edited successfully", data:updatededitor})
    }
    catch(err){
        next(err);
    }
}

export const deleteEditorById = async(req,res,next)=>{
    try{
        const {id} = req.params
        const deleted = await Editor.findByIdAndDelete(id);
        return res.status(200).json({message:"Deleted successfully", data:deleted});
    }
    catch(err){
        next(err);
    }
}
//dummy end point
export const addPassword = async(req,res,next)=>{
    try{
        console.log("aaayo")
        const {password} = req.body;
        await Editor.updateMany({},{$set:{password}})
        return res.status(200).json({message:"updates successfully"});
    }
    catch(err){
        next(err)
    }
}

//if i want to handle logins
// const editor = await Editor.findOne({name})
// const passwordcheck = await editor.isPasswordCorrect(password)