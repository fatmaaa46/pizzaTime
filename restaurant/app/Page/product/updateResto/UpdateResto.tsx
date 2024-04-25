"use client";
import router from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { v4 } from "uuid";

export default function UpdateResto() {
  const [town, setTown] = useState("");
  const [Nature, setNature] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Company, setCompany] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [closingTime, setclosingTime] = useState("");
  const [openingTime, setopeningTime] = useState("");
  const [Address, setAddress] = useState("");
  const updateProduct = async (e: SyntheticEvent) => {
    e.preventDefault();
    const cat: any = localStorage.getItem("card");
    let card: any = JSON.parse(cat || null);
    let shopId: any = localStorage.getItem("shopLength");

    await fetch(`http://localhost:8000/backend/restaurant/${card.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resto: {
          town: town,
          image: image,
          Nature: Nature,
          shopid: Number(shopId),
          Address: Address,
          Company: Company,
          Country: country,
          latitude: latitude,
          longitude: longitude,
          PostalCode: PostalCode,
          Responsible: "",
          closingTime: closingTime,
          openingTime: openingTime,
        }
      }),
    });
    shopId = Number(shopId) + 1;
    localStorage.setItem("shopLength", shopId);
  };

  return (
    <div>
      <h1>update restaurant</h1>
      <form className="form_main" action="">
        <div className="inputContainer">
          <input
            id="image"
            className="inputField"
            type="text"
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>Country</label>
          <input
            placeholder="Country"
            id="country"
            className="inputField"
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>{" "}
        <div className="inputContainer">
          <label>Town</label>
          <input
            placeholder="town"
            id="town"
            className="inputField"
            type="text"
            onChange={(e) => setTown(e.target.value)}
            required
          />
        </div>{" "}
        <div className="inputContainer">
          <label>Nature</label>
          <input
            placeholder="nature"
            id="Nature"
            className="inputField"
            type="text"
            onChange={(e) => setNature(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>NomCompany</label>
          <input
            placeholder="nom restaurant"
            id="company"
            className="inputField"
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>Address</label>
          <input
            placeholder="Address"
            id="address"
            className="inputField"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>latitude</label>
          <input
            placeholder="latitude"
            id="latitude"
            className="inputField"
            type="text"
            onChange={(e) => setlatitude(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>longitude</label>
          <input
            placeholder="longitude"
            id="longitude"
            className="inputField"
            type="text"
            onChange={(e) => setlongitude(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>openingTime</label>
          <input
            placeholder="openingTime"
            id="openingTime"
            className="inputField"
            type="text"
            onChange={(e) => setopeningTime(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>closingTime</label>
          <input
            placeholder="closingTime"
            id="closingTime"
            className="inputField"
            type="text"
            onChange={(e) => setclosingTime(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>PostalCode</label>
          <input
            placeholder="PostalCode"
            id="postalCode"
            className="inputField"
            type="text"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <Button onClick={updateProduct}>Modifier</Button>
      </form>
    </div>
  );
}
