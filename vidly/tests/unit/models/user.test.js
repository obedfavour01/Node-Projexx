// These lines make "require" available
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import User from "../../../models/User"
import config from 'config'
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

describe("user.genAuthToken", () => {
    it("should return a valid JWT", () => {

        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin:true}
        const user = new User(payload)
        const token = user.generateAuthToken();

        const decoded = jwt.verify(token,config.get("jwtPrivateKey"))
        
        expect(decoded).toMatchObject(payload)
        
    })
})