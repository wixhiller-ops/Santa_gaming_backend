import User from "../models/User.js";
import bcrypt from "bcryptjs";

const seedAdmins = async () => {
    try {
        const admins = [
            { username: "santa1", password: "admin123" },
            { username: "santa2", password: "santa123" },
        ];

        for (const admin of admins) {
            const exists = await User.findOne({ username: admin.username });

            if (!exists) {
                const hashedPassword = await bcrypt.hash(admin.password, 10);

                await User.create({
                    username: admin.username,
                    password: hashedPassword,
                    role: "admin",
                });

                console.log(`✅ Admin created: ${admin.username}`);
            }
        }
    } catch (error) {
        console.error("❌ Admin seed failed:", error.message);
    }
};

export default seedAdmins;
