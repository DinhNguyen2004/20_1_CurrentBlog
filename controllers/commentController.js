const Post = require('../models/post');
const Comment = require('../models/comment');

class commentController {
    static async detailPost(req, res) {
        const id_post = req.params.id_post;
        const comment = await Post.getComments(id_post);
        console.log(comment);
        res.status(200).json(comment);
    }

    static async createComment(req, res) {
        // comment có id_post, id_writer, created_date, content trong req.body
        const { id_post, id_writer, created_date, content } = req.body

        // Lưu comment
        const id_comment = await Comment.saveComment(id_post, id_writer, created_date, content);

        // Kiểm tra lại comment vừa tạo.
        const comment = await Comment.findById(id_comment);
        res.status(200).json(comment);
    }

    static async updateComment(req, res) {
        const id = req.params.id_comment;
        const { id_post, id_writer, created_date, content } = req.body;
        await Comment.update(id, id_post, id_writer, created_date, content);
        const new_comment = await Comment.findById(id)
        res.status(200).json({ "message": `Cập nhật dữ liệu thành công có ${id}`, "data": { new_comment } });
    }

    static async deleteComment(req, res) {
        const id = req.params.id_comment;
        const comment = await Comment.findById(id);
        console.log(comment);
        await Comment.delete(id);
        res.json({ 'message': `Đã xóa thành công ${id}` })
    }
}

module.exports = commentController;
