import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemDetails, updateItem, deleteItem } from "../services/ApiService";
import { Typography, TextField, Button, Box, Stack, Alert } from "@mui/material";
import { Form, Formik, Field, FieldProps } from "formik";
import {InitialValuesT} from "../interfaces";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
});

const initialValues = {
  id: null,
  title: "",
  body: "",
  userId: null
};

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<InitialValuesT>(initialValues);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    updateItem(Number(id), values)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  useEffect(() => {
    getItemDetails(Number(id))
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => console.error("Error fetching post details:", error));
  }, [id]);

  const handleDelete = () => {
    deleteItem(Number(id))
      .then(() => navigate("/"))
      .catch((error) => console.error("Error deleting post:", error));
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
          Post Details
        </Typography>
        <Formik initialValues={post} validationSchema={validationSchema} enableReinitialize onSubmit={handleSubmit}>
          <Form>
            <Stack direction="column" mt={2} mb={2} spacing={2} useFlexGap>
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
              Update
            </Button>
            <Button type="button" variant="contained" color="warning" onClick={handleDelete} sx={{marginLeft: 2}}>
              Delete
            </Button>
          </Form>
        </Formik>
      </Box>
      {showAlert && (
        <Alert variant="filled" severity="success" style={{ position: "absolute", bottom: 10, right: 10 }}>
          Success Post updated.
        </Alert>
      )}
    </Box>
  );
};

export default ItemDetails;
