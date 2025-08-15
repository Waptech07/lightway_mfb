import { XIcon } from "lucide-react";
import { useState } from "react";

const LegalTab = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const legalDocuments = [
    {
      id: "terms",
      title: "Terms and Conditions",
      description:
        "Review the rules and guidelines that govern your use of our banking services.",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      description:
        "Learn how we collect, use, and protect your personal information.",
    },
    {
      id: "security",
      title: "Information Security Policy",
      description:
        "Understand the measures we take to safeguard your financial data.",
    },
    {
      id: "whistleblowing",
      title: "Whistleblowing Policy",
      description: "Learn how to report concerns about unethical practices.",
    },
  ];

  const documentContent: Record<string, string> = {
    terms: `
      <h2 class="text-xl font-bold mb-4">Terms and Conditions</h2>
      <p class="mb-3">Welcome to our banking services. These terms and conditions outline the rules and regulations for the use of our banking platform.</p>
      <p class="mb-3">By accessing this platform, we assume you accept these terms and conditions in full. Do not continue to use our banking services if you do not accept all of the terms and conditions stated on this page.</p>
      
      <h3 class="font-bold text-lg mt-4 mb-2">1. Account Registration</h3>
      <p class="mb-3">You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.</p>
      
      <h3 class="font-bold text-lg mt-4 mb-2">2. Transactions</h3>
      <p class="mb-3">All transactions conducted through our platform are subject to verification and approval. We reserve the right to cancel any transaction that appears suspicious.</p>
    `,
    privacy: `
      <h2 class="text-xl font-bold mb-4">Privacy Policy</h2>
      <p class="mb-3">Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.</p>
      
      <h3 class="font-bold text-lg mt-4 mb-2">Information Collection</h3>
      <p class="mb-3">We collect personal information when you register for an account, conduct transactions, or use our services. This may include your name, contact information, and financial details.</p>
      
      <h3 class="font-bold text-lg mt-4 mb-2">Data Protection</h3>
      <p class="mb-3">We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or destruction.</p>
    `,
    security: `
      <h2 class="text-xl font-bold mb-4">Information Security Policy</h2>
      <p class="mb-3">Our commitment to protecting your financial information is paramount. This policy outlines our security practices and protocols.</p>
      
      <h3 class="font-bold text-lg mt-4 mb-2">Security Measures</h3>
      <p class="mb-3">We employ bank-grade encryption, multi-factor authentication, and regular security audits to protect your data.</p>
      
      <h3 class="font-bold text-lg mt-4 mb-2">Incident Response</h3>
      <p class="mb-3">In the event of a security breach, we will notify affected users within 72 hours and take immediate steps to mitigate risks.</p>
    `,
    whistleblowing: `
      <h2 class="text-xl font-bold mb-4">Whistleblowing Policy</h2>
      <p class="mb-3">We are committed to maintaining the highest ethical standards. This policy provides a framework for reporting concerns.</p>
      
      <h3 class="font-bold text-lg mt-4 mb-2">Reporting Procedure</h3>
      <p class="mb-3">Any concerns about unethical practices can be reported confidentially through our secure channels. We protect whistleblowers from retaliation.</p>
      
      <h3 class="font-bold text-lg mt-4 mb-2">Investigation Process</h3>
      <p class="mb-3">All reports will be investigated promptly by our compliance team. Appropriate actions will be taken based on findings.</p>
    `,
  };

  const handleViewDocument = (id: string) => {
    setOpenDialog(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  return (
    <div className="font-sf-pro">
      <div className="w-full flex flex-col md:flex-row py-6 gap-10 border-b">
        <div className="md:w-1/4 text-left">
          <p className="text-lg font-bold">Legal</p>
          <p className="text-sm text-gray-400 font-normal">
            View important legal information, including terms of use, privacy
            policy, and disclosures about your rights and responsibilities.
          </p>
        </div>
        <div className="md:w-3/4 text-left">
          <div className="flex flex-col gap-4">
            {legalDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex justify-between items-start gap-2 md:gap-0"
              >
                <div className="space-y-1 md:space-y-0">
                  <p className="text-base font-medium">{doc.title}</p>
                  <p className="text-sm text-gray-400">{doc.description}</p>
                </div>
                <button
                  title="View"
                  className="bg-[#050C82] text-white px-3 py-1 rounded hover:bg-white hover:border border-[#050C82] hover:text-[#050C82] cursor-pointer"
                  onClick={() => handleViewDocument(doc.id)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {openDialog && (
        <div className="fixed inset-0 bg-gray-50/75 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">
                {legalDocuments.find((doc) => doc.id === openDialog)?.title}
              </h3>
              <button
                title="close dialog"
                onClick={handleCloseDialog}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <XIcon />
              </button>
            </div>
            <div
              className="p-6 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: documentContent[openDialog] }}
            />
            <div className="p-4 border-t flex justify-end">
              <button
                className="bg-[#050C82] text-white px-4 py-2 rounded hover:bg-[#050C82]/90 cursor-pointer"
                onClick={handleCloseDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalTab;
