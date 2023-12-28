"use client";

import { Form, Formik } from "formik";
import { useState } from "react";
import { convertImageToBlob } from "@/utils";
import Modal from "../shared/modal";
import { initialValues } from "./formik/initialValues";
import Button from "../UI/Button";
import { CategoryTypes, FormikValues } from "@/types";
import { postCategories } from "@/lib/actions/postCategories";
import FormControl from "./formik/FormControl";
import { validationSchema } from "./formik/validation";
import ImageComponent from "./formik/textfields/imageComponent";

const CreateBlogForm = ({ categories }: { categories: CategoryTypes[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [imageTouched, setImageTouched] = useState(false);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    setImageTouched(true);
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;

        if (result && typeof result === "string") {
          setFieldValue("image", { name: file.name, url: result });
        } else {
          console.error("FileReader result is not a string.");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (setFieldValue: Function) => {
    setFieldValue("image", "");
    if (typeof window !== "undefined") sessionStorage.removeItem("image");
  };

  const onSubmit = async (values: FormikValues, formikHelpers: any) => {
    const arrayOfNumberCategories = values.categories.map(
      (category) => category.id
    );

    const imageToBinary = convertImageToBlob(values.image.url);

    try {
      const response = await postCategories({
        title: values.title,
        description: values.description,
        image: imageToBinary,
        publish_date: values.publish_date,
        author: values.author,
        categories: arrayOfNumberCategories,
        email: values.email,
      });

      if (response) {
        setOpenModal(true);

        formikHelpers.resetForm();

        if (typeof window !== "undefined") sessionStorage.clear();
        sessionStorage.setItem("isAuthorized", "true");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {openModal ? (
        <Modal
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          blogAddedSuccessfully
        />
      ) : null}
      <Formik
        validateOnMount={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ setFieldValue, isValid, values, isSubmitting }) => {
          const isFormValid = isValid && values.categories.length > 0;
          return (
            <Form
              autoComplete="off"
              style={{
                position: "relative",
                width: "100%",
                marginTop: "15px",
              }}>
              <ImageComponent
                name="image"
                imageTouched={imageTouched}
                handleFileSelect={handleFileSelect}
                setFieldValue={setFieldValue}
                handleImageRemove={handleImageRemove}
              />
              <div className="w-full flex flex-col gap-8 mt-5">
                <div className="flex items-start sm:flex-col gap-6">
                  {/* ავტორი */}
                  <div className="w-full flex flex-col">
                    <FormControl
                      control="input"
                      name="author"
                      label="ავტორი*"
                      placeholder="შეიყვანეთ ავტორი"
                      info={[
                        "მინიმუმ 4 სიმბოლო",
                        "მინიმუმ ორი სიტყვა",
                        "მხოლოდ ქართული სიმბოლოები",
                      ]}
                    />
                  </div>
                  {/* სათაური */}
                  <div className="w-full flex flex-col">
                    <FormControl
                      control="input"
                      name="title"
                      label="სათაური*"
                      placeholder="შეიყვანეთ სათაური"
                      info="მინიმუმ 4 სიმბოლო"
                    />
                  </div>
                </div>
                {/* აღწერა */}
                <div className="w-full flex flex-col">
                  <FormControl
                    control="textarea"
                    name="description"
                    label="აღწერა*"
                    placeholder="შეიყვანეთ აღწერა"
                    info="მინიმუმ 4 სიმბოლო"
                    minRows={5}
                  />
                </div>
                <div className="w-full flex items-center sm:flex-col gap-6">
                  {/* გამოქვეყნების თარიღი */}
                  <div className="w-[288px] sm:w-full flex flex-col">
                    <FormControl
                      control="date"
                      name="publish_date"
                      label="გამოქვექნების თარიღი*"
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  {/* კატეგორია */}
                  <div className="w-[288px] sm:w-full flex flex-col">
                    <FormControl
                      control="select"
                      setFieldValue={setFieldValue}
                      name="categories"
                      label="კატეგორია"
                      placeholder="აირჩიეთ კატეგორია"
                      categories={categories}
                    />
                  </div>
                  {/* მეილი */}
                </div>
                <div className="max-w-[288px] sm:max-w-full flex flex-col">
                  <FormControl
                    control="input"
                    name="email"
                    label="ელ-ფოსტა*"
                    placeholder="Example@redberry.ge"
                    info="მეილი უნდა მთავრდებოდეს redberry.ge-ით"
                  />
                </div>
                <div className="flex justify-end mt-10">
                  <Button
                    type="submit"
                    className={`w-[288px] h-[40px] bg-[#5D37F3] ${
                      !isFormValid ? "bg-[#E4E3EB] hover:bg-[#E4E3EB]" : ""
                    } hover:bg-[#5D37F3] text-[#FFFFFF] font-normal rounded-[8px]`}
                    disabled={!isFormValid || isSubmitting}
                    text={isSubmitting ? "იტვირთება..." : "გამოქვეყნება"}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateBlogForm;
