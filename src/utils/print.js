// 19

export const printContent = (html) => {
  const win = window.open("", "_blank", "width=900,height=700");

  if (!win) {
    alert("Popup blocked. Please allow popups.");
    return;
  }

  // Write the HTML into the new window
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            vertical-align: middle;
          }
          th {
            background-color: #f3f4f6;
          }
          img {
            max-width: 80px;
            max-height: 80px;
            border-radius: 50%;
          }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `);

  win.document.close();

  // Wait for the window to load
  win.onload = () => {
    win.focus();

    // 🔑 Wait until all images are loaded
    const images = win.document.images;
    const totalImages = images.length;
    if (totalImages === 0) {
      // No images, safe to print
      win.print();
      win.close();
    } else {
      let loadedCount = 0;
      for (let img of images) {
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            // All images loaded or failed, safe to print
            setTimeout(() => {
              win.print();
              win.close();
            }, 100); // slight delay to ensure rendering
          }
        };
      }
    }
  };
};
