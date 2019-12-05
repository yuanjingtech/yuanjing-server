require('dotenv').config();

interface TConfig {
 MONGO: string
 PORT: number
}

const config: TConfig = {
 MONGO: process.env.MONGO || 'mongodb://localhost:27017',
 PORT: parseInt(process.env.PORT || "4000")
};
export default config;
