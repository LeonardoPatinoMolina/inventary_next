import { MockeDB } from "@/server/infrastructure/db/mockProduct";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse){
  try {
    const db = new MockeDB()
    // console.log(req.query)
    const results = await db.findBy('', '', 0);
    
    res.status(200).send({
      message: 'success',
      data: results.data,
      page: 1,
      totalPages: results.totalPages,
      total: results.total
    })
  } catch (error) {
    res.status(500).send({message: 'error en el servidor'})
  }
}