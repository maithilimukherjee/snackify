import Navbar from "../components/navbar";
import "./about.css";

const About = () => {
  return (
    <>
      <Navbar isAuthenticated={true} />

      <div className="about-wrapper">
        <div className="about-card">
          <h2>about snackify</h2>

          <p>
            snackify is a smart recipe recommendation app built for real-life
            situations where you have limited ingredients but still want good
            food.
          </p>

          <p>
            users enter the ingredients they have and select a food preference.
            snackify then recommends recipes using a lightweight matching
            algorithm that scores recipes based on ingredient overlap.
          </p>

          <p>
            instead of relying on complex databases or third-party apis,
            snackify uses a clean and deterministic recommendation engine that
            keeps the system fast and transparent.
          </p>

          <p>
            users can also submit their own recipe ideas, which are immediately
            added to the system and used for future recommendations.
          </p>

          <p className="about-tagline">
            less waste. less effort. better food.
          </p>

          <h2>meet the creator</h2>
          <p>
  hi, i’m maithili mukherjee, the creator of snackify. i’m a computer science
  engineering student and someone who genuinely enjoys cooking. you will find me binge-watching recipe videos and food blogs and trying them out in my free time.
</p>

<p>
  snackify started from a very everyday problem. i would open my fridge, see a
  few random ingredients, and have no clear idea of what i could make with them.
  instead of searching endlessly online or wasting ingredients, i wanted a
  simpler solution.
</p>

<p>
  that’s how snackify came to life. the idea was to build an app that recommends
  recipes based on what you already have, keeping things practical, fast, and
  easy to use. my focus was on solving the problem cleanly using core logic
  rather than overcomplicating the system.
</p>

<p>
  through snackify, i wanted to create something that helps reduce food waste,
  saves time, and makes everyday cooking a little less stressful.
</p>

<h2>get in touch</h2>
<p>
  i’m always excited to hear from users! if you have any feedback, recipe
  ideas, or just want to say hi, feel free to reach out.

  you can send your recipe ideas directly through the send recipe ideas page.
  together, we can make snackify even better!

  contact me directly at via email: <a href="mailto:maithilimukherjee@outlook.com">maithilimukherjee@outlook.com</a>

</p>
          
        </div>
      </div>
    </>
  );
};

export default About;
