import React, { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
    <Card className="card" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {truncate(post.title, 20)}
        </Typography>

        <Typography variant="body2">
          {truncate(post.body, 60)}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostsCard;
