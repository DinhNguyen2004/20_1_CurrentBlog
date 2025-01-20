const connPromise = require('./db');

class Comment {
    constructor() { }

    static async findById(id_comment) {
        const conn = await connPromise;
        const result = await conn.query('SELECT * FROM post_comment WHERE id = :id_comment', { id_comment });
        const [[rows]] = result;
        return rows;
    }

    static async saveComment(id_post, id_writer, created_date, content) {
        const conn = await connPromise;
        const result = await conn.query('INSERT INTO post_comment (id_post, id_writer, created_date, content) VALUES (:id_post, :id_writer, :created_date, :content)', { id_post, id_writer, created_date, content })
        const [rows] = result;
        // console.log(rows.insertId);
        return rows.insertId;
    }

    static async update(id, id_post, id_writer, created_date, content) {
        console.log(id, id_post, id_writer, created_date, content)
        const conn = await connPromise;
        let queryStr = 'UPDATE post_comment SET id_post=:id_post, id_writer=:id_writer, created_date=:created_date, content=:content WHERE id = :id';
        const result = await conn.query(queryStr, { id, id_post, id_writer, created_date, content });
        console.log(result)
        return true;
    }

    static async delete(id) {
        const conn = await connPromise;
        const result = await conn.query('DELETE FROM post_comment WHERE id =  :id', { id });
        return true;
    }

    static async getPostComments(id_post) {
        const conn = await connPromise;
        const result = await conn.query('SELECT * FROM post_comment WHERE id_post = :id_post', { id_post });
        const [rows] = result;
        return rows;
    }
}

module.exports = Comment;