import { NextApiRequest, NextApiResponse } from "next";
import { MockeDBOperator } from "../../../server/infrastructure/db/mockOperators";

export default async function handler( req: NextApiRequest, res: NextApiResponse){
  try {
    const db = new MockeDBOperator()
    // console.log(req.query)
    const results = await db.findAll(1);
    
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