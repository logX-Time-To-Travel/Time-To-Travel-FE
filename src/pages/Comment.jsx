import { useNavigate, useParams } from 'react-router-dom';
import './Comment.css';
import BackIcon from '../assets/Icon_ Back 1.png';
import { useState } from 'react';

const Comment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedCommentId, setExpandedCommentId] = useState(null);
  const [username, setUsername] = useState('tester2');

  const handleToggleExpand = (id) => {
    setExpandedCommentId(expandedCommentId === id ? null : id);
  };

  const dummyData = {
    commentCount: 8,
    comments: [
      {
        id: 1,
        username: 'tester1',
        avatarColor: '#3D00FF',
        content:
          '사람들이 쓰는 댓글은 이렇게 표시됩니다. 이름을 살짝 줄이고 텍스트는 작은 글씨 크기 표준 그대로 유지합니다. Figma 기준으로 따지면 이름의 크기는 12, 텍스트(이 메시지)의 크기는 14입니다.',
        time: '12개월 전',
      },
      {
        id: 2,
        username: 'tester3',
        avatarColor: '#000000',
        content:
          '글이 너무 길어지면 어떻게 될까요? 저 맨 위에 있는 댓글은 최대 줄 수 4줄을 준수하고 있군요. 만약 4줄을 넘어 5줄 이상 작성하게 되면 글이 한 번에 보이지 않게 됩니다. 대신 “더보기” 버튼을 눌러 댓글을 계속 읽으실 수 있습니다. 그렇다면 도로 접는 기능도 있으면 편리하겠네요. “더보기”를 눌렀다면 이처럼 그 자리에 “접기” 버튼이 대신 제공됩니다.',
        time: '3개월 전 (수정됨)',
      },
      {
        id: 3,
        username: 'PoundCake1415',
        avatarColor: '#BEBEBE',
        content:
          '내가 직접 쓴 댓글을 수정이니 삭제가 가능해야겠죠? 바로 아래에 추가 버튼이 나타납니다.',
        time: '5초 전',
      },
      {
        id: 4,
        username: 'tester2',
        avatarColor: '#FFDD00',
        content:
          '댓글 본문과 작성된 날짜 사이의 공간은 25가 원칙입니다. “더보기” 버튼이 있어야 할 경우 그 “더보기” 버튼도 본문에 포함합니다.',
        time: '3개월 전 (수정됨)',
      },
      {
        id: 5,
        username: 'tester4',
        avatarColor: '#FF5733',
        content: '또 다른 댓글입니다. 여기에는 별다른 내용이 없습니다.',
        time: '2주 전',
      },
      {
        id: 6,
        username: 'tester5',
        avatarColor: '#33FF57',
        content: '길이가 짧은 댓글입니다.',
        time: '1일 전',
      },
      {
        id: 7,
        username: 'tester6',
        avatarColor: '#5733FF',
        content: '여기에 또 다른 댓글이 있습니다. 글의 길이가 적당합니다.',
        time: '3시간 전',
      },
      {
        id: 8,
        username: 'tester7',
        avatarColor: '#FF33A1',
        content:
          '마지막 댓글입니다. 더 긴 글을 작성해서 스크롤 기능을 확인합니다.',
        time: '방금 전',
      },
    ],
  };

  return (
    <div className="comment-container">
      <div className="comment-header">
        <div
          className="comment-backward"
          onClick={() => {
            console.log('뒤로가기');
            navigate(`/post/${id}`);
          }}
        >
          <img src={BackIcon} />
        </div>
        <div className="comment-title">댓글 {dummyData.commentCount}개</div>
      </div>
      <div className="comment-array">
        {dummyData.comments.map((comment) => {
          const isAuthor = username === comment.username;
          const isExpanded = expandedCommentId === comment.id;
          const isLongContent = comment.content.length > 130;

          return (
            <div key={comment.id} className="comment-element">
              <div
                className="comment-avatar"
                style={{ backgroundColor: comment.avatarColor }}
              ></div>
              <div className="comment-content">
                <div className="comment-username">{comment.username}</div>
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
                      <button className="comment-button">수정</button>
                      <button className="comment-button">삭제</button>
                    </div>
                  )}
                </div>
                <div className="comment-time">{comment.time}</div>
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
        />
        <button className="comment-submit">전송</button>
      </div>
    </div>
  );
};

export default Comment;
