
module.exports = {
    development: {
        username: "root",
        password: "admin",
        database: "new_new",
        host: "localhost",
        port: 3305,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
        // pool: { "max": 5, "min": 0, "idle": 10000 }
    },
    production: {
        username: "jetluxury",
        password: "jetluxury!@#",
        database: "jet_luxury",
        host: "220.75.248.184",
        port: 13306,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
        // pool: { "max": 5, "min": 0, "idle": 10000 }
    }

    // 실서버
    // production: {
    //     username: "jetluxury",
    //     password: "jetluxury!@#",
    //     database: "jet_luxury",
    //     host: "abitree.ccaniqrc8qkw.ap-northeast-2.rds.amazonaws.com",
    //     port: 3306,
    //     dialect: 'mysql',
    //     define: {
    //         timestamps: false
    //     }
    //     // pool: { "max": 5, "min": 0, "idle": 10000 }
    // }
};
