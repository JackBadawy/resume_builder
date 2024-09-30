import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
  ExternalHyperlink,
  Table,
  TableRow,
  TableCell,
  ITableCellOptions,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import { Section, SectionEntry } from "../Context/SectionsContext";

interface ContactDetails {
  fullName: string;
  jobTitle: string;
  phone: string;
  address: string;
  email: string;
  linkedin: {
    displayText: string;
    profileUrl: string;
  };
}

export const generateDocx = async (
  sections: Section[],
  contactDetails: ContactDetails,
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

  const sectionElements = sections.flatMap((section) =>
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
    ...sectionElements,
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
  contactDetails: ContactDetails,
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

  if (linkedInEnabled && contactDetails.linkedin.profileUrl) {
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
                text: contactDetails.linkedin.displayText,
                style: "Hyperlink",
                size: 22,
                font: "Aptos (body)",
              }),
            ],
            link: contactDetails.linkedin.profileUrl,
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

const generateSectionParagraphs = (section: Section): (Paragraph | Table)[] => {
  const elements: (Paragraph | Table)[] = [
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

  if (section.heading === "References") {
    const table = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: section.sectionContent.map(
            (entry: SectionEntry) =>
              new TableCell({
                children: entry.entryContent.map((content) => {
                  const [label, value] = content.split(": ");
                  return new Paragraph({
                    children: [
                      new TextRun({
                        text: `${label}: `,
                        bold: true,
                        size: 22,
                        font: "Aptos (body)",
                      }),
                      new TextRun({
                        text: value,
                        size: 22,
                        font: "Aptos (body)",
                      }),
                    ],
                  });
                }),
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                width: {
                  size: 100 / section.sectionContent.length,
                  type: WidthType.PERCENTAGE,
                },
              })
          ),
        }),
      ],
    });
    elements.push(table);
  } else {
    section.sectionContent.forEach((entry: SectionEntry) => {
      entry.entryContent.forEach((content: string) => {
        const parts = content.split(": ");
        if (parts.length > 1) {
          elements.push(
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
          elements.push(
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
      elements.push(new Paragraph({}));
    });
  }

  return elements;
};
