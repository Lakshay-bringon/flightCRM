import React from "react";
import EmailPreview from "../components/EmailPreview";

// Utility to fetch HTML file content
function useHtmlFile(path) {
  const [html, setHtml] = React.useState("");
  React.useEffect(() => {
    fetch(path)
      .then(res => res.text())
      .then(setHtml)
      .catch(() => setHtml("<div class='text-red-500'>Failed to load email preview.</div>"));
  }, [path]);
  return html;
}

export default function EmailPreviewPage({ emailType }) {
  // For now, only newBooking.html is supported
  const html = useHtmlFile(`/src/components/emails/newBooking.html`);
  return (
    <div className="w-full h-full flex justify-center items-center" style={{minHeight: 'calc(100vh - 32px)'}}>
      <EmailPreview>
        <iframe
          title="Email Preview"
          srcDoc={html}
          sandbox="allow-same-origin"
          className="w-full max-w-3xl h-[calc(100vh-64px)] min-h-[400px] bg-white border shadow-lg rounded"
          style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.75rem', height: 'calc(100vh - 64px)' }}
        />
      </EmailPreview>
    </div>
  );
}
