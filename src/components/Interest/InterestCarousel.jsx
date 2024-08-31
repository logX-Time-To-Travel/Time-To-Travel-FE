import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './InterestCarousel.css';
import { useNavigate } from 'react-router-dom';

const InterestCarousel = ({ posts }) => {
  const navigate = useNavigate();

  const handleClick = (index, item) => {
    const postId = posts[index].postId;
    navigate(`/post/${postId}`);
  };

  return (
    <Carousel
      showThumbs={false}
      showArrows={true}
      infiniteLoop
      useKeyboardArrows
      autoPlay
      interval={5000}
      statusFormatter={() => {}}
      onClickItem={handleClick}
    >
      {posts.map((post) => (
        <div key={post.postId} className="carousel-slide">
          <img
            src={`http://localhost:8080${post.thumbnail}`}
            alt={post.title}
            className="carousel-image"
          />
          <div className="carousel-overlay">
            <div className="carousel-title">{post.title}</div>
            <div className="carousel-meta">
              <div className="carousel-profile-image-container">
                <img
                  src={`http://localhost:8080${post.profileImageUrl}`}
                  alt={post.username}
                  className="carousel-profile-image"
                />
              </div>
              <div className="carousel-profile-info">
                {post.username}님의{' '}
                {new Date(post.createdAt).toLocaleDateString('ko-KR')} 전 게시글
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default InterestCarousel;
