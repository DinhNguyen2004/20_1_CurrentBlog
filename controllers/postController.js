const Post = require('../models/post');

class postController {
    static async index(req, res) {
        // Lấy thông tin từ URL
        const id_category = req.params.id_category;
        const searchPost = req.query.search;

        if (searchPost) {
            // Nếu có tham số tìm kiếm, ưu tiên tìm kiếm bài viết
            const posts = await Post.getByPattern(searchPost);
            return res.status(200).json(posts);
        }

        if (id_category) {
            // Nếu id_category, lấy bài viết thuộc danh mục đó
            const posts = await Post.getCategories(searchPost);
            return res.status(200).json(posts);
        }

        // Nếu không có tham số nào, lấy toàn bộ bài viết
        const posts = await Post.find();
        return res.status(200).json(posts);
    }

    static async createPost(req, res) {
        // get information from request form
        const { id_category, id_writer, title, content } = req.body;
        const id = await Post.savePost(id_category, id_writer, title, content);
        // Check if the post has been saved
        const post = await Post.findById(id)
        res.status(200).json(post);
    }

    static async editPost(req, res) {
        const id = req.params.id;
        const post = await Post.findById(id);
        res.status(200).json({ "message": `Chỉnh sửa post có ${id}`, "data": { post } })
    }

    static async updatePost(req, res) {
        const id = req.params.id
        const { id_category, id_writer, title, content } = req.body
        await Post.update(id, id_category, id_writer, title, content);
        const new_Post = await Post.findById(id)
        res.status(200).json({ "message": `Cập nhật dữ liệu thành công có ${id}`, "data": { new_Post } });
    }

    static async deletePost(req, res) {
        const id = req.params.id;
        const post = await Post.findById(id);
        console.log(post);
        await Post.delete(id);
        res.json({ 'message': `Đã xóa thành công ${id}` })
    }
}

module.exports = postController;