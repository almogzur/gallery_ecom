import { BlogPostSchemaType } from "@/types/main";
import mongoose  from "mongoose";
import { DBBlogPostSchema } from "@/util/mongeese/schemas/db-blog-post";

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

   // returns a connection bound to model   
   // avoid look up  global connections pool
   // every connection is created at model  call time ] 

  return (connection: mongoose.Connection): mongoose.Model<T> => {
    if (!connection) {
      throw new Error("A valid database connection is required.");
    }
    return connection.models[name] || connection.model<T>(name, schema);
  };
  
};

export const boundedBlogsModel =  createBoundToConnectionModel<BlogPostSchemaType>(`${process.env.APP_BLOGS_FOLDER}`,DBBlogPostSchema,)
