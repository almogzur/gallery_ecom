export const BlogPostSchema = {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    tags: { type: [String], required: false }
}