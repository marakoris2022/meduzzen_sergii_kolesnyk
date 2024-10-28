"use client";

import { RootState } from "@/state/store";
import { updateString } from "@/state/string/stringSlice";
import { TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const TestInput = () => {
  const text = useSelector((state: RootState) => state.string.value);
  const dispatch = useDispatch();

  return (
    <>
      <TextField
        value={text}
        onChange={(e) => dispatch(updateString(e.target.value))}
        id="standard-basic"
        label="Standard"
        variant="standard"
      />
      <Typography>{text}</Typography>
    </>
  );
};

export default TestInput;
