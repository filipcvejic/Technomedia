import React, { useEffect, useRef, useState } from "react";
import GroupItem from "./GroupItem";
import ArrowIcon from "../svgs/ArrowIcon";

function GroupFilterList({ groups }) {
  const [isGroupsListShown, setIsGroupsListShown] = useState(true);

  return (
    <div className="group-filter-container">
      <div
        className="group-filter-header"
        onClick={() => setIsGroupsListShown((prevValue) => !prevValue)}
      >
        <h3>Groups</h3>
        <span
          className="arrow-icon"
          style={{
            transform: isGroupsListShown ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          <ArrowIcon />
        </span>
      </div>
      {isGroupsListShown && (
        <ul className="groups-filter-list">
          {groups.map((group, index) => (
            <GroupItem key={index} groupName={group.name} label={"group"} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroupFilterList;
