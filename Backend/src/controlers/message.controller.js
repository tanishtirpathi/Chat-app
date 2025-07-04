
import User from "../modals/user.modal.js"
import Message  from "../modals/message.modal.js"
import cloudinary from "../lib/cloudnary.js";


export const getUserslider = async (req, res) => {
  try {
    const logedInuserId = req.user._id;
    const filterUser = await User.find({ _id: { $ne: logedInuserId } }).select(
      "-password"
    );
    res.status(200).json({filterUser})
  } catch (error) {
    console.log("error in the getUserslider side pe " , error.message )
    res.status(500).json({message: "Internat Server Error" })

  }
};
 export const getmessages = async(req , res)=>{
    try {
        const {id:userchattoid}= req.params
        const senderId = req.user._id
        const message = await Message.find({
            $or:[
                    {senderId:senderId, receiverId:userchattoid},
                    {senderId:userchattoid, receiverld:senderId}]
        })
        res.status(200).json(message)
    } catch (error) {
        console.log("error in the get message controller ", error.message)
            res.status(500).json({message: "Internat Server Error" })

    }
 }
 export const sendMessage = async(req , res )=>{
  try {
    const {text , image} = req.body
    const {id:receiverId} = req.params
    const senderId = req.user._id

    let imageUrl ;
    if(imageUrl){
      const uploadresponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadresponse.secure_url;
    }
 
    const newMessage = new Message({
      senderId, 
      receverId,
      text,
      image:imageUrl
    })
    await newMessage.save()

    res.status(200).json(newMessage)
  } catch (error) {
    console.log("error in the message conroller mainly send message side ", error.message)
  }
 }

