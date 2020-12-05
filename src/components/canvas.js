import React, { Component, Fragment } from "react";
import axios from "axios";
import "./canvas.css";
class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: "",
      paint: false,
      color: "",
    };
  }
  componentDidMount() {
    const canvas = document.querySelector("canvas");
    var style = canvas.style;
    style.marginLeft = "400px";
    this.setState({ canvas });
    canvas.addEventListener("mousedown", this.StartPosition);
    canvas.addEventListener("mouseup", this.EndPosition);
    canvas.addEventListener("mousemove", this.Draw);
  }
  StartPosition = (e) => {
    this.setState({ paint: true });
    this.Draw(e);
  };
  EndPosition = (e) => {
    const { canvas } = this.state;
    const cxn = canvas.getContext("2d");
    this.setState({ paint: false });
    cxn.beginPath();
  };
  Draw = (e) => {
    const { canvas, paint, color } = this.state;
    if (!paint) {
      return;
    }
    const cxn = canvas.getContext("2d");
    cxn.lineWidth = 5;
    cxn.lineCap = "round";
    cxn.strokeStyle = color;
    cxn.lineTo(e.clientX - 400, e.clientY - 100);
    cxn.stroke();
    cxn.beginPath();
    cxn.moveTo(e.clientX - 400, e.clientY - 100);
  };
  Download = () => {
    const { canvas } = this.state;
    var imgData = canvas.toDataURL("image/png", 1.0);
    axios
      .post("http://localhost:5000/pdfFromHTMLString", { data: imgData })
      .then((r) => {
        setTimeout(() => {
          window.open("http://localhost:5000/pdfFromHTMLString");
        }, 3000);
      })
      .catch((er) => console.log(er.message));
  };
  render() {
    const { color } = this.state;
    return (
      <div>
        <div>
          <div className="divClassR">
            <label
              className="custom-radio-btn"
              style={{ border: ` 2px solid red` }}
            >
              <input
                type="radio"
                name="color"
                value="red"
                onClick={(c) => this.setState({ color: "red" })}
              />
              <span
                className="checkmark"
                style={{ backgroundColor: "red" }}
              ></span>
            </label>
            <label
              className="custom-radio-btn"
              style={{ border: ` 2px solid green` }}
            >
              <input
                type="radio"
                name="color"
                value="green"
                onClick={(c) => this.setState({ color: "green" })}
              />
              <span
                className="checkmark"
                style={{ backgroundColor: "green" }}
              ></span>
            </label>
            <label
              className="custom-radio-btn"
              style={{ border: ` 2px solid yellow` }}
            >
              <input
                type="radio"
                name="color"
                value="yellow"
                onClick={(c) => this.setState({ color: "yellow" })}
              />
              <span
                className="checkmark"
                style={{ backgroundColor: "yellow" }}
              ></span>
            </label>
            <label
              className="custom-radio-btn"
              style={{ border: ` 2px solid violet` }}
            >
              <input
                type="radio"
                name="color"
                value="violet"
                onClick={(c) => this.setState({ color: "violet" })}
              />
              <span
                className="checkmark"
                style={{ backgroundColor: "violet" }}
              ></span>
            </label>
          </div>

          <canvas
            id="canvas"
            width="600"
            height="400"
            margin="5rem"
            style={{ border: `2px solid ${color || "black"}` }}
          >
            Canvas is not working{" "}
          </canvas>
        </div>
        <button
          style={{ margin:"auto",display:"block" }}
          onClick={() => {
            this.Download();
          }}
          className="add-button"
        >
          Download the PDF
        </button>
      </div>
    );
  }
}

export default Canvas;
