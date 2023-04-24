import { NextApiRequest, NextApiResponse } from "next";
import { MockeDB } from "@/server/infrastructure/db/mock";

export default async function handler( req: NextApiRequest, res: NextApiResponse){
  try {
    const db = new MockeDB()
    console.log(req.query)
    const results = await db.findBy('', '', 0);
    
    res.status(200).send({
      message: 'success',
      data: results.data,
      page: 1,
      totalPages: results.totalPages
    })
  } catch (error) {
    res.status(500).send({message: 'error en el servidor'})
  }
}