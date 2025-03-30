import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from "@mui/material";

// Uncomment the data fetching logic when you're ready to use the backend
// import { GET_POSTS } from "@/graphql/queries";
// import client from "@/lib/apollo-client";

// // Fetch posts on the server (Server Component)
// async function fetchPosts() {
//   const { data } = await client.query({ query: GET_POSTS });
//   return data.getPosts; // Changed from 'data.posts' to 'data.getPosts'
// }

export default async function Home() {
    // When ready, replace the hardcoded posts with a call to fetchPosts()
    // const posts = await fetchPosts();
    const posts = [
        {
            id: 1,
            title: "Exploring the Cosmos",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec eros euismod, tempus massa vel, consequat magna...",
            author: "Alice",
            createdAt: "2025-03-30T10:00:00Z",
            image: "https://universemagazine.com/wp-content/uploads/2022/02/fljyed2ucaessud.jpg"
        },
        {
            id: 2,
            title: "A Journey Through Space",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
            author: "Bob",
            createdAt: "2025-03-29T12:00:00Z",
            image: "https://universemagazine.com/wp-content/uploads/2022/02/fljyed2ucaessud.jpg"
        },
        {
            id: 3,
            title: "A Journey Through Space",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
            author: "Bob",
            createdAt: "2025-03-29T12:00:00Z",
            image: "https://universemagazine.com/wp-content/uploads/2022/02/fljyed2ucaessud.jpg"
        },
        {
            id: 4,
            title: "A Journey Through Space",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
            author: "Bob",
            createdAt: "2025-03-29T12:00:00Z",
            image: "https://universemagazine.com/wp-content/uploads/2022/02/fljyed2ucaessud.jpg"
        },
        {
            id: 5,
            title: "A Journey Through Space",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
            author: "Bob",
            createdAt: "2025-03-29T12:00:00Z",
            image: "https://universemagazine.com/wp-content/uploads/2022/02/fljyed2ucaessud.jpg"
        },
        {
            id: 6,
            title: "A Journey Through Space",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
            author: "Bob",
            createdAt: "2025-03-29T12:00:00Z",
            image: "https://universemagazine.com/wp-content/uploads/2022/02/fljyed2ucaessud.jpg"
        },
        {
            id: 7,
            title: "A Journey Through Space",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
            author: "Bob",
            createdAt: "2025-03-29T12:00:00Z",
            image: "https://universemagazine.com/wp-content/uploads/2022/02/fljyed2ucaessud.jpg"
        },
        // Add more hardcoded posts if needed
    ];

    return (
        <div style={{ padding: "16px" }} className="w-full">
            <Typography variant="h3" component="h1" gutterBottom>
                Explore the Universe
            </Typography>

            <Grid container spacing={2} sx={{flexWrap: "wrap"}}>
                {posts.map((post) => (
                    // Added component="div" to satisfy the required prop for Grid item
                    <Grid item component="div" xs={12} sm={4} key={post.id}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={post.image}
                                    alt={post.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {post.content.slice(0, 100)}...
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        color="text.secondary"
                                        sx={{ marginTop: "8px" }}
                                    >
                                        By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}