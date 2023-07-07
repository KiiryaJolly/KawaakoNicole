import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// This is the styled component to customize the progress bar
const Container = styled.div`
  progress {
    margin-right: 8px;
  }

  progress[value] {
    width: ${(props) => props.width};

    -webkit-appearance: none;
    appearance: none;
  }

  progress[value]::-webkit-progress-bar {
    height: 20px;
    border-radius: 20px;
    background-color: #ddd;
  }
  progress[value]::-webkit-progress-value {
    height: 20px;
    border-radius: 20px;
    background-color: ${(props) => props.color};
  }
`;

const Progress = ({ color, width, value, max }) => {
  return (
    <Container color={color} width={width}>
      <progress value={value} max={max}></progress>
      <span className="ms-2 fw-bold">{Number(value / max) * 100}%</span>
    </Container>
  );
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.string,
};

Progress.defaultProps = {
  max: 100,
  width: "340px",
  color: "lightblue",
};

export default Progress;
