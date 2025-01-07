import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function LandingPage() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-20">
      <section className="bg-primary w-full py-24 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">
          Create Your AI-Powered Resume Today!
        </h1>
        <p className="text-lg mb-6">
          Let our AI help you craft a professional resume that gets you noticed.
          Fast, easy, and personalized.
        </p>
        <Link to={isSignedIn ? "/dashboard" : "/auth/sign-in"}>
          <Button className="bg-white text-primary text-xl px-8 py-3 rounded-lg shadow-md hover:bg-gray-200">
            Start Now
          </Button>
        </Link>
      </section>

      <section className="py-20 px-8 w-full text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              AI-Driven Resume Creation
            </h3>
            <p>
              Get a professionally tailored resume crafted by AI to match the
              job you're applying for.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
            <p>
              No more complicated forms. Just input your details, and let AI
              handle the rest.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Instant Download</h3>
            <p>
              Once your resume is ready, download it instantly in a professional
              format.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 w-full py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">About Our Service</h2>
        <p className="text-lg mb-6">
          We aim to simplify the job application process by offering an
          AI-powered resume builder. Whether you're a student or a professional,
          we make sure you present your skills and experience in the best light.
        </p>

        <Button className="bg-primary text-white text-xl px-8 py-3 rounded-lg shadow-md hover:bg-gray-400">
          Learn More
        </Button>
      </section>

      <section className="py-20 w-full text-center bg-primary text-white">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg mb-6">
          Have questions or need assistance? Reach out to us and we'll be happy
          to help.
        </p>

        <Button className="bg-white text-primary text-xl px-8 py-3 rounded-lg shadow-md hover:bg-gray-200">
          Contact Us
        </Button>
      </section>

      <footer className="bg-gray-800 text-white w-full py-6 text-center">
        <p>&copy; 2025 AI Resume Builder. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
