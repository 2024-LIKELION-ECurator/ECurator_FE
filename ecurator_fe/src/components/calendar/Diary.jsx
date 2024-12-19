import * as S from "./Diarystyled.js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Diary({ selectedDate, setVisibleComponent }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .get("/diary/list/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const fetchedPosts = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          date: new Date(post.created_at).toLocaleDateString("ko-KR"),
        }));
        setPosts(fetchedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const selectedDiaries = posts.filter((post) => post.date === new Date(selectedDate).toLocaleDateString("ko-KR"));

  return (
    <S.DiaryWrap>
      {selectedDiaries.length > 0 ? (
        selectedDiaries.map((diary) => (
          <S.List
            onClick={() => {
              navigate("/community");
            }}
          >
            <S.Content key={diary.id}>
              <p>{diary.date}</p>
              <h3>{diary.title}</h3>
              <p>{diary.content}</p>
            </S.Content>
          </S.List>
        ))
      ) : (
        <S.List
          onClick={() => {
            navigate("/postwrite");
          }}
        >
          <S.Content>
            <p>{new Date(selectedDate).toLocaleDateString("ko-KR")}</p>
            <h3>제목</h3>
            <p>내용</p>
          </S.Content>
          <S.Add>
            <p>+</p>
          </S.Add>
        </S.List>
      )}

      <S.Btn>
        <button
          onClick={() => {
            setVisibleComponent("calendar");
          }}
        >
          뒤로 가기
        </button>
        <button
          onClick={() => {
            navigate("/community");
          }}
        >
          다이어리 가기
        </button>
      </S.Btn>
    </S.DiaryWrap>
  );
}

export default Diary;
