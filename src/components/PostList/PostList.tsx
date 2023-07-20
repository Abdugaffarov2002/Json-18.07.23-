import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import "./PostList.css";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/MoreVert";

interface PostsType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<PostsType[] | null>(null);

  const [search, setSearch] = useState<string>("");

  const [totalCount, setTotalCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const API = "https://jsonplaceholder.typicode.com";
  const getPosts = async () => {
    try {
      const result = await axios(`${API}/posts?q=${search}&_page=${page}`);
      setPosts(result.data);

      const pageTotalCount = +result.headers["x-total-count"];
      const totalPage = Math.ceil(pageTotalCount / 10);

      setTotalCount(totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [search, page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handleHomePage = () => {
    setPage((prevPage) => (prevPage = 1));
  };
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Paper square sx={{ pb: "50px" }}>
          <Typography
            className="inbox"
            variant="h5"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          >
            <h3>Inbox</h3>
          </Typography>
          <List className="list" sx={{ mb: 2 }}>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </List>
        </Paper>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar className="toolbar">
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>

            <Stack className="btns" direction="row" spacing={2}>
              <Button disabled={page === 1} onClick={handlePrevPage}>
                Prev
              </Button>
              <Button
                disabled={page === 1}
                onClick={handleHomePage}
                variant="contained"
              >
                Home
              </Button>
              <Button
                disabled={page === totalCount}
                onClick={handleNextPage}
                variant="outlined"
              >
                Next
              </Button>
            </Stack>

            <StyledFab color="secondary" aria-label="add">
              <AddIcon />
            </StyledFab>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton color="inherit">
              <input
                className="search_inp"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </IconButton>
            <IconButton color="inherit">
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
};

export default PostList;
