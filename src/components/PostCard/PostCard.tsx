import React, { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import "./PostCard.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

type PostItemType = {
  post: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
};

const PostsCard: FC<PostItemType> = ({ post }) => {
  const truncate = (content: string, before: number) => {
    return content.slice(0, before) + "...";
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {truncate(post.title, 1)}
          </Avatar>
        </Stack>
        <Typography variant="h5" component="div">
          {truncate(post.title, 10)}
        </Typography>

        <Typography variant="body2">
          {truncate(post.body, 100)}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostsCard;
