import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm(); // react hook form (useForm)

  async function onSubmitForm(values) {
    // const exp = parse
    if(Object.keys(values.expression_).length == values.no_of_squares_){
      router.push({
        pathname: "/Nerdle",
        query: { data:  values.expression_, data2: values.no_of_squares_, data3: values.chances_}
      })
    }else {
      return alert("length of the expression and number of squares should be same")
    }
    
  }

  return (
    <main className="min-h-screen w-full bg-gray-800 scroll-smooth">
      
      <div className="min-h-screen w-full flex flex-col p-0 items-center">
      <div className="h-full w-full flex justify-center pt-10 pb-4"> 
          <span className="text-gray-50 text-4xl">Lets Play <span className="text-red-500 underline">Nerdle</span></span>
        </div>
        <div className="h-full w-full flex flex-col items-center pb-10">
          <span className="text-gray-200 ">First you have to select the number of squares you want in one column and expression you want the player to guess</span>
          <span className="text-gray-200">For example: you want user to guess "11*12=132" so you square box should be 9, not less than 9</span>
          <span className="text-gray-200">So, make your own expression and set number of squares as per length of expression</span>
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-10 shadow-md bg-gray-900 p-10">         
          <div className="text-white flex space-x-4 justify-between items-center">
            <label>Number of Squares</label>
            <select
              type="text"
              name="no_of_squares"
              // register field
              {...register("no_of_squares_")}
              className="shadow-md focus:ring-1 ring-1 px-2 ring-white focus:ring-white border-0 focus:outline-none h-10 w-60 bg-gray-900"
            >
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </select>
          </div>
          <div className="text-white flex flex-col">
            <div className="flex space-x-4  justify-between items-center">
            <label>Expression</label>
            <input
              type="text"
              name="expression"
              {...register("expression_", {
                // validations
                required: true,
                pattern: {
                  value: /^[\d\-+=(\/)*]+$/m,
                  message: "invalid email address"
                }
              })}
              className="shadow-md border-0 ring-1 px-2 ring-white focus:ring-1 focus:ring-white focus:outline-none h-10 w-60 bg-gray-900"
            ></input>
            </div>
            <div className="flex justify-end pt-2">
            {errors.expression_ && errors.expression_.type === "pattern" && (
                          <span className = "text-xs">Please Enter Valid Expression</span>
                        )}
            </div>
          </div>
          <div className="text-white flex space-x-4 justify-between items-center">
            <label>Number valid chances</label>
            <select
              type="text"
              name="chances"
              // register field
              {...register("chances_")}
              className="shadow-md focus:ring-1 ring-1 px-2 ring-white focus:ring-white border-0 focus:outline-none h-10 w-60 bg-gray-900"
            >
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="flex justify-center ">
            <button
              type="submit"
              className="text-white py-1.5 px-4 bg-gray-700 shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
