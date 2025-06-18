export const DBBlogPostSchema = {
    author: { type: String, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    selectedImage: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: false },
    isMain: { type: Boolean, required: true  }
}