import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    nic: string;
    dateOfBirth: string;
    houseNumber: string;
    street: string;
    city: string;
    district: string;
    password: string;
    confirmPassword: string;
}

interface FormContextType {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        nic: "",
        dateOfBirth: "",
        houseNumber: "",
        street: "",
        city: "",
        district: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <FormContext.Provider value={{ formData, handleChange }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = (): FormContextType => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useForm must be used within a FormProvider");
    }
    return context;
};
