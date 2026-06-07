import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';
export async function POST(request) {
    const {name,email} = await request.json();

    const token = jwt.sign({name,email},process.env.JWT_SECRET,{
        expiresIn:"1d"
    }) 

    const response = NextResponse.json({message:"authenticated"},{status:200})

    response.cookies.set("customerToken",token,{
        httpOnly:true,
        maxAge:60 * 60 * 24,
        path:"/",
        secure:true 
    })
    return response;
}