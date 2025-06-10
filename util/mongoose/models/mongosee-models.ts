import { NewUserType } from "@/types/main";
import mongoose  from "mongoose";
import { NewUserSchema } from "../shemas/new-user";

export const createBoundToConnectionModel = <T>(
  name: string,
  schemaDefinition: mongoose.SchemaDefinition<T>
) => {

  // Create schema once
  const schema = new mongoose.Schema<T>(schemaDefinition, {
    collection: name,
    autoCreate: false,
    autoIndex: false,
    versionKey:false,
    
  });

   // returns a connection bound to modle   
   // avoide look up  global connections pool
   // every coonection is created at modle  call time ] 

  return (connection: mongoose.Connection): mongoose.Model<T> => {
    if (!connection) {
      throw new Error("A valid database connection is required.");
    }
    return connection.models[name] || connection.model<T>(name, schema);
  };
  
};

export const bounedBlogsModel =  createBoundToConnectionModel<NewUserType>(`${process.env.APP_BLOGS_FOLDER_PATH}`,NewUserSchema,)
