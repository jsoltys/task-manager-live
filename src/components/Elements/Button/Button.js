import React, { Component } from "react";

require("./Button.css");

class Button extends Component {
   readFile = evt => {
      let file = evt.target.files[0];

      console.log(file);
      //document.getElementById('input').files[0];

      const reader = new FileReader();
      reader.onload = function() {
         localStorage.setItem("my-tasks", reader.result);

         console.log(reader.result);
      };
      reader.readAsText(file);
   };

   render() {
      let {
         label,
         action,
         classColor,
         downloadData,
         downloadName,
         uploadFile
      } = this.props;
      let className = "Button";

      if (classColor !== undefined) {
         className += ` ${classColor}`;
      }

      if (uploadFile !== undefined) {
         return (
            <input type="file" className={className} onChange={this.readFile} />
         );
      } else if (downloadData !== undefined) {
         let downloadText = encodeURI(
            `data:application/javascript;charset=utf-8,${downloadData}`
         );
         let downloadFile =
            (downloadName === undefined) | (downloadName === "")
               ? "document.txt"
               : downloadName;

         return (
            <a
               className={className}
               href={downloadText}
               download={downloadFile}
            >
               {label}
            </a>
         );
      } else {
         return (
            <div className={className} onClick={action}>
               {label}
            </div>
         );
      }
   }
}

export default Button;
