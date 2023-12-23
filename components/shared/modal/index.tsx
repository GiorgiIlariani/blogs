"use client";

import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ModalProps } from "@/types";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import { authenticateUser } from "@/lib/actions/authenticateUser";
import SuccessContent from "./SuccessContent";
import AuthorizationContent from "./AuthorizationContent";
import FormSubmitedSuccessfullyContent from "./FormSubmitedSuccessfullyContent";

// Modal component
export default function Modal({
  isOpen,
  closeModal,
  isAuthorizationSuccessful,
  setIsAuthorizationSuccessful,
  blogAddedSuccessfully,
}: ModalProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [touched, setTouched] = useState(false);

  // Event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = e.target.value;
    setValue(enteredEmail);

    const emailRegex = /^[A-Za-z0-9._%+-]+@redberry\.ge$/;
    setIsValidEmail(emailRegex.test(enteredEmail));
  };

  const handleBlur = () => setTouched(true);

  const handleSubmit = async () => {
    if (isAuthorizationSuccessful) closeModal();

    setTouched(true);

    if (isValidEmail) {
      const isAuthorized = await authenticateUser(value);
      setIsAuthorizationSuccessful!(isAuthorized);
    }
  };

  const handleFormSubmited = () => router.push("/");

  // Content based on authorization success
  const modalContent = blogAddedSuccessfully ? (
    <FormSubmitedSuccessfullyContent />
  ) : isAuthorizationSuccessful ? (
    <SuccessContent />
  ) : (
    <AuthorizationContent
      value={value}
      isValidEmail={isValidEmail}
      touched={touched}
      handleChange={handleChange}
      handleBlur={handleBlur}
    />
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="relative w-full max-w-[480px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={closeModal}>
                  <Image
                    src="/assets/images/close.png"
                    alt="close icon"
                    width={24}
                    height={24}
                  />
                </div>
                {modalContent}
                <div className="mt-6">
                  <Button
                    type="submit"
                    text={
                      blogAddedSuccessfully
                        ? "მთავარ გვერდზე დაბრუნება"
                        : isAuthorizationSuccessful
                        ? "კარგი"
                        : "შესვლა"
                    }
                    onClick={
                      !blogAddedSuccessfully ? handleSubmit : handleFormSubmited
                    }
                    className="w-full bg-[#5D37F3] hover:bg-[#4C29C4] text-[#FFFFFF] font-medium"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
