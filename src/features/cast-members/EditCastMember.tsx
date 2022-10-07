import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  initialState,
  useGetCastMemberQuery,
  useUpdateCastMemberMutation,
} from "./castMembersSlice";
import { CastMemberForm } from "./components/CastMemberForm";
import { useSnackbar } from "notistack";
import { CastMember } from "../../types/CastMembers";
import { useParams } from "react-router-dom";

export const EditCastMember = () => {
  const id = useParams().id ?? "";
  const { data: castMember, isFetching } = useGetCastMemberQuery({ id });
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const [updateCastMember, status] = useUpdateCastMemberMutation();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCastMember(castMemberState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data);
    }
  }, [castMember]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Success Updated castMember", { variant: "success" });
    }
    if (status.error) {
      console.log(status);
      enqueueSnackbar("CastMember not Updated", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h3" component="h1">
              Edit Cast Member
            </Typography>
          </Box>
          <CastMemberForm
            castMember={castMemberState}
            isDisabled={status.isLoading}
            isLoading={isFetching || status.isLoading}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </Box>
      </Paper>
    </Box>
  );
};
