// src/app/page.tsx
import Link from "next/link";
import client from "@/lib/apollo-client";
import { GET_POSTS } from "@/graphql/queries";
import Header from "@/components/header";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import "./homepage.css";

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
    <div className="home-page">
      <div className={"wrapper"}>
        <Header />
        <div className="posts-list">
          {posts.map((post) => (
            <Link
              href={`/article/${post.id}`}
              key={post.id}
              style={{ textDecoration: "none" }}
            >
              <div className="post-card">
                <Card sx={{ maxWidth: 300 }}>
                  <CardMedia
                    component="img"
                    image={post.image || "/placeholder-image.jpg"} // Add fallback image
                    alt={post.title}
                    height="200"
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
