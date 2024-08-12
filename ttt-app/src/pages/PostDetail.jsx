import Navbar from '../components/Navbar/Navbar';
import './PostDetail.css';

const PostDetail = () => {
  // 더미 데이터 (HTML 내용 포함)
  const post = {
    id: 1,
    username: '나는 zㅣ존짱짱므째이',
    title: '오늘은 석계문고에 다녀왔습니다.',
    data: `<p>요즘 여러 신축 건물에 위치한 예쁜 서점들을 자주 들르는 편인데, <br><br><br><br><br>테라코타 벽돌을 테마로 그에 맞춰 아름다운 조형물을 내세우거나 아예 고풍스러운 카페를 콘셉트로 잡은 후 샹들리에를 달고 은촛대를 놓은 모습을 보면 저도 모르게 만족감이 느껴집니다. 하지만 그러면서도, 어릴 적 많이 볼 수 있었던 지하 잡화점이나 문구점, 서점이 그리워질 때가 있습니다...</p>
    <p>지하는 사실 그렇게 선호되는 건물 양식은 아닙니다. 습해서 곰팡이가 잘 피기 쉽상이고, 여름엔 더 덥고 겨울엔 더 추우니까요. 그래서 그런지 지하에 위치한 상점을 보기가 요 근래에는 더 힘들어진 듯합니다.</p>`,
    locations: [
      { id: 1, name: '석계문고' },
      { id: 2, name: '또 다른 장소' },
    ],
    likeCount: 53,
    viewCount: 123,
    createdAt: '2024년 3월 21일',
  };

  const isSingleLocation = post.locations.length === 1;
  const locationText = isSingleLocation
    ? '단일 여행'
    : `${post.locations.length}개의 장소`;

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <div className="post-detail-title">{post.title}</div>
        <div className="post-detail-info">
          <span className="post-detail-username">{post.username}</span>
          <strong>|</strong>
          <span className="post-detail-date">{post.createdAt}</span>
        </div>
        <div className="post-detail-type">{locationText}</div>
      </div>
      <div
        className="post-detail-content"
        dangerouslySetInnerHTML={{ __html: post.data }}
      />
      <div className="post-detail-footer">
        <div className="post-detail-more">
          <div className="post-detail-likes">{post.likeCount}</div>
          <div className="post-detail-views">{post.viewCount}</div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};

export default PostDetail;
