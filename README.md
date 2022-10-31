# DnD5Helper
Dungeons &amp; Dragons v5 program to help create characters you can import to characters sheets and for tools to use while playing. Active website link: https://char-creator.cyclic.app/.

## Goal:

To make it easier to play Dungeons & Dragons, especially with newer people. When I started playing, I even had a hard time keeping track of all of my stuff even with the books on a PDF.

## Premise:

I want to make it quicker for people to make characters quickly to play instead of spending hours looking up everything.

## Extras:

After I get the tools and what not made, I would like to make a basic quest game that you can import a character to. I hope to make it so you can have different level enemies and situations to see how your character does when handling various problems and maybe print out a report with statistics.

## How To Run:

npm install

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = your database URI
  - MAIL_USER = your username for the email you want to use to send password reset emails from
  - MAIL_PASS = your password for the email you want to use to send password reset emails from

Right now, nodemailer is set up to use Outlook emails so it may need to be adjusted to change it to Google or other emails in auth.js controller.

npm start