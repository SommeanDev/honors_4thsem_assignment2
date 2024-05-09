import './connection.js';
import Post from '../models/post.js';

const up = async () => {{
    await Post.create([{
            author: "Admin User",
            title: "Post 1",
            content: "Content 1",
        }]);
    }
    process.exit(0);
};

const down = async () => {
    await User.deleteMany();
};

queueMicrotask(up);