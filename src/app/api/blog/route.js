import { Post } from "@/lib/models";
import { conenctToDb } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async (request) => {
    console.log("post get")
    try {
        conenctToDb();
        const posts = await Post.find();
        console.log("posts in get", posts)
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts!");
    }
}