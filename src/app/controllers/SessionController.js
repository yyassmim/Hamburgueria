/* eslint-disable no-undef */

import * as  Yup from 'yup';
import User from '../models/user' ;

class SessionController {
   async store(request,response) {


    const schema = Yup.object({
        email : Yup.string().email().required(),
        password: Yup.string().min(6).required(),

    });

  const isValid = await schema.isValid(request.body);


  const emailOrPasswordInCorrect = () => {
    return response.status(401).json({
        error: 'Make sure your email or password are correct '
    });
  }

  if (!isValid){
   return emailOrPasswordInCorrect();
  }


    const {email,password} = request.body

    const user = await User.findOne({
        where :{
            email,
        },
    });

    if (!user){
        return  emailOrPasswordInCorrect();
    }

const isSamePassword  = await user.checkPassword(password);

if (!isSamePassword) {
    return emailOrPasswordIncorrect();
  }

  return response.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
});
}
}



export default new SessionController();