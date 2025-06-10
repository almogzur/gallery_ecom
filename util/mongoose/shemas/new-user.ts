
export const NewUserSchema = {
  name: { type: String, required: true , unique:true},
  displayName:{type:String , required: true},
  phone:{type:String , required: true},
  image:{type:String , required: true},
  email:{type:String , required: true},
};





