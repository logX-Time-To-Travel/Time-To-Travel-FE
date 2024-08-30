import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './InterestCarousel.css';

const InterestCarousel = ({ posts }) => {
  return (
    <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
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
