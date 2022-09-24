import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { initialState, useCreateCastMemberMutation } from "./castMembersSlice";
import { CastMemberForm } from "./components/CastMemberForm";
import { useSnackbar } from "notistack";
import { CastMember } from "../../types/CastMembers";

export const CreateCastMember = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [createCastMember, status] = useCreateCastMemberMutation();
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCastMember(castMemberState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Success create castMember", { variant: "success" });
    }
    if (status.error) {
      console.log(status);
      enqueueSnackbar("CastMember not created", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h3" component="h1">
              Create Cast Member
            </Typography>
          </Box>
          <CastMemberForm
            castMember={castMemberState}
            isDisabled={status.isLoading}
            isLoading={status.isLoading}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </Box>
      </Paper>
    </Box>
  );
};
