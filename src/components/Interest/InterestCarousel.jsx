import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './InterestCarousel.css';
import { useNavigate } from 'react-router-dom';

const InterestCarousel = ({ posts }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/post/${id}`);
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
            src={post.imageUrl}
            alt="Post Image"
            className="carousel-image"
          />
          <div className="carousel-overlay">
            <div className="carousel-title">{post.title}</div>
            <div className="carousel-meta">
              {post.likeCount} likes • {post.viewCount} views
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default InterestCarousel;
