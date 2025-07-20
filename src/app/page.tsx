// src/app/page.tsx
import Link from "next/link";
import client from "@/lib/apollo-client";
import { GET_POSTS } from "@/graphql/queries";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";

// Type for posts returned by GET_POSTS
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  image?: string;
}

async function fetchPosts(): Promise<Post[]> {
  const { data, errors } = await client.query<{ getPosts: Post[] }>({
    query: GET_POSTS,
    errorPolicy: "all",
  });

  if (errors?.length) {
    console.error("GET_POSTS errors:", errors);
    return [];
  }
  return data.getPosts;
}

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Explore the Universe
      </Typography>

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={4} key={post.id}>
            <Link href={`/article/${post.id}`} passHref legacyBehavior>
              <CardActionArea component="a" sx={{ textDecoration: "none" }}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={
                      post.image ??
                      "https://universemagazine.com/wp-content/uploads/2022/02/fljyed2ucaessud.jpg"
                    }
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.content.slice(0, 100)}…
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      By {post.author} on{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(post.createdAt))}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
