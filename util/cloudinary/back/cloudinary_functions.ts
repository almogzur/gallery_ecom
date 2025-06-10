import {  v2 as cloudinary , ResourceApiResponse  } from 'cloudinary';


type Folder = {
  name: string;
  path: string;
  external_id: string;
};

type FolderResponse = {
  folders: Folder[];
  next_cursor: string | null;
  total_count: number;
};

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  
export const createFolder = (folderName: string ): string => {
    const sanitizedName = folderName.replace(/\s+/g, "_"); // Replace spaces with underscores
    // console.log(`${session?.user?.name}/${sanitizedName}`);
      return `${sanitizedName}`;
};
export const moveToFolder = async (publicId:string  , eventName :string):Promise<boolean|undefined>=>{

        try{ 
            const data :unknown = await 
            cloudinary.uploader.explicit( 
            publicId,
          {
            type:'upload',
            resource_type:'image',
            asset_folder: createFolder(eventName),
           }
            );
            if(data){
              console.log("cloudinary moveToEventNameFolder ", "succsess" ,data)

              return true
            }
         }
        catch (err){
          console.log("cloudinary moveToEventNameFolder  err" , err )
          return false 
          }
        


} 
export const delFolder = async(Path:string):Promise<boolean|undefined>=>{
               try{ 
                  const  data = await cloudinary.api.delete_folder(Path);
                  console.log("cloudinary- delFolder" ,"Path:",Path );
                  if(data){
                    return true
                  }
                  }  
                
               catch (err){ 
                   console.log(  " cloudinary del-folder ERR" , err );
                   return false
           
                }
              
} 
export const delEmptyFolders =  async (Path?:string|null):Promise<boolean>=>{

    const folders = await findSubFolders(Path)

     if(!folders){
          console.log ( " delFolders Return false folders are null " )
        return false
      }
     else if(Array.isArray(folders)){
         folders.map( 
             async (folder)=>{
                 try{
                  if(folder?.path){
                    const del_result = await delFolder(folder.path)
                    console.log( " folders.map :  del_result ", del_result, "Path " , folder.path );
                  }
                   }
                 catch (err){  
                  console.log("cloudinary Del Error",err ) ;
                 }
            })
            return true
     }
     else{
        console.log (  "delEmptyFolders  :  Return false" , typeof folders ,folders,   );  
      return false
     }
}


export const findSubFolders =  async(Path?:string|null) : Promise<FolderResponse|boolean> =>  {
         try {
                   // Fetch all subfolders under the root path
                   const { folders } = await cloudinary.api.sub_folders(Path??"") 
                   return folders
             } 
         catch (error) {
                   console.log(`cloudinary find_result  Error:`, error);
                   return false
               }
}

export const getAllAssets = async ( ) : Promise<undefined|ResourceApiResponse>=>{
  try{  
    const data : ResourceApiResponse   = await  cloudinary.api.resources({max_results:100})
    return data
  }
  catch ( err ){ 
    console.log(err, ' getAllAssets ')
    return undefined
   }
}
