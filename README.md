# Resume Builder

A NextJS TypeScript application for creating professional resumes with ease.

## Live Demo

https://resumebuilderjb.netlify.app/

## Features

- Interactive resume builder interface
- Generate Word documents (.docx)
- ATS (Applicant Tracking System) friendly output
- Customizable resume sections
- Real-time preview
- Contact details management
- File naming options

## Technology Stack

- Next.js
- TypeScript
- React Context API for state management
- jsPDF for PDF generation
- Custom DOCX generation

## Key Components

### ResumeWorkspace

The main component that brings together all parts of the resume builder:

- Resume sections
- Utility panel
- Generate buttons
- Resume heading
- Contact details

### AlertModal

A reusable modal component for:

- Confirmations
- File naming
- Displaying information

## Usage

1. Fill in your resume details in the provided sections
2. Use the utility panel to customize your resume
3. Preview your resume in real-time
4. Generate your resume as a Word document
5. Learn about ATS-friendly resumes using the "What is ATS?" button
