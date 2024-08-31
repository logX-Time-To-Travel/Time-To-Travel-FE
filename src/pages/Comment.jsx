import { useNavigate, useParams } from 'react-router-dom';
import './Comment.css';
import BackIcon from '../assets/Icon_ Back 1.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import getTimeAgo from '../utils/useTimeAgo';

const Comment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedCommentId, setExpandedCommentId] = useState(null);
  const [user, setUser] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [newComment, setNewComment] = useState('');

  // 서버에서 받을 데이터의 기본 구조를 설정합니다.
  const [comments, setComments] = useState([
    {
      id: null,
      postId: null,
      username: '',
      profileImageUrl: '',
      content: '',
      createdAt: '',
    },
  ]);

  const handleToggleExpand = (id) => {
    setExpandedCommentId(expandedCommentId === id ? null : id);
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText('');
  };

  const handleSave = async () => {
    if (newComment.trim() === '') return;

    const newCommentData = {
      memberId: user.memberId,
      postId: id,
      content: newComment,
    };

    try {
      await axios.post('http://localhost:8080/comment/add', newCommentData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      window.location.reload();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleEdit = async (commentId) => {
    const updatedCommentData = {
      memberId: user.memberId,
      postId: id,
      content: editText,
    };

    try {
      // 수정 API 요청
      const response = await axios.put(
        `http://localhost:8080/comment/${commentId}`,
        updatedCommentData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // UI에 반영
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? response.data : comment
        )
      );

      setEditingCommentId(null);
      setEditText('');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleDeleteClick = async (commentId) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        // 삭제 API 요청
        await axios.delete(`http://localhost:8080/comment/${commentId}`, {
          withCredentials: true,
        });

        // UI에 반영
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const fetchData = async () => {
    const userResponse = await axios.get(
      'http://localhost:8080/member/session',
      {
        withCredentials: true,
      }
    );

    const commentResponse = await axios.get(
      `http://localhost:8080/comment/${id}`,
      {
        withCredentials: true,
      }
    );

    setUser(userResponse.data);
    setComments(commentResponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="comment-container">
      <div className="comment-header">
        <div
          className="comment-backward"
          onClick={() => navigate(`/post/${id}`)}
        >
          <img src={BackIcon} alt="뒤로가기" />
        </div>
        <div className="comment-title">댓글 {comments.length}개</div>
      </div>
      <div className="comment-array">
        {comments.map((comment) => {
          const isAuthor = user.username === comment.username;
          const isExpanded = expandedCommentId === comment.id;
          const isLongContent = comment.content.length > 130;
          const isEditing = editingCommentId === comment.id;

          return (
            <div key={comment.id} className="comment-element">
              <img
                src={comment.profileImageUrl}
                alt="프로필 이미지"
                className="comment-avatar"
              />
              <div className="comment-content">
                <div className="comment-username">{comment.username}</div>
                {isEditing ? (
                  <div className="comment-editing">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="comment-edit-input"
                    />
                    <div className="comment-edit-buttons">
                      <div className="comment-edit-buttons-gap">
                        <button
                          className="comment-button"
                          onClick={() => handleEdit(comment.id)}
                        >
                          완료
                        </button>
                        <button
                          className="comment-button"
                          onClick={handleCancelEdit}
                        >
                          취소
                        </button>
                      </div>
                      <button
                        className="comment-button"
                        onClick={() => handleDeleteClick(comment.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="comment-text">
                      {isExpanded || !isLongContent
                        ? comment.content
                        : `${comment.content.slice(0, 130)}...`}
                    </div>
                    <div className="comment-more">
                      <div>
                        {isLongContent && (
                          <button
                            className="comment-toggle"
                            onClick={() => handleToggleExpand(comment.id)}
                          >
                            {isExpanded ? '접기' : '더보기'}
                          </button>
                        )}
                      </div>
                      {isAuthor && (
                        <div className="comment-edit">
                          <button
                            className="comment-button"
                            onClick={() => handleEditClick(comment)}
                          >
                            수정
                          </button>
                          <button
                            className="comment-button"
                            onClick={() => handleDeleteClick(comment.id)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="comment-time">
                      {getTimeAgo(comment.createdAt)}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="comment-write">
        <input
          type="text"
          className="comment-input"
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-submit" onClick={handleSave}>
          전송
        </button>
      </div>
    </div>
  );
};

export default Comment;
