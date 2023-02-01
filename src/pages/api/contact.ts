import {prisma}  from '../../Utils/db';
import type {NextApiRequest, NextApiResponse} from 'next'
import {validateFormInputs} from '@/Utils/validation';
import type {FormTypes} from '@/Utils/validation';



async function handler(req: NextApiRequest, res: NextApiResponse) {
  await prisma.$connect(); 
  
  if (req.method === 'POST') {
    const {email, name, text} = req.body; 
    
    const newMessage: FormTypes = {email, name, text}
    
    const result = validateFormInputs(newMessage); 
    
    if(!result.success) {
      res.status(422).json({message: result.error}); 
      return 
    }
    
    try {
      await prisma.message.create({data: {name, email, text}})
    } catch (error) {
      res.status(422).json('could not create a new message in the database'); 
    }
    
    res.status(201).json({message: 'success', newMessage}); 
  } else {
    res.status(200).json({message: 'This is working'}); 
  }
}

export default handler; 
