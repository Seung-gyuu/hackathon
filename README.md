# Next Stop: AI Travel Destination Recommendation System 

## Overview
NextStop is an AI-powered travel destination recommendation platform that helps users discover personalized travel destinations based on their preferences.  
Users can either complete a guided questionnaire to receive AI-generated recommendations or instantly get random travel suggestions.



## Key Features:

- **Two Recommendation Modes**
  - **User-Based Recommendation:**  
    Users answer a series of dynamic questions (purpose, budget, climate, activities, etc.). Their selections are processed via OpenAI GPT-4o to generate customized destination suggestions.
  
  - **Random Recommendation Mode:**  
    Users can opt for a quick, random destination suggestion without completing the questionnaire.

- **Dynamic Questionnaire Flow**  
  Question options are retrieved dynamically from Firebase Firestore, one at a time, ensuring a smooth user experience.

- **Secure User Data Storage**  
  Questionnaire responses are securely stored in Firebase Firestore under the `user_selections` collection.

- **Backend API (Node.js + Express)**  
  - Fetches available questions dynamically.
  - Stores user responses securely.
  - Calls OpenAI GPT-4o API to generate user-specific travel suggestions.

- **Frontend Interface (Next.js)**  
  - Guides users through a step-by-step questionnaire or lets them access random suggestions immediately.
  - Provides real-time feedback for data submission and error handling.


## Technologies Used:

### Frontend:
Next.js for building the user interface and rendering questions dynamically.
### Backend:
Node.js with Express for building the API to handle user data, save responses, and fetch available options.
### AI Integration: 
OpenAI API (GPT-4o)
### Database:
Firebase Firestore for storing user selections and question options.
### Deployment:
Vercel for frontend deployment,
Render for backend deployment.


## Getting Started

### 1. Install dependencies

```bash
npm i
```
### 2. Run the development server
```bash
npm run dev
```







