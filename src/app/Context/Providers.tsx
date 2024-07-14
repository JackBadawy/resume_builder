"use client";
import { ContactDetailsProvider } from "./ContactDetailsContext";
import { FileContextProvider } from "./FileContext";
import { ResumeHeadingProvider } from "./ResumeHeadingContext";
import { SectionsProvider } from "./SectionsContext";
import { ResumeProvider } from "./ResumeMetaContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ResumeHeadingProvider>
      <FileContextProvider>
        <ResumeProvider>
          <SectionsProvider>
            <ContactDetailsProvider>{children}</ContactDetailsProvider>
          </SectionsProvider>
        </ResumeProvider>
      </FileContextProvider>
    </ResumeHeadingProvider>
  );
};

export default Providers;
