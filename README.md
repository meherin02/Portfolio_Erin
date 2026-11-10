# Developer portfolio

React and Vite render the site. Express serves the production build and accepts contact messages. MongoDB stores submitted messages.

## Run locally

Use Node.js 22 or newer. Run these commands from this folder:

    npm install
    npm run dev

Open the URL printed by Vite. To run the contact API during development, run npm run api in a second terminal. Vite forwards API requests to port 3001.

For production, run npm run build followed by npm start and open http://localhost:3001.

## Update the portfolio

Edit content.js to change your name, headline, bio, links, and projects. Replace the two sample projects with real work. Set an optional project image and imageAlt. Keep project slugs unique. Update index.html with your homepage description and sharing metadata. Project titles and descriptions update in the browser.

Copy your professional photo into public, then set portrait.src to a path such as /headshot.webp. Use portrait.position to fine-tune the 4:5 crop, and update portrait.alt. Put a resume PDF in public and set resume to its URL if you have one.

## Contact

Enter your email in content.js to show the email link and copy button. The form starts disabled. To enable it, copy .env.example to .env, set MONGODB_URI to a working MongoDB database, and set contactForm to true in content.js. Submissions go to the messages collection of the database named in your URI. Read them through your MongoDB client. The API applies a per-process limit per IP. It does not send email notifications.
