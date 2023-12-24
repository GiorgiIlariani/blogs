"use client";

import { Form, Formik } from "formik";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import { useState } from "react";
import { convertImageToBlob } from "@/utils";
import Modal from "../shared/modal";
import { initialValues } from "./formik/initialValues";
import Button from "../UI/Button";
import { CategoryTypes, FormikValues } from "@/types";
import { postCategories } from "@/lib/actions/postCategories";
import FormControl from "./formik/FormControl";

type CreateBlogFormProps = {
  categories: CategoryTypes[];
};

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({ categories }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;

        if (result && typeof result === "string") {
          // const data = result.split(",")[1];
          // const binaryBlob = atob(data);
          const imageToBinary = convertImageToBlob(result);
          setFieldValue("image", imageToBinary);
        } else {
          console.error("FileReader result is not a string.");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (setFieldValue: Function) => {
    setFieldValue("image", "");
  };

  const onSubmit = async (values: FormikValues, formikHelpers: any) => {
    await postCategories({
      title: values.title,
      description: values.description,
      image: values.image,
      publish_date: values.publish_date,
      author: values.author,
      categories: values.categories,
      email: values.email,
    });

    setOpenModal(true);
    formikHelpers.resetForm();
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
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {/* autoComplete="off" */}
        {({ setFieldValue, values, touched, dirty, isValid }) => {
          return (
            <Form
              autoComplete="off"
              style={{
                position: "relative",
                width: "100%",
                marginTop: "15px",
              }}>
              {/* <div classname="mt-5">
                <label className="font-semibold">ატვირთეთ ფოტო</label>
                {!values.image ? (
                  <div className="relative w-full h-[180px] bg-[#F4F3FF] rounded-lg border-dashed border overflow-hidden mt-4">
                    <label htmlFor="image" className="cursor-pointer">
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => handleFileSelect(e, setFieldValue)}
                      />
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center text-center gap-4">
                          <Image
                            src="/assets/images/folder-add.png"
                            alt="add img"
                            width={40}
                            height={40}
                            className="cursor-pointer"
                          />
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-normal">
                              ჩააგდეთ ფაილი აქ ან
                            </p>
                            <label
                              htmlFor="image"
                              className="text-gray-600 text-sm font-semibold underline cursor-pointer">
                              აირჩიეთ ფაილი
                            </label>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative w-full h-14 bg-[#F2F2FA] rounded-lg mt-4 flex justify-between items-center px-4">
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/assets/images/gallery.png"
                        alt="galery"
                        width={24}
                        height={24}
                      />
                      <p>BlogImg.JPEG</p>
                    </div>
                    <Image
                      src="/assets/images/close.png"
                      alt="close icon"
                      width={24}
                      height={24}
                      onClick={() => handleImageRemove(setFieldValue)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div> */}
              <div className="w-full flex flex-col gap-4">
                {/* ავტორი */}
                <div className="flex items-center sm:flex-col gap-6">
                  <div className="w-full">
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
                  <div className="w-full">
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
                <div>
                  <FormControl
                    control="textarea"
                    name="description"
                    label="აღწერა*"
                    placeholder="შეიყვანეთ აღწერა"
                    info="მინიმუმ 4 სიმბოლო"
                    minRows={5}
                  />
                </div>
                {/* გამოქვეყნების თარიღი */}
                <div>
                  <FormControl
                    control="date"
                    name="publish_date"
                    label="გამოქვექნების თარიღი*"
                    setFieldValue={setFieldValue}
                  />
                </div>
                {/* კატეგორია */}
                <div>
                  {/* <FormControl
                    control="select"
                    setFieldValue={setFieldValue}
                    name="categories"
                    label="კატეგორია"
                    placeholder="აირჩიეთ კატეგორია"
                    categories={categories} 
                  /> */}
                </div>
                {/* მეილი */}
                <div>
                  <FormControl
                    control="input"
                    name="email"
                    label="ელ-ფოსტა*"
                    placeholder="Example@redberry.ge"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-10">
                <Button
                  type="submit"
                  className="w-[288px] h-[40px] bg-[#5D37F3] hover:bg-[#5D37F3] text-[#FFFFFF] font-normal rounded-[8px]"
                  disabled={!dirty || !isValid}
                  text="გამოქვეყნება"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateBlogForm;
