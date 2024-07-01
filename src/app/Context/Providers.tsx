"use client";
import { ContactDetailsProvider } from "./ContactDetailsContext";
import { ResumeHeadingProvider } from "./ResumeHeadingContext";
import { SectionsProvider } from "./SectionsContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ResumeHeadingProvider>
      <SectionsProvider>
        <ContactDetailsProvider>{children}</ContactDetailsProvider>
      </SectionsProvider>
    </ResumeHeadingProvider>
  );
};

export default Providers;
