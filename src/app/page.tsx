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
import CategoryButton from "@/components/CategoryButton";

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
      <div className={"homepage-wrapper"}>
        <Header />
        <div className="posts-container">
          <div className="w-auto flex flex-row gap-[32px]">
            <CategoryButton>Category1</CategoryButton>
            <CategoryButton>Category2</CategoryButton>
            <CategoryButton>Category3</CategoryButton>
            <CategoryButton>Category4</CategoryButton>
          </div>
          <div className="posts-list">
            {posts.map((post) => (
              <Link
                href={`/article/${post.id}`}
                key={post.id}
                style={{
                  textDecoration: "none",
                  width: "100%",
                  display: "block",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "394px",
                    borderRadius: "12px",
                    border: "1px solid #333336",
                    padding: "40px",
                    backgroundColor: "#0F1014",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "50px",
                    boxSizing: "border-box",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      transition: "transform 0.2s ease-in-out",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={post.image || "/placeholder-image.jpg"}
                    alt={post.title}
                    sx={{
                      width: "314px",
                      height: "314px",
                      minWidth: "314px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <CardContent
                    sx={{
                      flex: 1,
                      padding: 0,
                      "&:last-child": { paddingBottom: 0 },
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{
                        color: "#666666",
                        fontSize: "14px",
                        marginBottom: "32px",
                      }}
                    >
                      By {post.author} on{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(post.createdAt))}
                    </Typography>
                    <div>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: 600,
                          marginBottom: "16px",
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#A3A3A3",
                          lineHeight: 1.6,
                          marginBottom: "24px",
                        }}
                      >
                        {post.content.slice(0, 150)}…
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
