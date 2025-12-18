import connectDB from "./config/db.js";
import seedAdmins from "./seed/adminSeed.js";
import app from "./app.js";
import config from "./config/config.js";

const startServer = async () => {
    await connectDB();
    await seedAdmins();

    app.listen(config.PORT, () => {
        console.log(`🚀 Server running on port ${config.PORT}`);
    });
};

startServer();
