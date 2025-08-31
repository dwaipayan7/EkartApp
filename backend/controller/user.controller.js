import { config } from "dotenv";
import User from "../models/user.js";
import jwt from 'jsonwebtoken'
config()

class UserController {

    static generateToken(user) {
        const accessToken = jwt.sign(
            { userId: user?._id },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        const refreshToken = jwt.sign(
            { userId: user?._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return { accessToken, refreshToken }
    }

    static async getUser(req, res) {
        try {
            res.send("Dwaipayan Biswas");
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async loginOrSignUp(req, res) {
        const { phone, address } = req.body;
        try {

            let user = await User.findOne({ phone })

            if (!user) {
                user = new User({ address, phone })
                await user.save();
            } else {
                user.address = address;
                await user.save();
            }

            const { accessToken, refreshToken } = UserController.generateToken(user.toObject())

            res.status(200).json({
                user,
                accessToken,
                refreshToken
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

}

export default UserController;