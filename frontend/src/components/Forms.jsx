import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Forms = ({ formFields, submitButtonLabel, submitHandler }) => {
    // Build the Zod schema dynamically
    let formSchemaObject = {};
    formFields.forEach((inputField) => {
        formSchemaObject[inputField.fieldName] = z.string().min(2, `${inputField.label} must be at least 2 characters`).max(50, `${inputField.label} must be under 50 characters`);
    });
    const formSchema = z.object(formSchemaObject);

    // Default values for the form
    let formValues = {};
    formFields.forEach((inputField) => {
        formValues[inputField.fieldName] = ""; // Initialize as empty strings
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: formValues,
    });

    // Submit handler
    function onSubmit(values) {
        console.log(values); // Logs the form values
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="w-full flex flex-col gap-4">
                {formFields.map((inputField, index) => (
                    <FormField
                        key={index} // Add a unique key for React
                        control={form.control}
                        name={inputField.fieldName} // Match the `name` property in formSchema
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{inputField.label}</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-[356px] h-[50px] rounded-xl"
                                        placeholder={inputField.placeholder}
                                        type={inputField.inputType}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button className="w-[356px] h-[52px] rounded-xl" type="submit">
                    {submitButtonLabel}
                </Button>
            </form>
        </Form>
    );
};

export default Forms;
