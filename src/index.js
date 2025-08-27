import { config } from "./config/env.config.js";
import app from "./app.js";
import { connectDatabase } from "./config/db.config.js";

connectDatabase();
app.listen(config.port,"0.0.0.0", () => {
    console.log(`Server Status: \t\tRunning on http://localhost:${config.port}`);
});