import { useEffect, useState } from "react";
import Creatable from "react-select/creatable";
import { toast } from "react-toastify";

function GroupSelectInput({
  groups,
  selectedCategory,
  selectedSubcategory,
  onSelectGroup,
  onChangeBrand,
  initialGroup,
}) {
  const resetInputs = () => {
    onChangeBrand("");
  };

  const onGroupChangeHadler = (selectedOption) => {
    onSelectGroup(selectedOption);
    resetInputs();
  };

  const createGroupHandler = async (inputValue) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/add-group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            categoryId: selectedCategory._id,
            subcategoryId: selectedSubcategory._id,
            groupName: inputValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const newGroup = data.newGroup;

      const isNewGroup = !groups.find((group) => group._id === newGroup._id);

      onSelectGroup(
        {
          value: newGroup.name,
          label: newGroup.name,
          _id: newGroup._id,
        },
        isNewGroup && { info: newGroup }
      );
      resetInputs();

      toast.success(data.message);
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const options =
    groups?.map((singleGroup) => ({
      value: singleGroup.name,
      label: singleGroup.name,
      _id: singleGroup._id,
    })) || [];

  return (
    <div className="group-select-input">
      <label>Group</label>
      <Creatable
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (provided) => ({
            ...provided,
            minHeight: "20px",
            height: "42px",
            fontSize: "14px",
            backgroundColor: "#E6E6E6",
            borderRadius: "10px",
            border: "none",
          }),
        }}
        options={options}
        onChange={onGroupChangeHadler}
        onCreateOption={createGroupHandler}
        value={initialGroup}
        placeholder="Select or type a new group..."
        isSearchable
        required
      />
    </div>
  );
}

export default GroupSelectInput;
