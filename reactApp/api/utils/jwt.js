import jwt from 'jsonwebtoken';

export const jwtToken = async(userId,res)=>{
  const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn: '7d'
  })
  res.cookie('anti-social-token',token,{
    maxAge: 1000*60*60*24,
    httpOnly: true,
  })
}

