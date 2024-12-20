import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";

// Utility function to calculate time difference
const getTimeDifference = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffInSeconds = Math.floor((now - created) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export default function OverflowCard({
  id,
  title,
  image,
  views,
  location,
  createdAt,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/post/${id}`);
  };
  return (
    <Card variant="outlined" sx={{ width: 220 }} onClick={handleClick}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img src={image} loading="lazy" alt="image" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{title}</Typography>
        <Typography level="body-sm">{location}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{ fontWeight: "md" }}
          >
            {views} views
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body-xs"
            textColor="text.secondary"
            sx={{ fontWeight: "md" }}
          >
            {getTimeDifference(createdAt)}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
