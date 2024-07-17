"use client";
import { ContactDetailsProvider } from "./ContactDetailsContext";
import { FileContextProvider } from "./FileContext";
import { ResumeHeadingProvider } from "./ResumeHeadingContext";
import { SectionsProvider } from "./SectionsContext";
import { ResumeProvider } from "./ResumeMetaContext";
import { ModalProvider } from "./ModalContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModalProvider>
      <ResumeHeadingProvider>
        <FileContextProvider>
          <ResumeProvider>
            <SectionsProvider>
              <ContactDetailsProvider>{children}</ContactDetailsProvider>
            </SectionsProvider>
          </ResumeProvider>
        </FileContextProvider>
      </ResumeHeadingProvider>
    </ModalProvider>
  );
};

export default Providers;
