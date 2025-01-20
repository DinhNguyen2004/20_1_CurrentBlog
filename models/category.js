const connPromise = require('./db');

class Category {
    constructor() { }
    static async getCategoryPosts(id_category) {
        const conn = await connPromise;
        const result = await conn.query('SELECT * FROM post WHERE id_category = :id_category', { id_category });
        console.log(result);
        const [row] = result;
        return row;
    }
}


module.exports = Category;