import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PostListItem from "./PostListItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 152px;
    gap: 35px;
    justify-content: center;
    & > * {
        :not(:last-child) {
            margin-bottom: 1px;
        }
    }
`;

function PostListComponent() {
    const [posts, setPosts] = useState([]);  // 포스트 상태

    useEffect(() => {
        // 인증 토큰 추가
        const accessToken = localStorage.getItem("access_token");

        axios
            .get("/diary/list/", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`, // 토큰 추가
                },
            })
            .then((response) => {
                const fetchedPosts = response.data.map((post) => ({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    date: new Date(post.created_at).toLocaleDateString(),
                }));
                setPosts(fetchedPosts);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []); // 컴포넌트가 마운트 될 때만 실행

    return (
        <Wrapper>
            {posts.map((post) => (
                <PostListItem
                    key={post.id}
                    post={post}
                />
            ))}
        </Wrapper>
    );
}

export default PostListComponent;
