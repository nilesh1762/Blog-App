import React from 'react';
import Moment from 'react-moment';

const DateFormatter = ({ date }) => {

  return (
    <Moment format='Do MMMM YYYY, h:mm:ss a' withTitle>
          
          {date}
        </Moment>
  )
}

export default DateFormatter