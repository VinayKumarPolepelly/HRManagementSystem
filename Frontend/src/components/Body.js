import React from "react";

const Body = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center m-5">
        <div>
          <img
            src="https://img.freepik.com/free-vector/recruiting-professionals-studying-candidate-profiles_1262-21404.jpg?w=900&t=st=1709465615~exp=1709466215~hmac=42e471aa2ccc2f93994efaf36e93c2051a7fd0a5193d3b6692332b5ccbf0a794"
            className="w-[80%] mt-11"
            alt="this is homepage log"
          />
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3775.1244965248547!2d77.91919617466056!3d18.881557358049122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcde18c82d2cdb1%3A0x469505d0e802dd0c!2sBasara%20IIIT%20Campus!5e0!3m2!1sen!2sin!4v1716727977895!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="ml-1 mt-11 mr-16"
            title="RGUKTLOGO"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Body;
