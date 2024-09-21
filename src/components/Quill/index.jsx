"use client";
import parse from "html-react-parser"; // Imports the html-react-parser library to safely parse HTML
import React, { useState } from "react"; // Imports React and the useState hook
import ReactQuill from "react-quill"; // Imports ReactQuill, the Quill editor component for React
import "react-quill/dist/quill.snow.css"; // Imports the Quill editor's default "snow" theme CSS

// The main TextEditor component
const TextEditor = () => {
    // State for the content of the text editor
    const [body, setBody] = useState("");
    // State for the submitted content
    const [submittedContent, setSubmittedContent] = useState("");

    // Handler to update the body state when the editor content changes
    const handleBody = (e) => {
        setBody(e);
    };

    // Handler for when the content is submitted
    const handleSubmit = () => {
        // Sets the submitted content to the current body content
        setSubmittedContent(body);
        // Logs the current body content to the console
        console.log(body);
        // Logs the parsed HTML content to the console
        console.log(parse(body));
    };

    // Renders the TextEditor component
    return (
        <>
            <div>
                <ReactQuill
                    placeholder="Write something..." // Placeholder text for the editor
                    modules={TextEditor.modules} // Custom toolbar modules
                    formats={TextEditor.formats} // Custom formats
                    onChange={handleBody} // Event handler for content changes
                    value={body} // Current value of the editor content
                />
                {/* <button onClick={handleSubmit}>Submit</button> Button to submit the content */}
            </div>
            {/* Div to display the submitted content, parsed as HTML */}
            {/* <div className="ql-editor">{parse(submittedContent)}</div> */}
            {/* <div className="ql-editor">{submittedContent}</div> */}
        </>
    );
};

// Custom toolbar modules for the Quill editor
TextEditor.modules = {
    toolbar: [
        [{ header: ["1","2",false]}, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
        [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
        ],
    ],
};

// Custom formats for the Quill editor
TextEditor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "audio",
    "align",
];

export default TextEditor; // Exports the TextEditor component as the default export