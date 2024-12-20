import React, { useEffect, useState } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { getTopLocation } from "../action/postAction";

const LocationChips = () => {
 const [topLocations,setTopLocations] = useState([])

  useEffect(() => {
    async function locations (){
        let data = await getTopLocation()
        console.log(data)  
        setTopLocations(data)

    }
    locations();
  }, []);

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Top Locations
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
        {topLocations?.map(({location},index) => (
          <Chip key={index} label={location} color="primary" variant="outlined" />
        ))}
      </Stack>
    </div>
  );
};

export default LocationChips;
