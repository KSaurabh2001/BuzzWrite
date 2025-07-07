// SavedPostsSection.jsx
import SectionChoice from "./SectionChoice";

const SavedPost = ({ posts }) => (
<SectionChoice
  posts={posts}
  title="Saved Blogs"
  icon="💾"
 gradientLight="from-[#f3e8ff] to-[#d8b4fe]"// soft aqua-blue for light
   gradientDark="from-[#133f50] to-[#0c121f]"   // teal-blue slate for dark
  tagline="Your saved ideas, always within reach."
/>
);

export default SavedPost;
