import React, { useState } from "react";
import axios from "axios";
import "./contact.css";
import logo from "./img/3RO-logo.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, "0");
    const day = currentTime.getDate().toString().padStart(2, "0");
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedTime = `${year}년 ${month}월 ${day}일 ${period} ${formattedHours}시 ${minutes}분`;

    const dataToSubmit = {
      time: formattedTime,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    console.log("Data to submit:", dataToSubmit);

    try {
      const response = await axios.post(
        "http://localhost:3001/proxy",
        dataToSubmit
      );
      console.log("Response status:", response.status);
      console.log("Response from server:", response.data);

      if (response.data && response.data.status === "success") {
        alert("문의사항을 성공적으로 제출하였습니다");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        alert("문의사항을 성공적으로 제출하였습니다");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <img src={logo} alt="Logo" className="logo" />
      <div className="title">궁금하신 문의사항을 남겨주시면</div>
      <div className="subtitle">확인 후 빠르게 연락을 드리겠습니다</div>
      <label className="label" htmlFor="message">
        문의사항을 알려주세요
      </label>
      <textarea
        id="message"
        name="message"
        placeholder="문의사항을 알려주세요. 어떠한 디자인이 필요한지, 준비하고 있는 아이템 및 업종 등 자유롭게 남겨주세요."
        value={formData.message}
        onChange={handleChange}
        className="textarea"
        required
      ></textarea>
      <label className="label">고객정보</label>
      <div className="customer-info">
        <div>
          <label className="label" htmlFor="name">
            성함
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="성함"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            연락처
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="연락처"
            value={formData.phone}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" name="agreement" className="checkbox" required />
        <label htmlFor="agreement" className="checkbox-label">
          (필수) 상담 서비스를 제공하기 위한 개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>
      <button type="submit" className="button">
        문의하기
      </button>
    </form>
  );
};

export default Contact;
