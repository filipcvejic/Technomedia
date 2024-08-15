import { Link } from "react-router-dom";
import Loader from "../../shared/components/Loader";
import "./MostWantedGroupsContainer.css";

function MostWantedGroupsContainer({ recommendedGroups }) {
  return (
    <div className="most-wanted-groups-container">
      <h1 className="most-wanted-groups-title">The most wanted groups</h1>
      {recommendedGroups ? (
        <div className="most-wanted-groups">
          {recommendedGroups?.map((group, index) => (
            <Link
              to={`/${group.category.slug}/${group.subcategory.slug}/${group.slug}`}
              preventScrollReset={true}
              className="single-category"
              key={index}
            >
              <div className="outer-category-image">
                <img
                  src={`/images/category-background-varient${index + 1}.png`}
                />
                <div className="inner-category-image">
                  <img src={group.image} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MostWantedGroupsContainer;
