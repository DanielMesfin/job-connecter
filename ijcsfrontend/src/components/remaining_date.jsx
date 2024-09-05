import React from 'react';
import { Chip } from '@material-tailwind/react';
const DeadlineCountdown = ({ deadlineString }) => {
    const deadlineDate = new Date(deadlineString);
    const currentDate = new Date();
    const timeDifferenceMs = deadlineDate - currentDate;
    const remainingDays = Math.floor(timeDifferenceMs / (24 * 60 * 60 * 1000));

    return (
        <div>
            {/* <p>Deadline: {deadlineString}</p> */}
            <p>{remainingDays==0?<Chip color='yellow' value='Today' size='sm'/>:remainingDays <0 ?<Chip color="red" value="Expired" size='sm' />   :<Chip value={`${remainingDays} days Remaining`} size='sm' color='green'/>  } </p>
        </div>
    );
};

export default DeadlineCountdown;
