"use client";
import { ContactDetailsProvider } from "./ContactDetailsContext";
import { FileContextProvider } from "./FileContext";
import { ResumeHeadingProvider } from "./ResumeHeadingContext";
import { SectionsProvider } from "./SectionsContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ResumeHeadingProvider>
      <FileContextProvider>
        <SectionsProvider>
          <ContactDetailsProvider>{children}</ContactDetailsProvider>
        </SectionsProvider>
      </FileContextProvider>
    </ResumeHeadingProvider>
  );
};

export default Providers;
