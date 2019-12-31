require('dotenv').config();

interface TConfig {
 JWT_SECRET: string;
 MONGO: string
 PORT: number
}

const config: TConfig = {
 JWT_SECRET: process.env.JWT_SECRET || 'secretKey',
 MONGO: process.env.MONGO || 'mongodb://localhost:27017',
 PORT: parseInt(process.env.PORT || "4000")
};
export default config;
