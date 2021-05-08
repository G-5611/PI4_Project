// sql settings
const settings = {
    server: process.env.DB_SERVER_ADDRESS,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DATABASE
};

module.exports = {
    db_settings: settings
}