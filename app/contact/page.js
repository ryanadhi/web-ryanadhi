"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const text = "Say Hello";

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setIsError(false);
    setIsSuccess(false);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setIsSuccess(true);
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          setIsError(true);
        }
      );
  };
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
          <div className="">
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 1,
                }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
        {/* FORM CONTAINER */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="h-1/2 lg:h-full lg:w-1/2 bg-red-50 rounded-xl text-xl flex flex-col gap-8 justify-center p-24"
        >
          <span className="">Dear Ryan,</span>
          <textarea
            name="user_message"
            rows={6}
            className="bg-transparent border-b-2 border-b-black outline-none resize-none"
          />
          <label>My mail address is:</label>
          <input
            name="user_email"
            type="text"
            className="bg-transparent border-b-2 border-b-black outline-none "
          />
          <span>Regards</span>
          <button className="bg-purple-200 rounded font-semibold text-gray-600 pb-4">
            Send
          </button>
          {isSuccess && (
            <span className="text-green-600 font-semibold text-sm">
              Your message has been sent successfully!
            </span>
          )}
          {isError && (
            <span className="text-red-600 font-semibold text-sm">
              Something went wrong!
            </span>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
