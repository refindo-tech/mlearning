import React from 'react';
import jsPDF from 'jspdf';
import 'quill/dist/quill.snow.css';  // Import CSS Quill untuk PDF style
// import htmlToPdfmake from 'html-to-pdfmake'; // Konversi HTML ke PDF format
import html2canvas from 'html2canvas'
const DownloadPDF = () => {
    const generatePDF = async () => {
        const element = document.getElementById('quill-content'); // Get the HTML element
    
        // Convert HTML to canvas using html2canvas
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');  // Get the image data from the canvas
    
        const pdf = new jsPDF('p', 'mm', 'a4');  // Create a new jsPDF document
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);  // Add the image to the PDF
        pdf.save('materi.pdf');  // Save the PDF
    };
    return (
        <button 
            className="flex justify-end w-[150px] bg-transparent" 
            onClick={generatePDF}
        >
            <p className="font-semibold hover:underline hover:underline-offset-4 active:text-black/50">Unduh Materi</p>
        </button>
    );

};

export default DownloadPDF;