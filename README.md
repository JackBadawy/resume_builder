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
- DOCX Api
- Selenium WebDriver for end-to-end testing

## Testing

The application includes end-to-end tests using Selenium WebDriver. These tests cover:

- Filling out basic resume information
- Attempting to generate a DOCX file
- Toggling LinkedIn and Address visibility
- Resetting sections
- Creating new Section entries

These tests ensure the core functionality of the resume builder works as expected across different browsers and environments.

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

## Running Tests

To run the Selenium tests:

1. Ensure you have the necessary WebDriver installed (e.g., ChromeDriver for Google Chrome)
2. Run `npm run test:selenium` in the project directory

Note: Make sure the application is running locally before executing the tests.
