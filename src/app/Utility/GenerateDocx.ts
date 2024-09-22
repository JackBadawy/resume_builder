import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
  ExternalHyperlink,
} from "docx";
import { saveAs } from "file-saver";
import { Section, SectionEntry } from "../Context/SectionsContext";

export const generateDocx = async (
  sections: Section[],
  contactDetails: Record<string, string>,
  linkedInEnabled: boolean,
  addressEnabled: boolean,
  fileName: string
) => {
  const nameParagraph = new Paragraph({
    children: [
      new TextRun({
        text: contactDetails.fullName,
        bold: true,
        size: 50,
        font: "Aptos (body)",
      }),
    ],
  });

  const jobTitleParagraph = new Paragraph({
    children: [
      new TextRun({
        text: contactDetails.jobTitle,
        bold: true,
        size: 36,
        font: "Aptos (body)",
      }),
    ],
  });

  const contactParagraphs = generateContactParagraphs(
    contactDetails,
    linkedInEnabled,
    addressEnabled
  );
  const horizontalLineParagraph = createHorizontalLineParagraph();

  const sectionParagraphs = sections.flatMap((section) =>
    generateSectionParagraphs(section)
  );

  const PreSectionsLineBreakParagraph = new Paragraph({
    children: [
      new TextRun({
        break: 1,
      }),
    ],
  });

  const docChildren = [
    nameParagraph,
    jobTitleParagraph,
    horizontalLineParagraph,
    ...contactParagraphs,
    horizontalLineParagraph,
    PreSectionsLineBreakParagraph,
    ...sectionParagraphs,
  ];

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fileName}.docx`);
};

const generateContactParagraphs = (
  contactDetails: Record<string, string>,
  linkedInEnabled: boolean,
  addressEnabled: boolean
): Paragraph[] => {
  const paragraphs = [
    new Paragraph({
      children: [
        new TextRun({
          text: `Phone: ${contactDetails.phone}`,
          size: 22,
          font: "Aptos (body)",
        }),
      ],
    }),
  ];

  if (addressEnabled) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Address: ${contactDetails.address}`,
            size: 22,
            font: "Aptos (body)",
          }),
        ],
      })
    );
  }

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Email: `,
          size: 22,
          font: "Aptos (body)",
        }),
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: contactDetails.email,
              style: "Hyperlink",
              size: 22,
              font: "Aptos (body)",
            }),
          ],
          link: `mailto:${contactDetails.email}`,
        }),
      ],
    })
  );

  if (linkedInEnabled) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `LinkedIn Profile: `,
            size: 22,
            font: "Aptos (body)",
          }),
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: contactDetails.linkedin,
                style: "Hyperlink",
                size: 22,
                font: "Aptos (body)",
              }),
            ],
            link: contactDetails.linkedin,
          }),
        ],
      })
    );
  }

  return paragraphs;
};

const createHorizontalLineParagraph = (): Paragraph => {
  return new Paragraph({
    border: {
      bottom: {
        color: "000000",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });
};

const generateSectionParagraphs = (section: Section): Paragraph[] => {
  const paragraphs: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: section.heading,
          bold: true,
          underline: {},
          size: 32,
          font: "Aptos (body)",
        }),
      ],
    }),
  ];

  section.sectionContent.forEach((entry: SectionEntry) => {
    entry.entryContent.forEach((content: string) => {
      const parts = content.split(": ");
      if (parts.length > 1) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${parts[0]}: `,
                bold: true,
                size: 22,
                font: "Aptos (body)",
              }),
              new TextRun({
                text: parts.slice(1).join(": "),
                size: 22,
                font: "Aptos (body)",
              }),
            ],
          })
        );
      } else {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                size: 22,
                font: "Aptos (body)",
              }),
            ],
          })
        );
      }
    });
    // Add a blank line between entries
    paragraphs.push(new Paragraph({}));
  });

  return paragraphs;
};
