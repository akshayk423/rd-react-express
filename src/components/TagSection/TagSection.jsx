import "./TagSection.css";

const TagSection = ({ tags }) => {
  console.log(tags);
  if (!tags?.length) return null;
  return (
    <div className="tags-container">
      {tags.map((tag, i) => (
        <span key={i} className="tags-container__tag">
          {tag}
          <button type="button" className="tags-container__tag-delete-btn">
            X
          </button>
        </span>
      ))}
    </div>
  );
};

export default TagSection;
