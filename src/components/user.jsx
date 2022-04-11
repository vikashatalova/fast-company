import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./quality";
import PropTypes from "prop-types";

const User = ({ user, onDelete }) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.qualities.map((quality) => Qualities(quality))}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>{Bookmark()}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};
User.propTypes = {
  user: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default User;
