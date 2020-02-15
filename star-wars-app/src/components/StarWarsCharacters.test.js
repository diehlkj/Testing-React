import React from "react";
// no default export, so we're importing everyting from this library
import * as rtl from "@testing-library/react";
// not importing to a variable, since this just overrides jest global variables
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import axios from 'axios';

jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve({
      data: {
        count: 87,
        next: "https://swapi.co/api/people/?page=3",
        previous: "https://swapi.co/api/people/?page=1",
        results: [{},{}]
      }
    }))
  }
});

 //const wrapper = rtl.render(<App/>);

test("Loads Next", async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByText(/next/i);

  const nextElem = wrapper.getByText(/next/i);

  rtl.act(()=>{
    rtl.fireEvent.click(nextElem);
  });
  
  //expect(axios.get).not.toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalled();
})

test("Loads Previous", async () => {
  const wrapper = rtl.render(<App />);
  await wrapper.findAllByText(/previous/i);

  const previousElem = wrapper.getByText(/previous/i);

  rtl.act(()=>{
    rtl.fireEvent.click(previousElem);
  });
  
  //expect(axios.get).not.toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalled();
})

test("Rendered Logo", async () => {
  const wrapper = rtl.render(<App/>);

  const element = wrapper.getByAltText(/logo/i);

  expect(element).toBeVisible();
})