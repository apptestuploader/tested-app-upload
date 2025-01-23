import { Typography } from "@mui/material"

const Version = () => {
  return (
    <span>
      <Typography
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          margin: "0.1rem",
          color: "rgba(255, 0, 0, 0.54)",
          zIndex: "-1000",
        }}
      >
        v4 - Da Hong Pao
      </Typography>
    </span>
  )
}

export default Version
