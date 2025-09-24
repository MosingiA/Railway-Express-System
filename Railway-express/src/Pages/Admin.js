import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TrainSchema = Yup.object().shape({
  name: Yup.string().min(2, "Minimum 2 characters").required("Required"),
  capacity: Yup.number().min(1, "Must be positive").required("Required"),
  departure_time: Yup.string().required("Required")
});