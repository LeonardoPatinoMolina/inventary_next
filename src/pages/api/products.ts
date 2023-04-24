import { NextApiRequest, NextApiResponse } from "next";
import { MockeDB } from "@/server/infrastructure/db/mock";

export default async function handler( req: NextApiRequest, res: NextApiResponse){
  try {
    const db = new MockeDB()
    const results = await db.findAll();
    
    res.status(200).send({
      message: 'success',
      data: results,
      
    })
  } catch (error) {
    res.status(500).send({message: 'error en el servidor'})
  }
}