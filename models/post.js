const connPromise = require('./db');
const Comment = require('./comment');
const Category = require('./category');

// class PostFilter {
//     /** @type {String} */
//     Post;
// }

class Post {
    constructor() { }

    static async savePost(id_category, id_writer, title, content) {
        const conn = await connPromise;
        const result = await conn.query('INSERT INTO post (id_category, id_writer, title, content) VALUES (:id_category, :id_writer, :title, :content)', { id_category, id_writer, title, content })
        const [rows] = result;
        // console.log(rows.insertId);
        return rows.insertId;
    }

    /**
     * @param 
     */
    static async find() {
        const conn = await connPromise;
        const result = await conn.query('SELECT * FROM post');
        const [rows] = result;
        return rows;
    }

    // 1 cot
    static async getByPattern(searchPost) {
        const conn = await connPromise;
        let queryStr = 'SELECT * FROM post WHERE content LIKE :content';
        const result = await conn.query(queryStr, { content: `%${searchPost}%` });
        // const result = await conn.query('SELECT * FROM post WHERE content LIKE ?', [`%${searchPost}%`]);
        const [rows] = result;
        return rows;
    }

    static async findById(id) {
        const conn = await connPromise;
        const result = await conn.query('SELECT * FROM post WHERE id = :id', { id });
        const [[row]] = result;
        return row;
    }

    static async update(id, id_category, id_writer, title, content) {
        const conn = await connPromise;
        let queryStr = 'UPDATE post SET id_category=:id_category, id_writer=:id_writer, title=:title, content=:content WHERE id = :id';
        const result = await conn.query(queryStr, { id, id_category, id_writer, title, content });
        return true;
    }

    static async delete(id) {
        const conn = await connPromise;
        const result = await conn.query('DELETE FROM post WHERE id =  :id', { id });
        return true;
    }

    static async getCategories(id_category) {
        return Category.getCategoryPosts(id_category);
    }
    static async getComments(id_post) {
        return Comment.getPostComments(id_post);
    }
}

// Post.find().then(console.log);

//

module.exports = Post;