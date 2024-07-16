import "./Blog.css";

// 컴포넌트
import Header from "./../components/UI/Header";
import ProfileCard from "../components/User/ProfileCard";
import BlogList from "../components/BlogEditer/BlogList";

// 페이지
import PostList from "./PostList";
const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "대동여지도 제작에 박차를 가한 전망대...",
      content:
        "지도 제작을 수월히 하기 위해 고지대를 찾던 중 서울의 정경이 보이는 전망대를...",
      date: "2020.01.03",
      location: "서울 남산 타워",
      images: ["image_url_1.jpg", "image_url_2.jpg"],
    },
    {
      id: 2,
      title: "한강 공원의 북적이는 인파",
      content:
        "서울 여행 중 시원한 강내음을 맡고자 한강공원으로 발걸음을 돌렸습니다... 가던 길을 마저하고 물이 가득 부어진 한강라면을 맛보았습니다. 절로 무릉도원이 따로 없었습니다...",
      date: "2020.01.03",
      location: "여의나루 한강 공원",
      images: ["image_url_1.jpg", "image_url_2.jpg"],
    },
    {
      id: 3,
      title: "과금한 날",
      content:
        "도면을 그릴 장비를 강물에 그만 빠트리고 말아 태블릿 구입을 위해 용산 아이파크몰에 다녀왔습니다...",
      date: "2020.01.03",
      location: "용산 아이파크몰",
      images: ["image_url_1.jpg", "image_url_2.jpg"],
    },
  ];

  return (
    <div className="blog-container">
      <Header homebtn={"홈으로"} text={"내 블로그"} />
      <ProfileCard />
      <BlogList />
      <PostList posts={posts} />
    </div>
  );
};

export default Blog;
