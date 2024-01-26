import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../services/ApiService";
import { InitialValuesT } from "../interfaces";
import { Typography, TextField, Button, Box, Stack } from "@mui/material";
import { Form, Formik, Field, FieldProps } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
});

const initialValues = {
  title: "",
  body: "",
  userId: 1,
};

const CreatePage: React.FC = () => {
  const [post, setPost] = useState<InitialValuesT>(initialValues);
  const navigate = useNavigate();

  useEffect(() => {
    setPost(initialValues);
  }, []);

  const handleSubmit = (values: any) => {
    createItem(values)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <Box
      maxWidth="md"
      mt={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "100vh",
      }}
    >
      <Box width={"500px"}>
        <Typography variant="h4" component="h1">
          Create Post
        </Typography>
        <Formik initialValues={post} validationSchema={validationSchema} enableReinitialize onSubmit={handleSubmit}>
          <Form>
            <Stack direction="column" mt={2} mb={3} spacing={2} useFlexGap>
              <Box>
                <Field name="title">
                  {({ field, form }: FieldProps) => (
                    <TextField
                      id="title"
                      {...field}
                      label="Post title"
                      type="text"
                      variant="outlined"
                      fullWidth
                      error={form.touched.title && Boolean(form.errors.title)}
                      helperText={form.touched.title && form.errors.title ? String(form.errors.title) : ""}
                    />
                  )}
                </Field>
              </Box>
              <Box>
                <Field name="body">
                  {({ field, form }: FieldProps) => (
                    <TextField
                      id="body"
                      {...field}
                      label="Post body"
                      type="text"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      error={form.touched.body && Boolean(form.errors.body)}
                      helperText={form.touched.body && form.errors.body ? String(form.errors.body) : ""}
                    />
                  )}
                </Field>
              </Box>
            </Stack>
            <Button type="submit" variant="contained" color="success">
              Create
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default CreatePage;
