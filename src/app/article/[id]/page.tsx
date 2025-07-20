// src/app/article/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@/lib/apollo-client";
import { GET_POST } from "@/graphql/queries";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";
import Image from "next/image";

// TS type matching the GET_POST result
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  category?: { name: string };
  tags?: { name: string }[];
  comments?: {
    id: number;
    content: string;
    author: string;
    createdAt: string;
  }[];
}

// 1) HEAD metadata loader
export async function generateMetadata({
  params,
}: {
  // in Next 13.4+, params is a promise for dynamic routes
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // **await** the params before using
  const { id } = await params;
  const idNum = parseInt(id, 10);

  const { data, errors } = await client.query<
    { getPost: Post },
    { id: number }
  >({
    query: GET_POST,
    variables: { id: idNum },
    errorPolicy: "all",
  });

  if (errors?.length || !data.getPost) {
    return { title: "Post Not Found" };
  }

  return {
    title: data.getPost.title,
    description: data.getPost.content.slice(0, 150),
  };
}

// 2) Page component
export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parseInt(id, 10);

  // fetch once more for the page body
  let data: { getPost: Post };
  let errors: readonly any[] | undefined;

  try {
    const result = await client.query<{ getPost: Post }, { id: number }>({
      query: GET_POST,
      variables: { id: idNum },
      errorPolicy: "all",
    });
    data = result.data;
    errors = result.errors;
  } catch (networkError: any) {
    console.error(
      "HTTP-level error:",
      networkError.networkError?.result?.errors
    );
    return notFound();
  }

  // handle GraphQL validation or missing-post
  if (errors?.length || !data.getPost) {
    console.error("GraphQL errors:", errors);
    return notFound();
  }

  const post = data.getPost;
  // title
  // image
  // const
  // author
  // createdAt

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <div>
        <Typography variant="h5" sx={{ mt: 4 }}>
          {post.title}
        </Typography>
        <div>
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={450}
              style={{ width: "100%", height: "auto", marginTop: "16px" }}
            />
          )}
        </div>
        <div>{post.content}</div>
        <Typography variant="body2" color="text.secondary">
          By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
      </div>
    </Container>
  );
}
