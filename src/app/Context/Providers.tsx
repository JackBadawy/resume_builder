"use client";
import { ContactDetailsProvider } from "./ContactDetailsContext";
import { FileContextProvider } from "./FileContext";
import { ResumeHeadingProvider } from "./ResumeHeadingContext";
import { SectionsProvider } from "./SectionsContext";
import { ResumeProvider } from "./ResumeMetaContext";
import { ModalProvider } from "./ModalContext";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ResumeHeadingProvider>
      <ModalProvider>
        <FileContextProvider>
          <ResumeProvider>
            <SectionsProvider>
              <ContactDetailsProvider>{children}</ContactDetailsProvider>
            </SectionsProvider>
          </ResumeProvider>
        </FileContextProvider>
      </ModalProvider>
    </ResumeHeadingProvider>
  );
};

export default Providers;
