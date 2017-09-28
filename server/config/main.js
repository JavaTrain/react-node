module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'super secret passphrase',
    // Database connection information
    'database': {
        config: {
            host: '172.17.0.1',
            port: 3307,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        db: 'node_api',
        user: 'root',
        pass: '123456'
    },
    'port': process.env.PORT || 3000
};