```javascript
// pages/blog/[slug].js

export async function getServerSideProps(context) {
  const { slug } = context.params;
  try {
    const res = await fetch(`https://api.example.com/posts/${slug}`);
    if (!res.ok) {
      console.error(`API request failed with status: ${res.status}`);
      return { notFound: true }; // Or return an error page
    }
    const data = await res.json();
    if (!data || !data.title) { // Add check for unexpected data format
      console.error('Unexpected data format from API');
      return { notFound: true };
    }
    return {
      props: { post: data },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { notFound: true }; // Or return an error page
  }
}

function BlogPost({ post }) {
  // ...
}
export default BlogPost;
```