const connPromise = require('./db');

class UserFilter {
    /** @type {String} */
    role;
}

class User {
    constructor() {
    }
    /**
    * 
    * @param {UserFilter} userFilter 
    * @returns {Promise<Array<User>>}
    */
    static async find(userFilter) {
        const conn = await connPromise;

        let queryStr = 'SELECT * FROM user';
        const wheres = [];
        const whereParams = [];
        if (userFilter) {
            if (userFilter.role) {
                wheres.push('role = ?');
                whereParams.push(userFilter.role);
            }
            queryStr += ' WHERE ' + wheres.join('AND');
        }

        const result = await conn.query(queryStr, whereParams);
        const [rows] = result;
        return rows;
    }

    /**
     * @param {Number} id 
     * @returns {Promise<User>}
     */
    static async findById(id) {
        const conn = await connPromise;
        const result = await conn.query('SELECT * FROM user WHERE id = :id', { id });
        const [[row]] = result;
        return row;
    }

    /**
   * @param {String} email
   * @returns {Promise<User>}
   */
    static async findByEmail(email) {
        const conn = await connPromise;
        const result = await conn.query('SELECT * FROM user WHERE email = :email', { email });
        const [[row]] = result;
        return row;
    }

    static async create(email, password, role, is_active, is_following, is_verified) {
        const conn = await connPromise;
        const result = await conn.query('INSERT INTO user (email, password, role, is_active, is_following, is_verified) VALUES (:email, :password, :role, :is_active, :is_following, :is_verified)', { email, password, role, is_active, is_following, is_verified });

        return result;
    }
}

// User.find().then(console.log); // SELECT * FROM user

// const filter = new UserFilter();     // SELECT * FROM user WHERE role = "admin"
// filter.role = "admin";
// User.find(filter).then(console.log);

// User.findById(1).then(console.log); // SELECT * FROM user WHERE id = 1

// User.findByEmail('rapperqtv1@gmail.com').then(console.log); // SELECT * FROM user WHERE email =
// User.findByEmail('rapperqtvxxx').then(console.log); // SELECT * FROM user WHERE email =
module.exports = User;