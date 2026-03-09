import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET!

export function signToken(username:string){

  return jwt.sign(
    { username },
    SECRET,
    { expiresIn:"1d" }
  )
}

export function verifyToken(token:string){

  try{
    return jwt.verify(token,SECRET)
  }catch{
    return null
  }

}