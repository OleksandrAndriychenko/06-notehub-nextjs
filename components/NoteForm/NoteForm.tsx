import css from "./NoteForm.module.css"
import { ErrorMessage, Field, Form, Formik,  } from "formik";
import type  { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

import type { FormData } from '../../types/note';

interface NoteFormProps {
    onClose: () => void;
}




const defaultFormData: FormData = {
    title: "",
    content: "",
    tag: "Todo",
};


const OrderSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Min length 3")
        .max(50, "Max length 50")
        .required("Required filed"),
    content: Yup.string()
        .max(500, "Max length 500"),
    tag: Yup.string()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
        .required("Required filed"),
});



export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        onClose();
        },
    });

    const handleSubmit = (
        values: FormData,
        formikHelpers: FormikHelpers<FormData>
        ) => {
            mutate(values);
            formikHelpers.resetForm();
        };
    
    return (
        <Formik
            initialValues={defaultFormData}
            onSubmit={handleSubmit}
            validationSchema={OrderSchema}
        >
            <Form className={css.form}>
                <fieldset className={css.formGroup}>
                    <label htmlFor="title">
                        Title
                    </label>
                    <Field
                        type="text"
                        name="title"
                        id="title"
                        className={css.input}
                    />
                    <ErrorMessage
                        name="title"
                        component="span"
                        className={css.error}
                    />
                </fieldset>
                <fieldset className={css.formGroup}>
                    <label htmlFor="content">
                        Content
                    </label>
                    <Field
                        className={css.textarea}
                        as="textarea"
                        name="content"
                        id="content"
                        rows={8}
                    />
                    <ErrorMessage
                        name="content"
                        component="span"
                        className={css.error}
                    />
                </fieldset>
                <fieldset className={css.formGroup}>
                    <label htmlFor="tag">
                        Tag
                    </label>
                    <Field
                        className={css.select}
                        as="select"
                        name="tag"
                        id="tag">
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage
                        name="tag"
                        component="span"
                        className={css.error}
                    />
                </fieldset>
                <fieldset className={css.actions}>
                    <button type="button" onClick={onClose} className={css.cancelButton}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                        Create note
                    </button>
                </fieldset>
            </Form>
        </Formik>
    )
}