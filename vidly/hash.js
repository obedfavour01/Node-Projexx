import bcrypt, { genSalt } from "bcrypt";

async function run() {
    const salt = await genSalt(10)
    console.log(salt)
}

run();
// set vidly_jwtPrivateKey=secretPrivateKey
// set PORT=4000