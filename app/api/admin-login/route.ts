import { NextResponse } from "next/server"
import { signToken } from "@/lib/auth"

export async function POST(req:Request){

  const { username,password } = await req.json()

  if(
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ){

    const token = signToken(username)

    const res = NextResponse.json({success:true})

    res.cookies.set("admin_token",token,{
      httpOnly:true,
      path:"/",
      maxAge:60*60*24
    })

    return res
  }

  return NextResponse.json(
    {error:"Invalid credentials"},
    {status:401}
  )

}