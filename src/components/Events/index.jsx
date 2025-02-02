/**
 * @file event item
 * @author atom-yang
 */
import React from "react";
import PropTypes from "prop-types";
import EventItem from "../EventItem";
import CopyButton from "../CopyButton/CopyButton";
import { Link } from "react-router-dom";
import addressFormat from "../../utils/addressFormat";

// 专门用于显示交易log的,
const Events = (props) => {
  const { list } = props;
  return (
    <div className="event-list">
      {list.map((item, index) => (
        <div key={index}>
          <div className="info">
            <span className="label">Address: </span>
            <div>
              <Link
                className="info"
                to={`/address/${item.Address}`}
                title={addressFormat(item.Address)}
              >
                {addressFormat(item.Address)}
              </Link>
              <CopyButton value={addressFormat(item.Address)} />
            </div>
          </div>
          <div className="info">
            <span className="label">Name: </span>
            <span className="info">{item.Name}</span>
          </div>
          <EventItem {...item} />
        </div>
      ))}
    </div>
  );
};

Events.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    Indexed: PropTypes.array,
    NoIndexed: PropTypes.string,
    Name: PropTypes.string.isRequired,
    Address: PropTypes.string.isRequired,
  })).isRequired,
};

export default Events;
