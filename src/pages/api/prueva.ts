import { ProductRepository } from "@/server/infrastructure/db/product.repository";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest,res: NextApiResponse){
  try {
    console.log(req)
    const repo = new ProductRepository();
    const resrepo = await repo.findAll(1);

    res.status(200).send(resrepo)
  } catch (error) {
    // console.log('oooooooooo',error);
    
    res.status(500).send({message: error})
  }
}