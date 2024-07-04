import { Document, Packer, Paragraph, TextRun, BorderStyle } from "docx";
import { saveAs } from "file-saver";

export const generateDocx = async (
  resumeElement: HTMLDivElement,
  contactDetails: Record<string, string>,
  linkedInEnabled: boolean,
  addressEnabled: boolean,
  fileName: string
) => {
  const elements = Array.from(resumeElement.querySelectorAll("[data-text]"));

  const contactParagraphs = [
    new Paragraph({
      children: [
        new TextRun({
          text: `Email: ${contactDetails.email}`,
          size: 22,
          font: "Aptos (body)",
        }),
      ],
    }),
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
    contactParagraphs.push(
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

  if (linkedInEnabled) {
    contactParagraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `LinkedIn Profile: ${contactDetails.linkedin}`,
            size: 22,
            font: "Aptos (body)",
          }),
        ],
      })
    );
  }

  const horizontalLineParagraph = new Paragraph({
    border: {
      bottom: {
        color: "000000",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });

  const filteredElements = elements.filter(
    (element) => !(element as HTMLInputElement).id.includes("contactDetail")
  );

  const contentParagraphs = filteredElements
    .map((element) => {
      const htmlElement = element as HTMLElement;
      let textContent =
        (htmlElement as HTMLTextAreaElement).value || htmlElement.innerText;

      if (htmlElement.tagName.toLowerCase() === "textarea") {
        const textRuns = textContent.split("\n").map((line, index, array) => [
          new TextRun({
            text: line,
            size: 22,
            font: "Aptos (body)",
          }),
          index < array.length - 1 ? new TextRun({ break: 1 }) : undefined,
        ]);
        return new Paragraph({
          children: textRuns
            .flat()
            .filter((run) => run !== undefined) as TextRun[],
        });
      } else if (htmlElement.tagName.toLowerCase() === "span") {
        return new Paragraph({
          children: [
            new TextRun({
              text: textContent,
              bold: true,
              underline: {},
              size: 32,
              font: "Aptos (body)",
            }),
          ],
        });
      } else if (
        htmlElement.tagName.toLowerCase() === "input" &&
        !htmlElement.id.includes("contactDetail")
      ) {
        const isJobTitle = htmlElement.id === "jobTitle";
        const headingParagraph = new Paragraph({
          children: [
            new TextRun({
              text: textContent,
              bold: true,
              size: isJobTitle ? 36 : 50,
              font: "Aptos (body)",
            }),
          ],
        });

        if (isJobTitle) {
          const horizontalLineParagraph = new Paragraph({
            border: {
              bottom: {
                color: "000000",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
          });

          const breakParagraph = new Paragraph({
            children: [
              new TextRun({
                break: 1,
              }),
            ],
          });

          return [headingParagraph, horizontalLineParagraph, breakParagraph];
        }

        return headingParagraph;
      }

      return new Paragraph({
        children: [
          new TextRun({
            text: textContent,
          }),
        ],
      });
    })
    .flat();

  const docChildren = [
    ...contentParagraphs.slice(0, 3),
    ...contactParagraphs,
    horizontalLineParagraph,
    ...contentParagraphs.slice(3),
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
