import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainSchedule = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/train/trains', {
          headers: {
            Authorization: 'Bearer YOUR_AUTH_TOKEN',
          },
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h1>Train Schedule</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>
            <h2>{train.trainName}</h2>
            <p>Train Number: {train.trainNumber}</p>
            <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</p>
            <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
            <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
            <p>Price (Sleeper): {train.price.sleeper}</p>
            <p>Price (AC): {train.price.AC}</p>
            <p>Delayed By: {train.delayedBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainSchedule;
