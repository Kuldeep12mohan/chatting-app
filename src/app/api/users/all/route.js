import { NextRequest,NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {getDataFromToken} from "@/helpers/getDataFromToken";
await connectDB();

export const GET = async(request)=>
{
  try{
    const userID = await getDataFromToken(request);
    console.log("request",request);
    const users = await User.find({
      _id:{
        $ne:userID
      }
    });
    return NextResponse.json({
      message:"users found successfully",
      users
    });
  }
  catch(error)
  {
    return NextResponse.json({
      error:error.message,
    })
  }
}