import { rateLimitConfig } from "@/util/api_rate_limit_config";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpStatusCode } from "axios";
import rateLimit from "express-rate-limit";
import { getAllAssets, getAllAssetsSelectComponent } from "@/util/cloudinary/back/cloudinary_functions";


const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {

  return apiLimiter(req, res, async () => {

    const API_NAME = 'get Profile Assets'

    console.log(API_NAME)

    if (req.method !== 'GET') {
      return res.status(HttpStatusCode.MethodNotAllowed).json({ message: 'API_NAME' })
    }

    const { query } = req

    console.log("query", query)

    if (query?.SelectList) {
      const assets = await getAllAssetsSelectComponent()
      if (!assets) {
        return res.status(HttpStatusCode.NoContent).json({ massage: 'Err' })
      }
      res.status(200).json(assets)

    }

    //  const session = await getServerSession(req, res, authOptions);

    // if(!session){
    //        return res.status(HttpStatusCode.Unauthorized).json({massage:'YOU SHELL NOT PASS @!!' }) }


    //  const body = req.body 
    //  const isValidData = getAllAssetsZVS.safeParse(body) 

    // if( !isValidData.success ){
    //   return res.status(400).json({massage:'bad input'})
    // }

    const assets = await getAllAssets()

    if (!assets) {
      return res.status(HttpStatusCode.Unauthorized).json({ massage: 'Err' })
    }
    res.status(200).json(assets)

  })
}

export const config = {
  api: {
    externalResolver: true,
  }
}