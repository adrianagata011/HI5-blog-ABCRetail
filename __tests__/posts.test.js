const Post = require('../models/posts'); // Ajusta según tu estructura

describe('Post Model', () => {
  it('should create a new post with valid data', () => {
    const post = new Post({ title: 'Test Post', content: 'Test content' });
    expect(post.title).toBe('Test Post');
    expect(post.content).toBe('Test content');
  });
});
