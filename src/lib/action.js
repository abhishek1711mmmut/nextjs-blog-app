"use server"

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { conenctToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs"

export const addPost = async (previousState, formdata) => {
    // "use server"  // or just use at the top

    // const title = formdata.get("title");
    // const desc = formdata.get("desc");
    // const slug = formdata.get("slug");

    const { title, desc, slug, userId } = Object.fromEntries(formdata);

    try {
        conenctToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        });

        await newPost.save();
        console.log("saved to db");
        revalidatePath("/blog");   // to make sure new post will be immediately reflected
        revalidatePath("/admin");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" }
    }
}

export const addUser = async (previousState, formdata) => {

    const { username, email, password, isAdmin } = Object.fromEntries(formdata);

    try {
        conenctToDb();
        const newUser = new User({
            username,
            email,
            password,
            isAdmin
        });

        await newUser.save();
        console.log("saved to db");
        revalidatePath("/admin");   // to make sure new post will be immediately reflected
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" }
    }
}

export const deletePost = async (formdata) => {
    // "use server"  // or just use at the top

    const { id } = Object.fromEntries(formdata);

    try {
        conenctToDb();
        await Post.findOneAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/blog");   // to make sure new post will be immediately reflected
        revalidatePath("/admin");
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" }
    }
}

export const deleteUser = async (formdata) => {
    // "use server"  // or just use at the top

    const { id } = Object.fromEntries(formdata);

    try {
        conenctToDb();
        await User.findOneAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");   // to make sure new post will be immediately reflected
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" }
    }
}

export const handleGithubLogin = async () => {
    await signIn("github");
}

export const handleLogout = async () => {
    await signOut();
}

export const register = async (previousState, formdata) => {
    const { username, email, password, confirmpassword } = Object.fromEntries(formdata);
    if (password !== confirmpassword) {
        return { error: "Passwords do not match!" };
    }
    try {
        conenctToDb();
        const user = await User.findOne({ username });
        if (user) {
            return { error: "User already exists!" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newuser.save();
        console.log("saved to db");

        return { success: true };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" };
    }
}

export const login = async (previousState, formdata) => {
    const { username, password } = Object.fromEntries(formdata);
    try {
        await signIn("credentials", { username, password });
    } catch (error) {
        console.log(error);
        if (error.type === "CredentialsSignin") {
            return { error: "Invalid username or password!" };
        }
        throw error;
    }
}