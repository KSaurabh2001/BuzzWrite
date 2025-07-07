import SectionChoice from "./SectionChoice";

const FeaturedPost = ({ posts }) => (
 <SectionChoice
  posts={posts}
  title="Featured Blogs"
  icon="🌟"
 gradientLight="from-[#f3e8ff] to-[#d8b4fe]"  // soft aqua-blue for light
 gradientDark="from-[#133f50] to-[#0c121f]"     // Dark theme
  tagline="Highlighted content, handpicked for inspiration"
/>
);

export default FeaturedPost;
