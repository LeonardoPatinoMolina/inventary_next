import { NextApiRequest, NextApiResponse } from "next";
import { MockeDBRecord } from "../../../server/infrastructure/db/mockRecord";

export default async function handler( req: NextApiRequest, res: NextApiResponse){
  try {
    const db = new MockeDBRecord()
    // console.log(req.query)
    const results = await db.findAll();
    
    res.status(200).send({
      message: 'success',
      data: results.data,
      page: 1,
      totalPages: results.pages,
      total: results.total
    })
  } catch (error) {
    res.status(500).send({message: 'error en el servidor'})
  }
}