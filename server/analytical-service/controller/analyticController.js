const Analytical = require("../models/analyticalModel");

// Function to increment like count for a given location
async function incrementVisit(location) {
  try {
    if (!location) {
      throw new Error("Location is required");
    }
    console.log("Location:", location);

    let analyticalData = await Analytical.findOne({ location });

    if (!analyticalData) {
      analyticalData = new Analytical({ location, visitCount: 0 });
    }
    analyticalData.visitCount += 1;

    await analyticalData.save();
    console.log(analyticalData);
    return analyticalData.visitCount;
  } catch (error) {
    throw new Error("Error incrementing like count: " + error.message);
  }
}

// Function to get the most liked location
async function getMostVisitedLocation() {
  try {
    // Find the location with the highest like count
    const mostLikedLocation = await Analytical.find().sort({
      visitCount: -1,
    });
    return mostLikedLocation;
  } catch (error) {
    throw new Error("Error fetching most liked location: " + error.message);
  }
}

module.exports = {
  incrementVisit,
  getMostVisitedLocation,
};
