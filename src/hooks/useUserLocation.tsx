import { useEffect, useState } from "react";
import * as Location from "expo-location"; // Assuming you're using Expo for location services

const useUserLocation = (parsedUser) => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("");

  const getUserLocation = async () => {
    const latitude = Number(parsedUser?.lat);
    const longitude = Number(parsedUser?.lon);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      try {
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (response.length > 0) {
          let item = response[0];
          let address = `${item.city}, ${item.region}`;
          setDisplayCurrentAddress(address);
        }
      } catch (error) {
        console.error("Error getting location: ", error);
      }
    } else {
      console.error("Invalid latitude or longitude");
    }
  };

  useEffect(() => {
    if (parsedUser) {
      getUserLocation();
    }
  }, [parsedUser]);

  return displayCurrentAddress;
};

export default useUserLocation;
