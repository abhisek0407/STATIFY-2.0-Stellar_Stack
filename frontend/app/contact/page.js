"use client";
import React from "react";
import { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      alert(data.message);

      if (data.success) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-[#09041b] py-10 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
              Contact Us
            </h1>

            <p className="text-gray-300 mt-4 text-base sm:text-lg max-w-3xl mx-auto px-2">
              Have questions about FantasyPilot, AI-powered fantasy team
              prediction, player statistics, match analysis, or feature
              suggestions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2">
              <div className="h-full bg-gradient-to-br from-[#16103b] to-[#100a2d] border border-indigo-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-white flex flex-col">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    Get in Touch 👋
                  </h2>

                  <p className="text-gray-300 leading-7 text-sm sm:text-base">
                    Have questions about FantasyPilot, AI-powered fantasy team
                    prediction, player statistics, match analysis, or feature
                    suggestions? We'd love to hear from you.
                  </p>
                </div>

                <div className="space-y-7 mt-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center shadow-lg text-cyan-400">
                      <i className="fa-solid fa-envelope text-lg sm:text-2xl"></i>
                    </div>

                    <div>
                      <p className="text-cyan-400 text-sm">Email</p>

                      <p className="font-semibold text-sm sm:text-base break-all">
                        abhisekpanda366@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center shadow-lg text-cyan-400">
                      <i className="fa-solid fa-phone text-2xl"></i>
                    </div>

                    <div>
                      <p className="text-green-200 text-sm">Phone</p>

                      <p className="font-semibold text-lg">+91 XXXXX XXXXX</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center shadow-lg text-cyan-400">
                      <i className="fa-solid fa-location-dot text-2xl"></i>
                    </div>

                    <div>
                      <p className="text-green-200 text-sm">Address</p>

                      <p className="font-semibold text-sm sm:text-base wrap-break-word">
                        Bhubaneswar, Odisha, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-indigo-700 my-10"></div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className=" rounded-3xl shadow-2xl border bg-gradient-to-b from-[#16103b] to-[#100a2d] border-indigo-700  p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Send us a Message
                </h2>

                <p className="text-gray-400 mb-8">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {" "}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-semibold text-gray-200">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border  px-4 py-3 outline-none transition  focus:ring-2 bg-[#09041b] text-white border-indigo-700 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-semibold text-gray-200">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="w-full rounded-xl border  px-4 py-3 outline-none transition  focus:ring-2 bg-[#09041b] text-white border-indigo-700 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-200">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Enter message subject"
                      className="w-full rounded-xl border  px-4 py-3 outline-none transition focus:ring-2 bg-[#09041b] text-white border-indigo-700 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-gray-200">
                      Message
                    </label>

                    <textarea
                      rows={8}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={500}
                      required
                      placeholder="Write your message here..."
                      className="w-full rounded-xl border  px-4 py-3 outline-none resize-none transition  focus:ring-2 bg-[#09041b] text-white border-indigo-700 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20"
                    ></textarea>

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-400">
                        Maximum 500 characters
                      </p>

                      <span className="text-sm text-gray-400">
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-semibold text-lg text-white transition duration-300 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : " hover:shadow-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <i className="fa-solid fa-paper-plane"></i>
                        Send Message
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className=" bg-[#06030c] border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-center items-center gap-2 text-gray-300 text-sm">
          <i className="fa-regular fa-copyright"></i>
          <p>
            {new Date().getFullYear()}{" "}
            <span className="font-semibold text-cyan-400">FantasyPilot</span>.
            All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default page;
